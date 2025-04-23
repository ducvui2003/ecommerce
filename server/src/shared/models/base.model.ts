import { z } from 'zod';

const TimestampFields = z.object({
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

const SoftDeleteFields = {
  isDeleted: z.boolean().default(false),
  deletedAt: z.date().nullable(),
};

const MetadataFields = TimestampFields.extend(SoftDeleteFields);

export { TimestampFields, SoftDeleteFields, MetadataFields };
