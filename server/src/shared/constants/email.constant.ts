import { VerificationType } from '@shared/constants/auth.constant';

export const EmailType = VerificationType;

export type TypeOfEmail = (typeof EmailType)[keyof typeof EmailType];
