import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CommentsService } from './comments/comments.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {

  constructor(private readonly commentsService: CommentsService) {}

  getHello(): string {
    return 'Hello World!';
  }


  @Cron('0 0 * * *',  { timeZone: 'Asia/Manila' }) // runs every day at midnight
  async resetData() {
    await this.commentsService.deleteAllComments();
  }
}
