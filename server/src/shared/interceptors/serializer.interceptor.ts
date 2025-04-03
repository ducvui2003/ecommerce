import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from '@shared/types/response.type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    Logger.log('Serializer Interceptor run before');
    return next.handle().pipe(
      map((data) => {
        Logger.log('Serializer Interceptor run after');
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
          data: dataParser,
          statusCode: statusCode,
          message: '',
          timestamp: new Date(),
        };

        return formatResponse;
      }),
    );
  }
}
