import { HttpStatus } from '@nestjs/common';

export class AppException extends Error {
  private statusCode: number;
  private bodyCode: number;
  constructor(
    message: string,
    statusCode: HttpStatus,
    bodyCode: number = statusCode,
  ) {
    super(message);
    this.name = 'App Exception';
    this.statusCode = statusCode;
    this.bodyCode = bodyCode;
  }

  getStatusCode() {
    return this.statusCode;
  }

  getBodyCode() {
    return this.bodyCode;
  }
}
