import { Module } from '@nestjs/common';
import { CommentController } from '@route/comment/comment.controller';
import { CommentService } from '@route/comment/comment.service';
import { CommentRepository } from '@route/comment/comment.repository';
import { UserModule } from '@route/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
