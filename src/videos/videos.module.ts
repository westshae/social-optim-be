import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VideosController } from "./videos.controller";
import { VideosEntity } from "./videos.entity";
import { VideosService } from "./videos.service";

@Module({
  imports: [TypeOrmModule.forFeature([VideosEntity])],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
