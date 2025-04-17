// <namespace>:<entity>:<id>:<attribute>

import { VerificationType } from '@prisma/client';
import { VerificationCodeType } from '@shared/models/verification-code.model';

const NAMESPACE_REFRESH_TOKEN = 'refresh_token:user';
export const NAMESPACE_ADDRESS = 'address';
export const KEY_CARRIER = 'carrier';
const NAMESPACE_VERIFICATION_CODE = 'verification_code';

export function keyRefreshToken(userId: number | string, jti: string): string {
  return `${NAMESPACE_REFRESH_TOKEN}:${userId}:${jti}`;
}

// <namespace>:<parentId>:<type>
// address:city
// address:CITY_ID:district
// address:DISTRICT_ID:wards
export function keyAddress(
  type: string,
  parentId: string | number | null,
): string {
  return createNamespaces(NAMESPACE_ADDRESS, parentId, type) as string;
}

export function keyVerificationCode(email: string, type: VerificationType) {
  return createNamespaces(NAMESPACE_VERIFICATION_CODE, type, email) as string;
}

export function createNamespaces(...values: unknown[]): string | null {
  return !values.length ? null : values.filter((item) => item).join(':');
}
