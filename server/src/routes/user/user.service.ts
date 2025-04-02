import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserInfoBodyReq } from '@route/user/user.dto';
import { UserRepository } from '@route/user/user.repository';
import { isNotFoundError } from '@shared/helper.shared';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}

  async getInfo(id: number) {
    try {
      return await this.userRepository.getInfo(id);
    } catch (error) {
      if (isNotFoundError(error)) {
        throw new NotFoundException('User not found');
      }

      throw error;
    }
  }

  async updateInfo(id: number, info: UserInfoBodyReq) {
    try {
      return await this.userRepository.updateInfo(id, info);
    } catch (error) {
      if (isNotFoundError(error)) {
        throw new NotFoundException('User not found');
      }

      throw error;
    }
  }
}
