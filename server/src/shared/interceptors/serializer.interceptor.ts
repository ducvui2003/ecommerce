import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SCHEMA_KEY } from 'src/shared/constants/serializer.constant';
import { ZodSchema } from 'zod';

export interface Response<T> {
  data: T;
}

@Injectable()
export class SerializerInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const schema: ZodSchema<any> = this.reflector.get(
          SCHEMA_KEY,
          context.getHandler(),
        );

        let dataParser = schema ? schema.parse(data) : data;

        // Remove field null or undefined
        if (dataParser) {
          dataParser = Object.fromEntries(
            Object.entries(dataParser).filter(
              ([__dirname, value]) => value != null || value != undefined,
            ),
          );
        }

        return {
          data: dataParser,
          statusCode,
        };
      }),
    );
  }
}
