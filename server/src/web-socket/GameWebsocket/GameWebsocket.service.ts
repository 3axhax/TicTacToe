import { Injectable } from "@nestjs/common";
import { WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@Injectable()
export class GameWebsocketService {
  @WebSocketServer() server: Server;

  findAll() {
    console.log("Service findAll");
    return `This action returns all webSocket`;
  }

  async getOnlineUsersCount() {
    this.server
      .in("Game")
      .emit("onlineUsersCount", (await this.server.fetchSockets()).length);
  }
}
