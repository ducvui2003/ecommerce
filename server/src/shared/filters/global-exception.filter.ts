import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

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

    response.status(status).json({
      statusCode: status,
      message,
      error: exception instanceof HttpException ? exception.name : 'Error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
