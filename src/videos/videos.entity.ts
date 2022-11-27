import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class VideosEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  channelName: string;

  @Column()
  subscribers: number;

  @Column()
  views: number;

  @Column()
  channelVideoCount: number;
}
