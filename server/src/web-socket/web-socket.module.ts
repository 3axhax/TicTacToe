import { Module } from "@nestjs/common";
import { WebSocketService } from "./web-socket.service";
import { WebsocketGateway } from "./web-socket.gateway";

@Module({
  providers: [WebsocketGateway, WebSocketService],
})
export class WebSocketModule {}
