import axios from "axios";
import type { ShippingFormData } from "../../schemas/shippingSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import signupSchema, { SignupFormData } from "../../schemas/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../common/Button";
import {
  Share2,
  Droplets,
  Sun,
  Thermometer,
  Wind, 
  Download,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,Phone, User, Mail
} from 'lucide-react';
function SignupPage() {

    const {
        register, handleSubmit, formState: {
            errors, isSubmitting
        }
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema), defaultValues: {
            name: '',
            email: '',
            phone_number: ''
        }
    })
    const handleSignupSubmit = async (data: ShippingFormData) => {
        try {
            await axios.post("", data)
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <>
            <h1>Create Account</h1>
            <h2>Join our plant-loving community</h2>
            <form>
                {/* User name */}
                <div>
                    <label> Full Name</label>
                    <User className="w-4 h-4 absolute m-2 text-text-muted/50"/>
                    <input
                        {...register('name')}
                            placeholder="John Doe"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.name ? 'border-red-500' : 'border-text-muted/30'}`} />
                    {errors.name && <p className="text-error-500 text-xs mt-1">{errors.name.message}</p>}

                </div>

                {/* Email */}

                <div>
                    <label>Email</label>
                        <Mail className="w-4 h-4 absolute m-2 text-text-muted/50"/>
                        
                    <input
                        {...register('email')}
                        placeholder="you@example.com"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.name ? 'border-red-500' : 'border-text-muted/30'}`}
                    />
                    {errors.name && <p className="text-error-500 text-xs mt-1">{errors.name.message}</p>}

                </div>

                {/* Phone number */}
                <div>
                    <label >Phone Number</label>
                        <Phone className="w-4 h-4 absolute m-2 text-text-muted/50"/>
                    <input
                        {...register('email')}
                            placeholder="000 - 000 - 0000"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.email ? 'border-red-500' : 'border-text-muted/30'}`}
                    />
                    {errors.email && <p className="text-error-500 text-xs mt-1">{errors.email.message}</p>}

                </div>
<Button btnType="create_account" />
            </form>

        </>
    )
}
export default SignupPage;