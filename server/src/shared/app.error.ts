import { HttpException } from '@nestjs/common';

export class AppException extends HttpException {
  private readonly bodyCode: number;

  constructor(message: string, httpStatus: number, bodyCode: number) {
    super(message, httpStatus);
    this.bodyCode = bodyCode;
  }

  getStatusCode(): number {
    return this.getStatus();
  }

  getBodyCode(): number {
    return this.bodyCode;
  }
}
