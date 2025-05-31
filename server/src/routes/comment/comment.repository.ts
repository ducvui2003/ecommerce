import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';
import { PaymentRepository } from '@route/payment/payment.repository';
import { CreateCommentDto } from '@route/comment/comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async createComment(data: CreateCommentDto) {
    return this.prismaService.comment.create({
      data: {
        content: data.content,
        userId: data.userId,
        like: data.likes,
        productId: data.product,
        parentId: data?.parentId
      }
    });
  }

  findById(id: string) {
    return this.prismaService.comment.findUnique({
      where: {
        id: id
      }
    });
  }
}