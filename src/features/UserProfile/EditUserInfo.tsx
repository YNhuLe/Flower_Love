
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { EditProfileData } from "../../schemas/signupFormSchema";
import { editProfile } from "../../schemas/signupFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Eye, EyeOff,
    Lock, Phone, User, Mail,
    CheckCircle2, Circle, X
} from 'lucide-react';
import useSaleData from "../../hooks/useSaleData";
function EditUserInfo({onClose}: {onClose: () => void}) {
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const { register, handleSubmit, setValue, watch, formState: {
        errors, isSubmitting, isValid
    } } = useForm<EditProfileData>({
        resolver: zodResolver(editProfile), mode: "onChange", defaultValues: {
            name: '', phone_number: '', email: ''
        }
    });
    const [prevPhone, setPrevPhone] = useState("");
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
    const handleEditProfile = async () => {
        try {

        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <section className=" p-4 flex-col items-center  rounded-md bg-surface-card shadow-md w-full mt-6  overflow-y-auto">
            <div className="flex justify-between mb-6">

                <h3 className="font-semibold text-xl">Edit Profile</h3>
                <button className="rounded-full p-2 hover:bg-text-muted/30 transition-colors"

                    onClick={onClose}>

                    <X className="w-4 h-4" />
                </button>

            </div>
            <form onSubmit={handleSubmit(handleEditProfile)} >

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
                        placeholder="(000) 000-0000"
                        className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-lg border ${errors.phone_number ? 'border-red-500' : 'border-text-muted/30'}`}
                    />
                    {errors.phone_number && <p className="text-error-500 text-xs mt-1">{errors.phone_number.message}</p>}

                </div>

                <section className="flex  gap-4 mt-4">

                    <button

                        className="cursor-pointer rounded-lg bg-success-800 p-2 text-text-inverse flex justify-center items-center   hover:bg-success-800/80">
                        Save Changes
                    </button>

                    <button

                        className="cursor-pointer rounded-lg p-2 border border-text-muted flex justify-center items-center  hover:bg-text-muted/40">
                        Cancel
                    </button>
                </section>

            </form>
        </section>
    )
}

export default EditUserInfo;