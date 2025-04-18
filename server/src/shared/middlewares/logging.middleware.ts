import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    Logger.log('Logging Middleware run ');
    this.logger.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    if (req.body && Object.keys(req.body).length > 0) {
      this.logger.log(`Body: ${JSON.stringify(req.body)}`);
    }
    next();
  }
}
