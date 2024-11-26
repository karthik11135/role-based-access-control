import z from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(5),
});

export type signupType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export type loginType = z.infer<typeof loginSchema>;
