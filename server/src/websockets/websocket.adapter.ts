import envConfig from '@config/env.config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';

export class WebsocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    const server: Server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: envConfig.ORIGIN_ALLOWED,
        credentials: true,
      },
    });
    return server;
  }
}
