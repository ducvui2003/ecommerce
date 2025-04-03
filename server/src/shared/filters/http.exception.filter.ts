import {
  Logger,
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { ResponseError } from '@shared/types/response.type';
import { Request, Response } from 'express';

// Global Exception
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const message: string = exception.message;
    const error = exception.name;

    const body: ResponseError = {
      statusCode: status,
      error: error,
      message: message,
      timestamp: new Date(),
    };

    response.status(status).json(body);
  }
}
