import { UserInfoBodySchema } from '@route/user/user.schema';
import { createZodDto } from 'nestjs-zod';

export class UserInfoBodyReq extends createZodDto(UserInfoBodySchema) {}
