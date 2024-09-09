import { z } from 'zod';

const logInUserValidationSchema = z.object({
  email: z
    .string()
    .email('Invalid email address.')
    .min(1, 'Email is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

const refreshTokenValidationSchema = z.object({
  refreshToken: z.string({
    required_error: 'Refresh token is required!',
  }),
});

export const AuthValidation = {
  logInUserValidationSchema,
  refreshTokenValidationSchema,
};
