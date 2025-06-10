import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class PaymentGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('payment-event')
  handleEvent(@MessageBody() data: string) {
    this.server.emit('paymentEvent', data);
    return data;
  }
}
