import {z} from "zod";

const signupFormSchema = z.object({
    name: z.string().nonempty("Full name is required."),
    email: z.string().email("Invalid email.").nonempty("Email is required."),
    phone_number: z.string().min(14, "Phone number is required."),
    acceptedTerms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions."
    }),
    password: z.string().min(8).regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/\d/)
    .regex(/[@$!%*?&]/),
    confirm_password: z.string().nonempty("Please confirm your password."),
 
})
.refine((data) => data.password === data.confirm_password,{
    message: "Password do not match.",
    path: ["confirm_password"]
})



export default signupFormSchema;
export type SignupFormData = z.infer<typeof signupFormSchema>;