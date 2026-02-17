import { authBase, type AuthBaseData } from "../../schemas/signupFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useTogglePassword from "../../hooks/useTogglePassword";
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
import { useForm } from "react-hook-form";
function SigninPage() {

    const {
        register, handleSubmit, setValue, watch, formState:{
            errors, isSubmitting, isValid
    }} = useForm<AuthBaseData>(
            {
          resolver:zodResolver(authBase) , mode:"onChange", defaultValues:{
            email:'', password:''
          } 
    })

    const handleSigninSubmit = async ( data: AuthBaseData) =>{
        try
    
    
        {
            await axios.post("", data)
        
        }    catch(error: any){
            console.log(error)
        }
    }
        const watchedPass1 = watch("password", "");
    const { inputType: inputType1, togglePass: togglePassword1, isPasswordVisible: showPassword1 } = useTogglePassword();


    return (
        <section className="mx-4 pt-4">

 <form onSubmit={handleSubmit(handleSigninSubmit)}>
 
       {/* Email */}

                <div className=" mb-2">
                    <label className="mb-2 text-xs">Email</label>
                    <Mail className="w-4 h-4 absolute m-2 text-text-muted/50" />

                    <input
                        {...register('email')}
                        placeholder="you@example.com"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.email ? 'border-red-500' : 'border-text-muted/30'}`}
                    />
                    {errors.email && <p className="text-error-500 text-xs mt-1">{errors.email.message}</p>}

                </div>

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
                 

                    </div>

                </div>
                     <Button btnType="sign_in"

                    disabled={!isValid || isSubmitting } />

 </form>
     
        </section>
    )
}

export default SigninPage;
