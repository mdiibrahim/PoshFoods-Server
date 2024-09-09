import { IRole } from './user.interface';

export const Role: IRole[] = ['admin', 'user'];

export const userRole = {
  ...Role,
} as const;
