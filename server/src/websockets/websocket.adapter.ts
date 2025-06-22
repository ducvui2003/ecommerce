import envConfig from '@config/env.config';
import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { TokenService } from '@shared/services/token.service';
import { WebsocketService } from '@shared/services/websocket.service';
import { Server, ServerOptions, Socket } from 'socket.io';

export class WebsocketAdapter extends IoAdapter {
  private readonly tokenService: TokenService;
  private readonly websocketService: WebsocketService;

  constructor(app: INestApplicationContext) {
    super(app);
    this.websocketService = app.get(WebsocketService);
    this.tokenService = app.get(TokenService);
  }
  createIOServer(port: number, options?: ServerOptions) {
    const server: Server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: envConfig.ORIGIN_ALLOWED,
        credentials: true,
      },
    });
    // Middleware
    server.of('/payment').use((socket, next) => {
      this.authMiddleware(socket, next);
    });

    return server;
  }

  async authMiddleware(socket: Socket, next: (err?: any) => void) {
    const token = socket.handshake.query.token as string;
    console.log('Authorization header:', token);
    if (!token) {
      return next(new Error('Unauthorized'));
    }
    const accessToken = token.split(' ')[1];
    if (!accessToken) {
      return next(new Error('Unauthorized'));
    }

    try {
      const { id } = await this.tokenService.verifyAccessToken(accessToken);
      this.websocketService.createPaymentListener(id, socket.id);

      socket.on('disconnect', () => {
        this.websocketService.deletePaymentListener(id);
      });
      next();
    } catch (error) {
      next(error);
    }
  }
}
