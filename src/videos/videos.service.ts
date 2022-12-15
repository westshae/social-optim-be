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
          ratio: json.ratio,
          channelVideoCount:json.channelVideoCount
        }
        this.videosRepo.insert(toInsert);
        await new Promise(r => setTimeout(r, 50));
      }catch(e){
        console.error(e);
      }
    }
  }

  async getChannelsBestVideos(){
    const videos = await this.videosRepo
      .createQueryBuilder('video')
      .select("*")
      .where("video.ratio > 1")
      .where("video.subscribers < 50000")
      .where("video.channelVideoCount < 50")
      .orderBy('video.ratio', 'DESC')
      .getRawMany()

      // .where("video.ratio > 1 AND video.subscribers > 50000 AND video.channelVideoCount > 50")

      
    return videos;
  }
}