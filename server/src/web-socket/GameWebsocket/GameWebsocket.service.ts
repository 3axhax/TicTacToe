import { Injectable } from "@nestjs/common";
import { WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { GAME_ROOM } from "./GameWebsocket.constants";

export interface gameUser {
  id: number;
  email: string;
  name: string;
}

@Injectable()
export class GameWebsocketService {
  @WebSocketServer() server: Server;

  usersList: gameUser[] = [];

  getOnlineUsersCount() {
    this.server.in(GAME_ROOM).emit("onlineUsersCount", this.usersList.length);
  }

  getOnlineUsersList() {
    this.server.in(GAME_ROOM).emit("onlineUsersList", this.usersList);
  }

  addUserToUserList(userAdd: gameUser | null) {
    if (userAdd && !this.usersList.find((user) => user.id === userAdd.id)) {
      this.usersList.push(userAdd);
    }
  }

  removeFromUserList(userRemove: gameUser | null) {
    if (
      userRemove &&
      this.usersList.find((user) => user.id === userRemove.id)
    ) {
      this.usersList = this.usersList.filter(
        (user) => user.id !== userRemove.id,
      );
    }
  }
}
