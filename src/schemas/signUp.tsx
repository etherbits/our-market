import * as z from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().min(3).email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignUpFields = z.infer<typeof signUpSchema>;

export { signUpSchema, type SignUpFields };
