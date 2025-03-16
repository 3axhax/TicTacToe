import { Injectable } from "@nestjs/common";

@Injectable()
export class WebSocketService {
  findAll() {
    console.log("Service findAll");
    return `This action returns all webSocket`;
  }
}
