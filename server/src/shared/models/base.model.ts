import { Decimal } from '@prisma/client/runtime/library';
import { z } from 'zod';

const TimestampFields = z.object({
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

const SoftDeleteFields = {
  // isDeleted: z.boolean().default(false),
  deletedAt: z.date().nullable(),
};

const NumberToDecimalSchema = z.number().transform((val) => new Decimal(val));
const DecimalToNumberSchema = z
  .instanceof(Decimal)
  .transform((val) => val.toNumber());

const MetadataFields = TimestampFields.extend(SoftDeleteFields);

export {
  TimestampFields,
  SoftDeleteFields,
  MetadataFields,
  NumberToDecimalSchema,
  DecimalToNumberSchema,
};
