import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';
import { CommentResponseDto, CreateCommentDto } from '@route/comment/comment.dto';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async getComments(productId: number): Promise<CommentResponseDto[]> {
    const comments = await this.prismaService.comment.findMany({
      where: {
        productId: productId,
        deletedAt: null
      }
    });
    return this.mapListToCommentResponseDto(comments);
  }

    async createComment(data: CreateCommentDto, userId: number): Promise<CommentResponseDto> {
    const comment = await  this.prismaService.comment.create({
      data: {
        content: data.content,
        userId: userId,
        like: data.likes,
        productId: data.product,
        parentId: data?.parentId
      }
    });
    return this.mapToCommentResponseDto(comment)
  }

  async updateComment(id: string, content: string) : Promise<CommentResponseDto> {
    const comment = await this.prismaService.comment.update({
      where: { id },
      data: {
        content
      }
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
        id: id
      }
    });
  }

  mapToCommentResponseDto(comment: Comment): CommentResponseDto {
    return {
      id: comment.id,
      content: comment.content,
      parentId: comment.parentId ?? undefined,
      updatedAt: comment.updatedAt ?? comment.createdAt,
      likes: comment.like,
    };
  }
  mapListToCommentResponseDto(comments: Comment[]): CommentResponseDto[] {
    return comments.map((comment) => this.mapToCommentResponseDto(comment));
  }


}