import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VideosEntity } from "./videos.entity";
import { Repository } from "typeorm";
import "dotenv/config";
import { channel } from "diagnostics_channel";

@Injectable()
export class VideosService {
  @InjectRepository(VideosEntity)
  private readonly videosRepo: Repository<VideosEntity>;


  async getVideo(videoId: string) {
    let data = await this.videosRepo.findOne({ id: videoId });
    return data;
  }

  async uploadMulti(content: string){
    let obj = JSON.parse(content);
    for(let json of obj){
      try{
        if ((await this.videosRepo.findOne({ id: json.id })) !== undefined) continue;
        try{
          json.subscribers = parseInt(json.subscribers.replace(/\D/g, ''));
        }catch(e){}
        const toInsert = {
          id: json.id,
          title: json.title,
          channelName:json.channelName,
          subscribers: json.subscribers,
          views:json.views,
          channelVideoCount:json.channelVideoCount
        }
        this.videosRepo.insert(toInsert);
      }catch(e){
        console.error(e);
      }
    }
  }
}
