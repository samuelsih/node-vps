import { z } from "zod";

export const RegisterRequest = z.object({
  email: z
    .string({ required_error: "email is required" })
    .min(4, { message: "email is required" })
    .max(255, { message: "email is too long" })
    .email("not a valid email"),

  name: z
    .string({ required_error: "name is required" })
    .min(4, { message: "name is required" })
    .max(255, { message: "name is too long" }),

  phone: z
    .string({ required_error: "phone number is required" })
    .nonempty({ message: "phone number is required" })
    .min(4, { message: "phone number is required" })
    .max(20, { message: "phone number is too long" })
    .regex(/^08[1-9][0-9]{7,10}$/, {
      message: "invalid indonesian phone number",
    }),

  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "password must be at least 8 characters" })
    .max(50, { message: "password max length is 50 characters." }),
});

export const LoginRequest = z.object({
  email: z
    .string({ required_error: "email is required" })
    .min(4, { message: "email is required" })
    .max(255, { message: "email is too long" })
    .email("not a valid email"),

  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "password must be at least 8 characters" }),
});

export type RegisterRequestType = z.infer<typeof RegisterRequest>;
export type LoginRequestType = z.infer<typeof LoginRequest>;
