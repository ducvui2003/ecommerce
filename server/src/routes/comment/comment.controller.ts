import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from '@route/payment/payment.service';
import { CommentService } from '@route/comment/comment.service';
import { CreateCommentDto } from '@route/comment/comment.dto';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { MessageHttp } from '@shared/decorators/message.decorator';

@Controller('/api/v1/comment')
export class CommentController {
  constructor(@Inject() private readonly commentService: CommentService) {
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Create comment for product')
  @Auth([AuthType.Bearer])
  async createComment(@Body() data: CreateCommentDto) {
    return this.commentService.createComment(data);
  }
}