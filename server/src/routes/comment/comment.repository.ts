import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';
import {
  CommentResponseDto,
  CreateCommentDto, GetCommentDto,
} from '@route/comment/comment.dto';
import { Comment } from '@prisma/client';
import { Paging } from '@shared/common/interfaces/paging.interface';

@Injectable()
export class CommentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getComments(dto: GetCommentDto): Promise<Paging<CommentResponseDto>> {
    const { productId, page, size } = dto;

    const whereClause = {
      productId,
      deletedAt: null,
    };

    const [totalItems, comments] = await this.prismaService.$transaction([
      this.prismaService.comment.count({ where: whereClause }),
      this.prismaService.comment.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * size,
        take: size,
      }),
    ]);

    const items = this.mapListToCommentResponseDto(comments);

    return {
      items,
      pagination: {
        page,
        limit: size,
        totalPages: Math.ceil(totalItems / size),
        totalItems,
      },
    };
  }


  async createComment(
    data: CreateCommentDto,
    userId: number,
  ): Promise<CommentResponseDto> {
    const comment = await this.prismaService.comment.create({
      data: {
        content: data.content,
        userId: userId,
        like: data.likes,
        productId: data.product,
        parentId: data?.parentId,
      },
    });
    return this.mapToCommentResponseDto(comment);
  }

  async updateComment(
    id: string,
    content: string,
  ): Promise<CommentResponseDto> {
    const comment = await this.prismaService.comment.update({
      where: { id },
      data: {
        content,
      },
    });
    return this.mapToCommentResponseDto(comment);
  }

  async deleteComment(id: string) {
    return this.prismaService.comment.delete({
      where: { id },
    });
  }

  findById(id: string) {
    return this.prismaService.comment.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findLikeByUserAndComment(userId: number, commentId: string) {
    return this.prismaService.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });
  }

  async createLike(userId: number, commentId: string) {
    return this.prismaService.commentLike.create({
      data: { userId, commentId },
    });
  }

  async deleteLike(userId: number, commentId: string) {
    return this.prismaService.commentLike.delete({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });
  }

  async incrementCommentLike(commentId: string) {
    return this.prismaService.comment.update({
      where: { id: commentId },
      data: { like: { increment: 1 } },
    });
  }

  async decrementCommentLike(commentId: string) {
    return this.prismaService.comment.update({
      where: { id: commentId },
      data: { like: { decrement: 1 } },
    });
  }

  mapToCommentResponseDto(comment: Comment): CommentResponseDto {
    return {
      id: comment.id,
      content: comment.content,
      parentId: comment.parentId ?? undefined,
      updatedAt: comment.updatedAt ?? comment.createdAt,
      likes: comment.like,
      userId : comment.userId,
    };
  }

  mapListToCommentResponseDto(comments: Comment[]): CommentResponseDto[] {
    return comments.map((comment) => this.mapToCommentResponseDto(comment));
  }
}
