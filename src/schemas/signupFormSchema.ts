import { z } from "zod";

const authBase = z.object({
  email: z.string().email("Invalid email.").nonempty("Email is required."),

  password: z
    .string()
    .min(8)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/\d/)
    .regex(/[@$!%*?&]/),
});

const signupFormSchema = authBase
  .extend({
    name: z.string().nonempty("Full name is required."),
    phone_number: z.string().min(14, "Phone number is required."),
    acceptedTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
    confirm_password: z.string().nonempty("Please confirm your password."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password do not match.",
    path: ["confirm_password"],
  });

  const editProfile = z.object({
    name:z.string().nonempty("Name is required."),
    phone_number: z.string().nonempty("Phone number is required."),
    email:z.string().email("Invalid email.").nonempty("Email is required."),
    })

export { signupFormSchema, authBase, editProfile };
export type SignupFormData = z.infer<typeof signupFormSchema>;
export type AuthBaseData = z.infer<typeof authBase>;
export type EditProfileData = z.infer<typeof editProfile>;
