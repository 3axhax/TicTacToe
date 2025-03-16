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
import { WebSocketService } from "./web-socket.service";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly webSocketService: WebSocketService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage("findAllWebSocket")
  findAll(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log("findAllWebSocket data: ", data);
    client.join("Best");
    return this.webSocketService.findAll();
  }

  @SubscribeMessage("test")
  async test(@MessageBody() data: any, @ConnectedSocket() client: any) {
    this.server.in("Best").emit("message", "You are the best!!!");
    return "test";
  }

  afterInit(): void {
    console.log("WebSocketGateway Init!");
  }

  handleConnection(client: Socket, ...args: any): void {
    console.log("WS connection: ", client.id, args);
  }

  handleDisconnect(client: Socket): void {
    console.log("WS disconnection: ", client.id);
  }
}
