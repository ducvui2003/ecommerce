import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RegisterReqDTO } from 'src/routes/auth/auth.dto';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
  ) {}
  async register(req: RegisterReqDTO) {
    try {
      const hashing = await this.hashingService.hash(req.password);
      const userCreated = await this.prismaService.user.create({
        data: {
          email: req.email,
          name: req.name,
          password: hashing,
        },
      });
      return userCreated;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }
      throw error;
    }
  }
}
