import { Module } from "@nestjs/common";
import { GameWebsocketService } from "./GameWebsocket.service";
import { GameWebsocketGateway } from "./GameWebsocket.gateway";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [GameWebsocketGateway, GameWebsocketService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET_123",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
})
export class GameWebsocketModule {}
