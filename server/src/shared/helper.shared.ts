import { Prisma } from '@prisma/client';
import { randomInt } from 'crypto';
import { Paging } from '@shared/common/interfaces/paging.interface';

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

export function isForeignKeyNotFound(
  error: any,
): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2003'
  );
}

export function generateOTP() {
  return String(randomInt(100000, 1000000));
}

export function buildUrl(baseUrl, params) {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

export function getCurrentDatetime(): Date {
  return new Date();
}

export function transformItemsPaging<T, S>(
  page: Paging<S>,
  mapper: (item: S) => T,
): Paging<T> {
  return {
    ...page,
    items: page.items.map((item) => mapper(item)),
  };
}
