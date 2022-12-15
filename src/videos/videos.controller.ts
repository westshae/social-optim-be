import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  checkEmail,
  checkToken,
} from "src/utility/sanitise";
import { VideosService } from "./videos.service";
@Controller("videos")
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get("getVideo")
  async getVideo(@Query() query) {
    try {
      let videoId = query.videoId;
      return await this.videosService.getVideo(videoId);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("multiupload")
  multiUpload(@Body() body) {
    try {
      let content = body.json;
      let email = body.email;
      let token = body.token;
      if (!checkEmail(email) || !checkToken(email, token)) return false;
      this.videosService.uploadMulti(content);
    } catch (e) {
      console.error(e);
    }
  }

  @Get("getChannelsBestVideos")
  async getChannelsBestVideos(){
    return await this.videosService.getChannelsBestVideos();
  }
}
