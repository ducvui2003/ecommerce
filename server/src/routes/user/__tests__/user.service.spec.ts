import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@route/user/user.controller';
import { UserInfoBodyReq } from '@route/user/user.dto';
import { UserModule } from '@route/user/user.module';
import { UserService } from '@route/user/user.service';

describe('UserService', () => {
  let userService: UserService;
  const mockUsers = [{ id: 1, name: 'John Doe' }];

  const mockUserRepository = {
    getInfo: jest
      .fn()
      .mockImplementation((id) => mockUsers.map((item) => item.id == id)),

    updateInfo: jest
      .fn()
      .mockImplementation((id: number, info: UserInfoBodyReq) =>
        mockUsers.map((item) => item.id == id),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      controllers: [UserController],
    })
      .overrideProvider('USER_REPOSITORY')
      .useClass(mockUserRepository)
      .compile();

    userService = module.get<UserService>(UserService);
  });

  it('should return an array of users', async () => {
    const result = await userService.getInfo(1);
    console.log(result);
    expect(result).toEqual(mockUsers.map((item) => item.id == 1));
    expect(mockUserRepository.getInfo).toHaveBeenCalledTimes(1);
  });
});
