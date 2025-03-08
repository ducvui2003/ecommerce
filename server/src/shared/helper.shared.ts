import { Prisma } from '@prisma/client';
import { randomInt } from 'crypto';

export function isUniqueConstraintError(
  error: any,
): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}

export function isNotFoundError(
  error: any,
): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  );
}

export function generateOTP() {
  return String(randomInt(100000, 1000000));
}

export function buildUrl(baseUrl, params) {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
