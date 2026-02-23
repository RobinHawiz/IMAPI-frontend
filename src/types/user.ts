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
