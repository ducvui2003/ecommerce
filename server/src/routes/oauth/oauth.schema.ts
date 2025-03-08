import { z } from 'zod';

const ProviderOAuth2 = ['google', 'facebook'] as const;

export const OAuth2BodySchema = z
  .object({
    provider: z.enum(ProviderOAuth2),
    accessToken: z.string(),
  })
  .strict();
