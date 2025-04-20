import { UserType } from '@shared/models/user.model';

export type InfoAllow = Omit<UserType, 'password'> & {
  role: string;
};
export type InfoUpdate = Partial<Pick<UserType, 'name' | 'phone' | 'dob'>>;
