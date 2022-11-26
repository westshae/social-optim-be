import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseConnectionService } from "./database-connection.service";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { FeedModule } from "./feed/feed.module";
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    AuthModule,
    PostsModule,
    FeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
