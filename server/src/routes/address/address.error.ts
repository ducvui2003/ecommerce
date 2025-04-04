import { HttpStatus, NotFoundException } from '@nestjs/common';
import { AppException } from '@shared/app.error';

export const AddressNotValidException = new AppException(
  'Address not valid, please check again',
  HttpStatus.BAD_REQUEST,
  1000,
);

export const AddressNotFoundException = new NotFoundException(
  'Address not found with condition',
);

export const AddressMaxEntriesException = (max: number) => {
  return new AppException(
    `Maximum number of entries (${max}) exceeded.`,
    HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
    1000,
  );
};
