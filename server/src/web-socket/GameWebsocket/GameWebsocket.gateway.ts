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
import { gameUser, GameWebsocketService } from "./GameWebsocket.service";
import { Server, Socket } from "socket.io";
import { GAME_ROOM } from "./GameWebsocket.constants";
import { UseGuards } from "@nestjs/common";
import { WebsocketGuard } from "../Websocket.guard";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../../users/users.service";

@WebSocketGateway({
  namespace: "game",
})
@UseGuards(WebsocketGuard)
export class GameWebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly webSocketService: GameWebsocketService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

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

  @UseGuards(WebsocketGuard)
  async handleConnection(client: Socket, ...args: any): Promise<void> {
    client.join(GAME_ROOM);
    console.log("WS connection: ", client.id, args);
    this.webSocketService.addUserToUserList(
      await this._getUserFromToken(client),
    );
    this.webSocketService.getOnlineUsersList();
  }

  async handleDisconnect(client: Socket): Promise<void> {
    console.log("WS disconnection: ", client.id);
    this.webSocketService.removeFromUserList(
      await this._getUserFromToken(client),
    );
    this.webSocketService.getOnlineUsersList();
  }

  async _getUserFromToken(client: Socket): Promise<gameUser | null> {
    const token = client.handshake.auth.token
      ? client.handshake.auth.token
      : "";
    if (token) {
      try {
        const user = this.jwtService.verify(token);
        if (user && !!(await this.usersService.getUserById(user.id))) {
          return user;
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}
