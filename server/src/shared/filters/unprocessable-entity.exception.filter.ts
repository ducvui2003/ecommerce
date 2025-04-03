import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ResponseError,
  ResponseValidationError,
  ValidationError,
} from '@shared/types/response.type';
import { ZodValidationException } from 'nestjs-zod';
import { Response } from 'express';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter
  implements ExceptionFilter<UnprocessableEntityException>
{
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse()['message'];

    const message: string = 'Validation error';

    const error: ValidationError[] = !Array.isArray(exceptionResponse)
      ? [
          {
            field: 'Unknown',
            error: 'Unknown',
          },
        ]
      : (exceptionResponse as ValidationError[]);

    const body: ResponseValidationError = {
      statusCode: status,
      error: error,
      message: message,
      timestamp: new Date(),
    };

    response.status(status).json(body);
  }
}
