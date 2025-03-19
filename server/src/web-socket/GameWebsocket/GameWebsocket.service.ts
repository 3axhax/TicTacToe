import { Injectable } from "@nestjs/common";
import { WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import {JwtService} from "@nestjs/jwt";
import {GAME_ROOM} from "./GameWebsocket.constants";

interface User {
  id: number,
  email: string,
  name: string,
}

@Injectable()
export class GameWebsocketService {
  @WebSocketServer() server: Server;

  usersList: User[] = [];

  constructor(private jwtService: JwtService) {}

  getOnlineUsersCount() {
    this.server
      .in(GAME_ROOM)
      .emit("onlineUsersCount", this.usersList.length);
  }

  getOnlineUsersList() {
    this.server
        .in(GAME_ROOM)
        .emit("onlineUsersList", this.usersList);
  }

  addUserToUserList(token: string) {
    const userAdd = this.jwtService.verify(token);
    if (userAdd && !this.usersList.find(user => user.id === userAdd.id)) {
      this.usersList.push(userAdd);
    }
  }

  removeFromUserList(token: string) {
    const userRemove = this.jwtService.verify(token);
    if (userRemove && this.usersList.find(user => user.id === userRemove.id)) {
      this.usersList = this.usersList.filter(user => user.id !== userRemove.id);
    }
  }
}
