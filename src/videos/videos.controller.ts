import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  checkEmail,
  checkPostID,
  checkStringContent,
  checkToken,
} from "src/utility/sanitise";
import { VideosService } from "./videos.service";
@Controller("videos")
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get("get")
  async getVideo(@Query() query) {
    try {
      let videoId = query.videoId;
      return await this.videosService.getVideo(videoId);
    } catch (e) {
      console.error(e);
    }
  }
}
