import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentService } from '@route/comment/comment.service';
import { CommentUpdateDto, CreateCommentDto } from '@route/comment/comment.dto';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { ActiveUser } from '@shared/decorators/active-user.decorator';
import { JwtCustomClaims } from '@shared/types/jwt.type';

@Controller('/api/v1/comment')
export class CommentController {
  constructor(@Inject() private readonly commentService: CommentService) {
  }

  @Get(':id')
  @MessageHttp('Get all comments for product')
  async getComments(@Param('id') id: string) {
    return this.commentService.getCommentByProductId(id);
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Create comment for product')
  @Auth([AuthType.Bearer])
  async createComment(@Body() data: CreateCommentDto, @ActiveUser() user: JwtCustomClaims) {
    return this.commentService.createComment(data, user.id);
  }

  @Put()
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Update comment for product')
  @Auth([AuthType.Bearer])
  async updateComment(@Body() data: CommentUpdateDto, @ActiveUser() user: JwtCustomClaims) {
    return this.commentService.updateComment(data, user.id);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  async deleteComment(@Param('id') id: string, @ActiveUser() user: JwtCustomClaims,) {
    const success = await this.commentService.deleteComment(id, user.id);
    return { status: success };
  }

  @Put('/:id/like')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Like comment')
  @Auth([AuthType.Bearer])
  async likeComment(@Param('id') id: string, @ActiveUser() user: JwtCustomClaims) {
    return this.commentService.likeComment(id, user.id);
  }
}