import { Injectable, NotFoundException } from '@nestjs/common';
import { InfoReqDTO } from 'src/routes/user/user.dto';
import { isNotFoundError } from 'src/shared/helper.shared';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getInfo(id: number): Promise<InfoReqDTO> {
    try {
      const user = await this.prismaService.user.findFirstOrThrow({
        where: {
          id: id,
        },
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      if (isNotFoundError(error)) {
        throw new NotFoundException('User not found');
      }

      throw error;
    }
  }
}
