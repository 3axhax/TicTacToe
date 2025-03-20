import { forwardRef, Module } from "@nestjs/common";
import { GameWebsocketService } from "./GameWebsocket.service";
import { GameWebsocketGateway } from "./GameWebsocket.gateway";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../../users/users.module";

@Module({
  providers: [GameWebsocketGateway, GameWebsocketService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET_123",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
})
export class GameWebsocketModule {}
