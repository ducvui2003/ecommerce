import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import {
  CommentResponseDto,
  CommentUpdateDto,
  CreateCommentDto,
} from '@route/comment/comment.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { PrismaUserRepository } from '@route/user/user.repository';

@Injectable()
export class CommentService {
  constructor(
    @Inject() private readonly commentRepository: CommentRepository,
    @Inject('USER_REPOSITORY') private readonly userRepository: PrismaUserRepository,
  ) {}

  async getCommentByProductId(id: string, page: number, size: number): Promise<Paging<CommentResponseDto>> {
    const productId = Number(id);
    if (isNaN(productId)) {
      throw new BadRequestException('Product id must be a number');
    }
    const result = await this.commentRepository.getComments({
      productId,
      page: page,
      size: size,
    });

    if (!result.items || result.items.length === 0) {
      throw new NotFoundException('No comments found for this product');
    }

    const enrichedItems: CommentResponseDto[] = [];

    for (const comment of result.items) {
      const user = await this.userRepository.getInfo(comment.userId);
      enrichedItems.push({
        ...comment,
        username: user.name || 'Ẩn danh',
      });
    }

    return {
      ...result,
      items: enrichedItems,
    };
  }

  async createComment(data: CreateCommentDto, userId: number) {
    if (!data.content || data.content.trim().length === 0) {
      throw new BadRequestException('content not empty');
    }
    if (data.parentId) {
      const parentComment = await this.commentRepository.findById(
        data.parentId,
      );
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

  async likeComment(commentId: string, userId: number): Promise<boolean> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const existingLike = await this.commentRepository.findLikeByUserAndComment(
      userId,
      commentId,
    );

    if (existingLike) {
      await this.commentRepository.deleteLike(userId, commentId);
      await this.commentRepository.decrementCommentLike(commentId);
      return false;
    }

    await this.commentRepository.createLike(userId, commentId);
    await this.commentRepository.incrementCommentLike(commentId);
    return true;
  }
}