import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MESSAGE_HTTP } from '@shared/constants/api.constant';
import { Response } from '@shared/types/response.type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    Logger.log('Serializer Interceptor run before');
    return next.handle().pipe(
      map((data) => {
        Logger.log('Serializer Interceptor run after');

        const message =
          this.reflector.get<string>(MESSAGE_HTTP, context.getHandler()) ?? '';

        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        let dataParser = data;
        // Remove field null or undefined
        if (dataParser && !Array.isArray(dataParser)) {
          dataParser = Object.fromEntries(
            Object.entries(dataParser).filter(
              ([_, value]) => value !== null && value !== undefined,
            ),
          );
        }

        const formatResponse: Response = {
          statusCode: statusCode,
          message: message,
          timestamp: new Date(),
        };

        formatResponse.data =
          Object.keys(dataParser).length == 0 ? undefined : dataParser;

        return formatResponse;
      }),
    );
  }
}
