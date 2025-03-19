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
import { GAME_ROOM } from "./GameWebsocket.constants";

@WebSocketGateway({
  namespace: "game",
})
export class GameWebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly webSocketService: GameWebsocketService) {}

  @SubscribeMessage("onlineUsersCount")
  getOnlineUsersCount() {
    this.webSocketService.getOnlineUsersCount();
  }

  @SubscribeMessage("onlineUsersList")
  getOnlineUsersList() {
    this.webSocketService.getOnlineUsersList();
  }

  @SubscribeMessage("GameMatrix")
  async getGameMatrix(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const otherPlayer = (await this.server.fetchSockets()).find(
      (socket: any) => socket.id !== client.id,
    );
    if (otherPlayer) {
      otherPlayer.emit("updateGameMatrix", JSON.parse(data));
    }
  }

  afterInit(): void {
    this.webSocketService.server = this.server;
  }

  async handleConnection(client: Socket, ...args: any): Promise<void> {
    client.join(GAME_ROOM);
    console.log("WS connection: ", client.id, args);
    this.webSocketService.addUserToUserList(this._getToken(client));
    this.webSocketService.getOnlineUsersList();
  }

  async handleDisconnect(client: Socket): Promise<void> {
    console.log("WS disconnection: ", client.id);
    this.webSocketService.removeFromUserList(this._getToken(client));
    this.webSocketService.getOnlineUsersList();
  }

  _getToken(client: Socket): string {
    return client.handshake.auth.token ? client.handshake.auth.token : "";
  }
}
