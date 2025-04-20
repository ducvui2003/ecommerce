import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

export const OTPInvalidException = new UnprocessableEntityException([
  {
    field: 'otp',
    error: 'OTP not valid',
  },
]);

export const OTPExpiredException = new UnprocessableEntityException([
  {
    field: 'otp',
    error: 'OTP is expired',
  },
]);

export const EmailExistException = new UnprocessableEntityException([
  {
    field: 'email',
    error: 'email is exist',
  },
]);

export const EmailNotExistException = new UnprocessableEntityException([
  {
    field: 'email',
    error: 'email is not exist',
  },
]);

export const PasswordIncorrectException = new UnprocessableEntityException([
  {
    field: 'password',
    message: 'Password is incorrect',
  },
]);

export const TokenRevokedException = new UnauthorizedException(
  'Token has been revoked',
);

export const TokenInvalidException = new UnauthorizedException(
  'Invalid JWT Token',
);

export const EmailUnauthorizedException = new UnauthorizedException(
  'Email not found',
);
