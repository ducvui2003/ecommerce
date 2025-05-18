import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException } from '@shared/app.error';
import { ResponseError } from '@shared/types/response.type';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter<AppException> {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    console.error(exception);
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const extracted =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error' };

    const message =
      typeof extracted === 'string'
        ? extracted
        : (extracted as any).message || extracted;

    const body: ResponseError = {
      statusCode: status,
      message: message,
      error: exception instanceof HttpException ? exception.name : 'Error',
      timestamp: new Date(),
      path: request.url,
    };
    response.status(status).json(body);
  }
}
