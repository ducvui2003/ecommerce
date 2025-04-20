import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AppException } from '@shared/app.error';
import { ResponseError } from '@shared/types/response.type';
import { Response } from 'express';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter<AppException> {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatusCode();
    const statusBody = exception.getBodyCode();

    const message: string = exception.message;
    const error = exception.name;

    const body: ResponseError = {
      statusCode: statusBody,
      error: error,
      message: message,
      timestamp: new Date(),
    };

    response.status(statusCode).json(body);
  }
}
