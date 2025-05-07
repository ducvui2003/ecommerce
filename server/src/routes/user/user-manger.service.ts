import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '@route/user/user.const';
import { UserRepository } from '@route/user/user.repository';
import {
  GetUserDetailResType,
  GetUserQueryType,
} from '@route/user/user.schema';
import { SHARED_USER_REPOSITORY } from '@shared/constants/dependency.constant';
import { SharedUserRepository } from '@shared/repositories/shared-user.repository';

@Injectable()
export class UserManagerService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(SHARED_USER_REPOSITORY)
    private readonly sharedUserRepository: SharedUserRepository,
  ) {}
  getList(pageable: GetUserQueryType) {
    return this.userRepository.getList(pageable);
  }
  async getDetail(userId: number): Promise<GetUserDetailResType> {
    const data = await this.sharedUserRepository.findDetailByUnique({
      id: userId,
    });
    if (data == null) {
      throw new NotFoundException();
    }
    const { addresses, role, roleId, ...props } = data;
    return {
      ...props,
      role: role?.name ?? '',
      addresses,
    };
  }
}
