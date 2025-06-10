import { INestApplication } from '@nestjs/common';
import { WebsocketAdapter } from 'src/websockets/websocket.adapter';

export default function setupWebsocket(app: INestApplication<any>) {
  app.useWebSocketAdapter(new WebsocketAdapter(app));
}
