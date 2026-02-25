import z from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username must be between 1 and 50 characters.")
    .max(50, "Username must be between 1 and 50 characters."),
  password: z
    .string()
    .min(8, "Password must be between 8 and 100 characters.")
    .max(100, "Password must be between 8 and 100 characters."),
});

export type LoginCredentials = z.infer<typeof loginFormSchema>;

export type UserInfo = {
  firstName: string;
  lastName: string;
  username: string;
};

export const createUserFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name must be between 1 and 50 characters.")
    .max(50, "First name must be between 1 and 50 characters."),
  lastName: z
    .string()
    .min(1, "Last name must be between 1 and 50 characters.")
    .max(50, "Last name must be between 1 and 50 characters."),
  username: z
    .string()
    .min(1, "Username must be between 1 and 50 characters.")
    .max(50, "Username must be between 1 and 50 characters.")
    .regex(/^\S+$/, "Username cannot contain spaces."),
  password: z
    .string()

    .min(8, "Password must be between 8 and 100 characters.")
    .max(100, "Password must be between 8 and 100 characters.")
    .regex(/^\S+$/, "Password cannot contain spaces."),
});

export type UserCreatePayload = z.infer<typeof createUserFormSchema>;
