import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from '@route/comment/comment.dto';

@Injectable()
export class CommentService {
  constructor(@Inject() private readonly commentRepository: CommentRepository) {
  }

  async createComment(data: CreateCommentDto) {
    if (!data.content || data.content.trim().length === 0) {
      throw new BadRequestException('content not empty');
    }
    if (data.parentId) {
      const parentComment = await this.commentRepository.findById(data.parentId);
      if (!parentComment) {
        throw new BadRequestException('Parent comment not found');
      }
    }
    return this.commentRepository.createComment(data);
  }
}