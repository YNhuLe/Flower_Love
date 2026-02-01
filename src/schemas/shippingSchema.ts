import {z} from "zod";


const shippingSchema  = z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    phone: z.string().nonempty("Phone number is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    streetAddress: z.string().nonempty("Address is required"),
    aptSuit: z.string().optional(),
    city: z.string().nonempty("City is required."),
    postalCode: z.string().nonempty("Postal code is required").regex(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] \d[ABCEGHJ-NPRSTV-Z]\d$/, "Invalid Canadian postal code format"),
    state: z.string().nonempty("State is required"),
    country: z.string().nonempty("Country is required"),
    shippingMethod: z.enum(["standard", "express", "overnight"], {
    errorMap:() => ({message: "Shipping method is required."})
})
})

export default shippingSchema;
export type ShippingFormData = z.infer<typeof shippingSchema>;