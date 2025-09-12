import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongooseModule } from "@nestjs/mongoose";
import { Club } from "./clubes.entity";
import { Escudo, EscudoSchema } from "./escudo.schema";
import { ClubesService } from "./clubes.service";
import { ClubesController } from "./clubes.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Club]),
    MongooseModule.forFeature([{ name: Escudo.name, schema: EscudoSchema }])
  ],
  providers: [ClubesService],
  controllers: [ClubesController],
})
export class ClubesModule {}
