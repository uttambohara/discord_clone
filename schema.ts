import * as z from "zod";

//
export const loginSchema = z.object({
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

//
export const registerSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
