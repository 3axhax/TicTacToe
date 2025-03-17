import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { GameWebsocketService } from "./GameWebsocket.service";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  namespace: "game",
})
export class GameWebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private readonly webSocketService: GameWebsocketService) {}

  @SubscribeMessage("findAllWebSocket")
  findAll(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log("findAllWebSocket data: ", data);
    client.join("Best");
    return this.webSocketService.findAll();
  }

  @SubscribeMessage("test")
  async test(@MessageBody() data: any, @ConnectedSocket() client: any) {
    this.server.in("Best").emit("message", "You are the best!!!");
    this.server.emit("test", "test message");
    return "test";
  }

  @SubscribeMessage("onlineUsersCount")
  async getOnlineUsersCount() {
    await this.webSocketService.getOnlineUsersCount();
  }

  afterInit(): void {
    console.log("WebSocketGateway Init!", this.server);
    this.webSocketService.server = this.server;
  }

  async handleConnection(client: Socket, ...args: any): Promise<void> {
    client.join("Game");
    console.log("WS connection: ", client.id, args);
    await this.webSocketService.getOnlineUsersCount();
  }

  async handleDisconnect(client: Socket): Promise<void> {
    console.log("WS disconnection: ", client.id);
    await this.webSocketService.getOnlineUsersCount();
  }
}
