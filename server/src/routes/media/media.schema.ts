import { ResourceModel, ResourceType } from '@shared/models/resource.model';
import { PageableSchema } from '@shared/types/request.type';
import { z } from 'zod';

export const SearchMediaReqSchema = PageableSchema.extend({
  skipIds: z
    .union([z.coerce.number(), z.array(z.coerce.number())])
    .optional()
    .transform((val) => {
      if (val === undefined) return [];
      return Array.isArray(val) ? val : [val];
    }),
});

export const CreatedMediaBodySchema = ResourceModel.pick({
  publicId: true,
  type: true,
  format: true,
});

export const SignatureBodySchema = z.array(
  z.object({
    publicId: z.string(),
    folder: z.string(),
  }),
);

export const ChangeVisibilitySchema = z.object({
  id: z.number(),
  visibility: z.boolean(),
});

export type MediaResponseType = Pick<
  ResourceType,
  'id' | 'format' | 'publicId'
> & {
  url: string;
};

export type SearchMediaReqType = z.infer<typeof SearchMediaReqSchema>;

export type CreatedMediaBodyType = z.infer<typeof CreatedMediaBodySchema>;

export type SignatureBodyType = z.infer<typeof CreatedMediaBodySchema>;

export type ChangeVisibilityType = z.infer<typeof ChangeVisibilitySchema>;
