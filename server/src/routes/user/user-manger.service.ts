import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import { USER_REPOSITORY } from '@route/user/user.const';
import { UserRepository } from '@route/user/user.repository';
import {
  GetUserDetailResSchema,
  GetUserDetailResType,
  GetUserQueryType,
  GetUserResSchema,
  GetUserResType,
} from '@route/user/user.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { SHARED_USER_REPOSITORY } from '@shared/constants/dependency.constant';
import { isNotFoundError, transformItemsPaging } from '@shared/helper.shared';
import { UserType } from '@shared/models/user.model';
import { SharedUserRepository } from '@shared/repositories/shared-user.repository';

@Injectable()
export class UserManagerService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(SHARED_USER_REPOSITORY)
    private readonly sharedUserRepository: SharedUserRepository,
  ) {}
  async getList(pageable: GetUserQueryType): Promise<Paging<GetUserResType>> {
    const data: Paging<UserType> = await this.userRepository.getList(pageable);
    return transformItemsPaging<GetUserResType, UserType>(data, (item) => {
      return GetUserResSchema.parse({
        ...item,
        role: item.role.name,
      });
    });
  }
  async getDetail(userId: number): Promise<GetUserDetailResType> {
    const data = await this.sharedUserRepository.findDetailByUnique({
      id: userId,
    });
    if (data == null) {
      throw new NotFoundException();
    }

    return GetUserDetailResSchema.parse({
      ...data,
      role: data.role.name,
      addresses: data.addresses?.map((item) => {
        return {
          province: item.province,
          district: item.district,
          ward: item.ward,
          detail: item.detail,
        };
      }),
    });
  }

  async changeStatus(userId: number, status: UserStatus): Promise<void> {
    try {
      await this.userRepository.updateStatus(userId, status);
    } catch (e) {
      if (isNotFoundError(e)) {
        throw new Error();
      }
    }
  }
}
