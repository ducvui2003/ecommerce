import { ResourceModel, ResourceType } from '@shared/models/resource.model';
import { z } from 'zod';

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

export type CreatedMediaBodyType = z.infer<typeof CreatedMediaBodySchema>;

export type SignatureBodyType = z.infer<typeof CreatedMediaBodySchema>;

export type ChangeVisibilityType = z.infer<typeof ChangeVisibilitySchema>;
