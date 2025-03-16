import * as process from "process";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
  const PORT = process.env.PORT || 3030;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  return await app.listen(PORT, () =>
    console.log(`Server start on Port: ${PORT}`),
  );
}

start();
