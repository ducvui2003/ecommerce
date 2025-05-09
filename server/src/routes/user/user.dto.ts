import {
  GetUserQuerySchema,
  UserInfoBodySchema,
} from '@route/user/user.schema';
import { createZodDto } from 'nestjs-zod';

class UserInfoBodyReq extends createZodDto(UserInfoBodySchema) {}

class GetUserQueryDTO extends createZodDto(GetUserQuerySchema) {}

export { UserInfoBodyReq, GetUserQueryDTO };
