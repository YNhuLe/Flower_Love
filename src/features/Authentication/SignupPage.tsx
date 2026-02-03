import axios from "axios";
import type { ShippingFormData } from "../../schemas/shippingSchema";
import type { SignupFormData } from "../../schemas/signupFormSchema";
import { useState } from "react";
import signupFormSchema from "../../schemas/signupFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../common/Button";
import {
    Share2,
    Droplets,
    Sun,
    Thermometer,
    Wind,
    Download,
    Sparkles, Eye, EyeOff,
    ArrowRight,
    ArrowLeft,
    Lock, Phone, User, Mail,
    CheckCircle2, Circle
} from 'lucide-react';
import useTogglePassword from "../../hooks/useTogglePassword";
function SignupPage() {
    const {
        register, handleSubmit, setValue, watch, formState: {
            errors, isSubmitting, isValid
        }
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupFormSchema), mode: "onChange", defaultValues: {
            name: '',
            email: '',
            phone_number: '', password: '', confirm_password: ''
        }
    })

    const watchedPass1 = watch("password", "");
    const { inputType: inputType1, togglePass: togglePassword1, isPasswordVisible: showPassword1 } = useTogglePassword();

    const watchedPass2 = watch("password", "");
    const { inputType: inputType2, togglePass: togglePassword2, isPasswordVisible: showPassword2 } = useTogglePassword();
    
    const watchAcceptedTerm = watch("acceptedTerms");
    //format phone number
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 10) value = value.slice(0, 10);
        let formatted = value;
        if (value.length > 6) {
            formatted = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`
        } else if (value.length > 3) {
            formatted = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else if (value.length > 0) {
            formatted = `(${value})`
        }
        setValue("phone_number", formatted, { shouldValidate: true });
    }

    //Password checker logic
    const passRequirements = [
        { label: "8+ characters", met: watchedPass1.length >= 8 },
        { label: "Uppercase letter", met: /[A-Z]/.test(watchedPass1) },
        { label: "A number", met: /[0-9]/.test(watchedPass1) },
        { label: "Special character", met: /[^A-Za-z0-9]/.test(watchedPass1) }
    ]
    const handleSignupSubmit = async (data: SignupFormData) => {
        try {
            await axios.post("", data)
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <section className="mx-4">
            <h1 className="text-center text-xl m-4 mb-1 font-semibold">Create Account</h1>
            <h2 className="text-center mb-6">Join our plant-loving community</h2>
            <form onSubmit={handleSubmit(handleSignupSubmit)}>
                {/* User name */}
                <div className="mx-4 mb-2">
                    <label className="mb-2 text-xs"> Full Name</label>
                    <User className="w-4 h-4 absolute m-2 text-text-muted/50" />
                    <input
                        {...register('name')}
                        placeholder="John Doe"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.name ? 'border-red-500' : 'border-text-muted/30'}`} />
                    {errors.name && <p className="text-error-500 text-xs mt-1">{errors.name.message}</p>}

                </div>

                {/* Email */}

                <div className="mx-4 mb-2">
                    <label className="mb-2 text-xs">Email</label>
                    <Mail className="w-4 h-4 absolute m-2 text-text-muted/50" />

                    <input
                        {...register('email')}
                        placeholder="you@example.com"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.name ? 'border-red-500' : 'border-text-muted/30'}`}
                    />
                    {errors.email && <p className="text-error-500 text-xs mt-1">{errors.email.message}</p>}

                </div>

                {/* Phone number */}
                <div className="mx-4 mb-2">
                    <label className="mb-2 text-xs">Phone Number</label>
                    <Phone className="w-4 h-4 absolute m-2 text-text-muted/50" />
                    <input
                        {...register('phone_number')}
                        maxLength={14}
                        onChange={handlePhoneChange}
                        placeholder="(000) 000-0000"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.phone_number ? 'border-red-500' : 'border-text-muted/30'}`}
                    />
                    {errors.phone_number && <p className="text-error-500 text-xs mt-1">{errors.phone_number.message}</p>}

                </div>


                {/*Password  */}
                <div className="mx-4 mb-2 relative">
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
                <div className="mx-4 mb-2 relative">
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
                <div className="flex gap-2 p-3 m-4 border border-1 rounded-xl border-text-muted/20 bg-text-muted/5">
<input type="checkbox"
{...register("acceptedTerms")}
className="rounded-md accent-black" />
<p className="text-[.6rem] ">I agree to receieve marketing communications and accept the <a href="" className="text-success-500 text-[.7rem] font-semibold cursor-pointer">Term of Service</a> and <a href="" className="text-success-500 text-[.7rem] font-semibold cursor-pointer">Privacy Policy</a>

</p>

                </div>

                <Button btnType="create_account" 
                
                disabled={!isValid || isSubmitting || !watchAcceptedTerm}/>
            </form>

        </section>
    )
}
export default SignupPage;