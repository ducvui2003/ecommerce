import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put, Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from '@route/comment/comment.service';
import {
  CommentResponseDto,
  CommentUpdateDto,
  CreateCommentDto,
} from '@route/comment/comment.dto';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { ActiveUser } from '@shared/decorators/active-user.decorator';
import { Paging } from '@shared/common/interfaces/paging.interface';

@Controller('/api/v1/comment')
export class CommentController {
  constructor(@Inject() private readonly commentService: CommentService) {}

  @Get(':id')
  @MessageHttp('Get all comments for product')
  async getComments(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ): Promise<Paging<CommentResponseDto>> {
    return this.commentService.getCommentByProductId(id, page, size);
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Create comment for product')
  @Auth([AuthType.Bearer])
  async createComment(
    @Body() data: CreateCommentDto,
    @ActiveUser('id') id: number,
  ) {
    return this.commentService.createComment(data, id);
  }

  @Put()
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Update comment for product')
  @Auth([AuthType.Bearer])
  async updateComment(
    @Body() data: CommentUpdateDto,
    @ActiveUser('id') id: number,
  ) {
    return this.commentService.updateComment(data, id);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  async deleteComment(
    @Param('id') id: string,
    @ActiveUser('id') idUser: number,
  ) {
    const success = await this.commentService.deleteComment(id, idUser);
    return { status: success };
  }

  @Put('/:id/like')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Like comment')
  @Auth([AuthType.Bearer])
  async likeComment(@Param('id') id: string, @ActiveUser('id') idUser: number) {
    return this.commentService.likeComment(id, idUser);
  }
}
