import {z} from "zod";

const signupSchema = z.object({
    name: z.string().nonempty('Name is required.'),
    email: z.string().nonempty('Email is required.'),
    phone_number: z.string().nonempty('Phone number is required.'),

})

export default signupSchema;
 export type SignupFormData = z.infer<typeof signupSchema>;