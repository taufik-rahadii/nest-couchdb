import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

export const CUSTOM_EVENT = 'CUSTOME_EVENT';

@WebSocketGateway(4321)
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger('UserGateway');

  @WebSocketServer()
  private readonly server: Server;

  handleConnection(client: any, ...args: any[]) {
    this.logger.verbose(`Client connected ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.verbose(`Client disconnected ${client.id}`);
  }

  @SubscribeMessage(CUSTOM_EVENT)
  customEvent(client: any, payload: any) {
    this.logger.log(`EVENT TRIGGERED`);
  }
}
