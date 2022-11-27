import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VideosEntity } from "./videos.entity";
import { Repository } from "typeorm";
import "dotenv/config";

@Injectable()
export class VideosService {
  @InjectRepository(VideosEntity)
  private readonly videosRepo: Repository<VideosEntity>;


  async getVideo(videoId: string) {
    let data = await this.videosRepo.findOne({ id: videoId });
    return data;
  }
}
