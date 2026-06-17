import axios from "axios";
import type { SignupFormData } from "../../schemas/signupFormSchema";
import { useState } from "react";
import { signupFormSchema } from "../../schemas/signupFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
    Eye, EyeOff,
    Lock, Phone, User, Mail,
    CheckCircle2, Circle
} from 'lucide-react';
import { toast } from "sonner";
import useTogglePassword from "../../hooks/useTogglePassword";
import SocialAuth from "./SocialAuth";
/**
 * Sign up page component allows users to create a new account using email and password or social authentication.
 *  It includes form validation for user input and provides feedback on password strength. 
 * The component also handles the signup process by communicating with the Auth0 API and redirects users to the profile page upon successful signup.
 * @returns JSX.Element - The rendered sign up page component
 */
function SignupPage() {
    const {
        register, handleSubmit, setValue, watch, setError, formState: {
            errors, isSubmitting, isValid
        }
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupFormSchema), mode: "onChange", defaultValues: {
            name: '',
            email: '',
            phone_number: '',
            password: '',
            confirm_password: ''
        }
    })
    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    const { loginWithRedirect } = useAuth0();
    const watchedPass1 = watch("password", "");
    const { inputType: inputType1, togglePass: togglePassword1, isPasswordVisible: showPassword1 } = useTogglePassword();
    const { inputType: inputType2, togglePass: togglePassword2, isPasswordVisible: showPassword2 } = useTogglePassword();

    const watchAcceptedTerm = watch("acceptedTerms");
    //format phone number

    const [prevPhone, setPrevPhone] = useState("");
    const [checkingField, setCheckingField] = useState<"email" | "phone_number" | null>(null);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        const isDeleting = e.target.value.length < prevPhone.length;

        let formatted = e.target.value;
        if (!isDeleting) {
            if (raw.length <= 3) {
                formatted = `(${raw}`;

            } else if (raw.length <= 6) {
                formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
            } else {
                formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
            }
        }
        setPrevPhone(formatted);
        setValue("phone_number", formatted, { shouldValidate: true });
    }

    //check if email or phone number already exists in the database before submitting the form
    const checkExistingFields = async (field: "email" | "phone_number", value: string) => {
        if (!value) return;
        setCheckingField(field);
        try {
            await axios.get(`${baseUrl}/users/check-existing`, {
                params: { field, value }
            }
            );
        } catch (err: any) {
            console.error('Error checking existing fields:', err);
            if (axios.isAxiosError(err) && err.response?.status === 409) {
                if (field === "email") {
                    setError("email", {
                        type: "manual",
                        message: "This email is already registered. Try signing in instead."
                    }, { shouldFocus: true });
                    toast.error(<span>
                        Email already in use.{" "}
                        <span
                            className="underline cursor-pointer font-semibold"
                            onClick={() => navigate("/signin")}
                        >
                            Sign in instead?
                        </span>
                    </span>)
                } else {
                    setError("phone_number", {
                        type: "manual",
                        message: 'Phone number is already registered. Please use a different one.'
                    }, { shouldFocus: true });
                    toast.error('Phone number is already in use. Please use a different one.');
                }
            }
        } finally {
            setCheckingField(null);
        }
    }
    //Password checker logic
    const passRequirements = [
        { label: "8+ characters", met: watchedPass1.length >= 8 },
        { label: "Uppercase letter", met: /[A-Z]/.test(watchedPass1) },
        { label: "A number", met: /[0-9]/.test(watchedPass1) },
        { label: "Special character", met: /[^A-Za-z0-9]/.test(watchedPass1) }
    ]
    const handleSignupSubmit = async (data: SignupFormData) => {
        console.log("Submit sign up");

        try {
            const signupResponse = await axios.post(
                `https://${import.meta.env.VITE_AUTH0_DOMAIN}/dbconnections/signup`,
                {
                    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
                    email: data.email,
                    password: data.password,
                    connection: 'Username-Password-Authentication',
                    user_metadata: {
                        name: data.name,
                        phone_number: data.phone_number
                    }
                }
            );

            if (signupResponse.status !== 200 && signupResponse.status !== 201) {
                const error = signupResponse.data;
                console.error('Auth0 signup failed:', error);
                toast.error('Signup failed: ' + error.description);
                return;
            }

            localStorage.clear();
            sessionStorage.clear();
            await loginWithRedirect({
                authorizationParams: {
                    login_hint: data.email,
                    max_age: 0, // force to get the fresh token from Auth0
                },
                appState: {
                    returnTo: '/users/profile',
                    signupData: {
                        name: data.name,
                        phone_number: data.phone_number
                    }
                }
            });

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                const message = error.response.data.message || "";

                if (message.includes("email")) {
                    setError("email", { message: "This email is already registered." });
                    toast.error(
                        <span>
                            Email already in use.{" "}
                            <span
                                className="underline cursor-pointer font-semibold"
                                onClick={() => navigate("/signin")}
                            >
                                Sign in instead?
                            </span>
                        </span>
                    );
                } else if (message.includes("phone")) {
                    setError("phone_number", {
                        message: "This phone number is already in use."
                    });
                }
                return;
            }
            toast.error("An error occurred during signup.");
        }

    }

    return (
        <section className="mx-4 pt-4">
            <h1 className="text-center text-xl m-4  mb-1 font-semibold">Create Account</h1>
            <h2 className="text-center mb-6">Choose your preferred way to join us.</h2>
            <SocialAuth />
            <div className="mb-6 ">

                <p className="flex gap-2 text-xs justify-center items-center"><hr className="w-[4rem]" />   OR USE EMAIL <hr className="w-[4rem]" /> </p>
            </div>
            <form onSubmit={handleSubmit(handleSignupSubmit)}>
                {/* User name */}
                <div className="mb-2">
                    <label className="mb-2 text-xs"> Full Name</label>
                    <User className="w-4 h-4 absolute m-2 text-text-muted/50" />
                    <input
                        {...register('name')}
                        placeholder="John Doe"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.name ? 'border-red-500' : 'border-text-muted/30'}`} />
                    {errors.name && <p className="text-error-500 text-xs mt-1">{errors.name.message}</p>}

                </div>

                {/* Email */}

                <div className=" mb-2">
                    <label className="mb-2 text-xs">Email</label>
                    <Mail className="w-4 h-4 absolute m-2 text-text-muted/50" />

                    <input
                        {...register('email')}
                        placeholder="you@example.com"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.email ? 'border-red-500' : 'border-text-muted/30'}`}
                        disabled={checkingField === "email"}
                        onBlur={
                            (e) => {
                                if (e.target.value.includes("@")) {
                                    checkExistingFields("email", e.target.value);
                                }
                            }


                        }


                    />
                    {errors.email && <p className="text-error-500 text-xs mt-1">{errors.email.message}</p>}

                </div>

                {/* Phone number */}
                <div className=" mb-2">
                    <label className="mb-2 text-xs">Phone Number</label>
                    <Phone className="w-4 h-4 absolute m-2 text-text-muted/50" />
                    <input
                        {...register('phone_number')}
                        maxLength={14}
                        onChange={handlePhoneChange}
                        disabled={checkingField === "phone_number"}
                        onBlur={
                            (e) => {
                                const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

                                if (phoneRegex.test(e.target.value)) {
                                    checkExistingFields("phone_number", e.target.value);
                                }
                            }
                        }


                        placeholder="(000) 000-0000"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.phone_number ? 'border-red-500' : 'border-text-muted/30'}`}
                    />
                    {errors.phone_number && <p className="text-error-500 text-xs mt-1">{errors.phone_number.message}</p>}

                </div>


                {/*Password  */}
                <div className=" mb-2 relative">
                    <label className="mb-2 text-xs">Password</label>
                    <div className="relative ">
                        <Lock className="w-4 h-4 absolute m-2 text-text-muted/50" />
                        <input
                            {...register('password')}
                            type={inputType1}


                            placeholder="••••••••"
                            className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.password ? 'border-red-500' : 'border-text-muted/30'}`}
                        />

                        <span onClick={togglePassword1} className="absolute right-3 top-4 -translate-y-1/2 text-slate-400 hover:text-slate-600 outline-none">

                            {showPassword1 ? <Eye className="w-4 h-4  m-2 text-text-muted/50 " /> : <EyeOff className="w-4 h-4 m-2 text-text-muted/50 " />}
                        </span>
                        <div className="grid grid-cols-2 gap-x-4 mt-2">
                            {passRequirements.map((req, index) => (
                                <div key={index} className="text-[.6rem] flex gap-1 items-center m-1">
                                    {req.met ?
                                        <div className="flex gap-1 justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-success-500" />
                                            <p className="text-success-500 font-semibold"> {req.label}</p>
                                        </div> :

                                        <div className="flex gap-1 justify-center"><Circle className="w-4 h-4 " />
                                            <p className="text-text-muted/50"> {req.label}</p>
                                        </div>
                                    }
                                </div>

                            ))}

                        </div>

                    </div>

                </div>


                {/* Confirm Password*/}
                <div className="mb-2 relative">
                    <label className="mb-2 text-xs">Confirm Password</label>
                    <Lock className="w-4 h-4 absolute m-2 text-text-muted/50" />
                    <input
                        {...register('confirm_password')}
                        type={inputType2}
                        placeholder="••••••••"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.confirm_password ? 'border-red-500' : 'border-text-muted/30'}`}
                    />

                    <span onClick={togglePassword2} className="absolute right-3 top-10 -translate-y-1/2 text-slate-400 hover:text-slate-600 outline-none">

                        {showPassword2 ? <Eye className="w-4 h-4  m-2 text-text-muted/50 " /> : <EyeOff className="w-4 h-4 m-2 text-text-muted/50 " />}
                    </span>

                    {errors.confirm_password && <p className="text-error-500 text-xs mt-1">{errors.confirm_password.message}</p>}

                </div>
                <div className="flex gap-2 p-3 m-8 border border-1 rounded-xl border-text-muted/20 bg-text-muted/5">
                    <input type="checkbox"
                        {...register("acceptedTerms")}
                        className="rounded-md accent-black" />
                    <p className="text-[.6rem] ">I agree to receieve marketing communications and accept the <a href="" className="text-success-500 text-[.7rem] font-semibold cursor-pointer">Term of Service</a> and <a href="" className="text-success-500 text-[.7rem] font-semibold cursor-pointer">Privacy Policy</a>
                    </p>
                </div>

                <Button btnType="create_account"

                    disabled={!isValid || isSubmitting || !watchAcceptedTerm} />
            </form>
            <p className="text-xs text-center">Already a memmber? <span className="text-success-700 font-semibold" onClick={() => navigate("/signin")}>Sign In</span>

            </p>


        </section>
    )
}
export default SignupPage;
