import { Injectable } from "@nestjs/common";
import { WebSocketServer } from "@nestjs/websockets";
import {RemoteSocket, Server, Socket} from "socket.io";
import { GAME_ROOM } from "./GameWebsocket.constants";
import {GamerClientType} from "./GameWebsocket.gateway";

export interface gameUser {
  id: number;
  email: string;
  name: string;
}

export interface inviteRequestType {
  userId: number,
  userIdInvited: number,
}

interface GameEventsType {
  inviteList: any
}

interface invitedListType {
  [index: number]: number[]
}

@Injectable()
export class GameWebsocketService {
  @WebSocketServer() server: Server;

  usersList: gameUser[] = [];
  invitedList: invitedListType = <invitedListType>{};

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

  createInvite(data: inviteRequestType) {
    if (!this.invitedList[data.userIdInvited]) {
      this.invitedList[data.userIdInvited] = [data.userId];
    }
    else if (!this.invitedList[data.userIdInvited].includes(data.userId)) {
      this.invitedList[data.userIdInvited].push(data.userId);
    }
    this._emitMessageByUserId(data.userIdInvited, 'inviteList', this.invitedList[data.userIdInvited]);

  }

  async _emitMessageByUserId(userId: number, message, data) {
    (await this.server.fetchSockets()).forEach((client: RemoteSocket<GameEventsType, GamerClientType>) => {
      if(client.data.userId === userId) {
        client.emit(message, data);
      }
    })
  }
}
