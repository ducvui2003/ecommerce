import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentResponseDto, CommentUpdateDto, CreateCommentDto } from '@route/comment/comment.dto';

@Injectable()
export class CommentService {
  constructor(@Inject() private readonly commentRepository: CommentRepository) {
  }

  async getCommentByProductId(productId: number): Promise<CommentResponseDto[]> {
    const comments: CommentResponseDto[] = await this.commentRepository.getComments(productId);

    if (!comments || comments.length === 0) {
      throw new NotFoundException('No comments found for this product');
    }

    return comments;

  }

  async createComment(data: CreateCommentDto, userId: number) {
    if (!data.content || data.content.trim().length === 0) {
      throw new BadRequestException('content not empty');
    }
    if (data.parentId) {
      const parentComment = await this.commentRepository.findById(data.parentId);
      if (!parentComment) {
        throw new BadRequestException('Parent comment not found');
      }
    }
    return this.commentRepository.createComment(data, userId);
  }

  async updateComment(data: CommentUpdateDto, userId: number) {
    if (!data.content || data.content.trim().length === 0) {
      throw new BadRequestException('Content cannot be empty');
    }

    const comment = await this.commentRepository.findById(data.commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.userId !== userId) {
      throw new ForbiddenException('You can only update your own comment');
    }

    return this.commentRepository.updateComment(data.commentId, data.content);
  }

  async deleteComment(commentId: string, userId: number): Promise<boolean> {
    const comment = await this.commentRepository.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('You can only delete your own comment');
    }

    try {
      await this.commentRepository.deleteComment(commentId);
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw new InternalServerErrorException('Failed to delete comment');
    }
  }


}