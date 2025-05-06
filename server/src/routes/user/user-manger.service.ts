import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@route/user/user.repository';
import { GetUserQueryType } from '@route/user/user.schema';

@Injectable()
export class UserManagerService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}
  getList(pageable: GetUserQueryType) {
    return this.userRepository.getList(pageable);
  }
}
