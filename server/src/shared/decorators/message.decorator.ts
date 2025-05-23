import { SetMetadata } from '@nestjs/common';
import { MESSAGE_HTTP } from '@shared/constants/api.constant';

export const MessageHttp = (message: string) => {
  return SetMetadata(MESSAGE_HTTP, message);
};
