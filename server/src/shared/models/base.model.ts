import { Decimal } from '@prisma/client/runtime/library';
import { z } from 'zod';

const TimestampFields = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable(),
});

const SoftDeleteFields = {
  // isDeleted: z.boolean().default(false),
  deletedAt: z.date().nullable(),
};

const NumberToDecimalSchema = z.number().transform((val) => new Decimal(val));
const NumberToDecimalOptionalSchema = z
  .number()
  .nullable()
  .optional()
  .transform((val) => {
    console.log('Transforming number to Decimal:', val);
    return val !== undefined && val !== null ? new Decimal(val) : null;
  });
const DecimalToNumberSchema = z
  .instanceof(Decimal)
  .transform((val) => val.toNumber());

const DecimalToNumberOptionalSchema = z
  .union([z.instanceof(Decimal), z.null(), z.undefined()])
  .transform((val) => (val instanceof Decimal ? val.toNumber() : null));

const MetadataFields = TimestampFields.extend(SoftDeleteFields);

export {
  TimestampFields,
  SoftDeleteFields,
  MetadataFields,
  NumberToDecimalSchema,
  DecimalToNumberSchema,
  NumberToDecimalOptionalSchema,
  DecimalToNumberOptionalSchema,
};
