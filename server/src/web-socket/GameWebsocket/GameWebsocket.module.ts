import { Module } from "@nestjs/common";
import { GameWebsocketService } from "./GameWebsocket.service";
import { GameWebsocketGateway } from "./GameWebsocket.gateway";

@Module({
  providers: [GameWebsocketGateway, GameWebsocketService],
})
export class GameWebsocketModule {}
