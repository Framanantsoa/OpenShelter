import { z } from 'zod';

export const signInSchema = z.object({
    nickName: z.string('Enter a valid user name'),
    password: z.string().min(8, 'Password must be at least 6 characters'),
})

export type SignInInput = z.infer<typeof signInSchema>;
