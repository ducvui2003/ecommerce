import { Inject, Injectable } from '@nestjs/common';
import { FacebookInfo, GoogleInfo, UserOauth2 } from '@route/oauth/oauth.model';
import { OAuthRepository } from '@route/oauth/oauth.repository';
import { v4 as uuidv4 } from 'uuid';
import { HashingService } from '@shared/services/hashing.service';
import { AuthService } from '@route/auth/auth.service';
import { SharedUserRepository } from '@shared/repositories/shared-user.repository';
import { buildUrl } from '@shared/helper.shared';
import { RoleService } from '@shared/services/role.service';
import { SHARED_USER_REPOSITORY } from '@shared/constants/dependency.constant';
import { keyRefreshToken } from '@shared/services/cache/cache.util';
import { CacheService } from '@shared/services/cache/cache.service';

@Injectable()
export abstract class OauthService {
  constructor(
    @Inject('OAUTH_REPOSITORY')
    private readonly oauthRepository: OAuthRepository,
    private readonly hashingService: HashingService,
    private readonly roleService: RoleService,
    private readonly authService: AuthService,
    @Inject(SHARED_USER_REPOSITORY)
    private readonly userRepository: SharedUserRepository,
    private readonly cacheService: CacheService,
  ) {}

  abstract getInfo(accessToken: string): Promise<UserOauth2 | undefined>;

  async login(accessToken: string): Promise<any> {
    const info = await this.getInfo(accessToken);
    // Không lấy được thông tin từ OAuth
    if (!info) {
      throw new Error();
    }

    let user = await this.userRepository.findUnique({
      email: info.email,
    });

    if (user === null) {
      const clientRoleId = await this.roleService.getClientRoleId();
      const passwordUUID = uuidv4();
      const passwordHashing = await this.hashingService.hash(passwordUUID);
      user = await this.oauthRepository.createUser({
        email: info.email,
        roleId: clientRoleId,
        name: info.name,
        avatar: info.avatar,
        password: passwordHashing,
      });
    }

    if (!user) {
      throw new Error('User oauth2 creation failed.');
    }

    const [appAccessToken, appRefreshToken] =
      await this.authService.generateToken({
        id: user.id,
        email: user.email,
      });

    const ttl = appRefreshToken.exp - appRefreshToken.iat;
    this.cacheService.set(
      keyRefreshToken(user.id, appRefreshToken.jti),
      appRefreshToken,
      ttl * 1000,
    );

    return {
      id: user.id,
      email: user.email,
      accessToken: appAccessToken.token,
      refreshToken: appRefreshToken.token,
      exp: appAccessToken.exp,
    };
  }
}

@Injectable()
export class GoogleService extends OauthService {
  constructor(
    @Inject('OAUTH_REPOSITORY') oauthRepository: OAuthRepository,
    hashingService: HashingService,
    roleService: RoleService,
    authService: AuthService,
    userRepository: SharedUserRepository,
    cacheService: CacheService,
  ) {
    super(
      oauthRepository,
      hashingService,
      roleService,
      authService,
      userRepository,
      cacheService,
    );
  }

  async getInfo(accessToken: string): Promise<UserOauth2 | undefined> {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) return undefined;
    const data: GoogleInfo = await res.json();

    return {
      name: data.name,
      email: data.email,
      avatar: data.picture,
    };
  }
}

@Injectable()
export class FacebookService extends OauthService {
  constructor(
    @Inject('OAUTH_REPOSITORY') oauthRepository: OAuthRepository,
    hashingService: HashingService,
    roleService: RoleService,
    authService: AuthService,
    userRepository: SharedUserRepository,
    cacheService: CacheService,
  ) {
    super(
      oauthRepository,
      hashingService,
      roleService,
      authService,
      userRepository,
      cacheService,
    );
  }
  async getInfo(accessToken: string): Promise<UserOauth2 | undefined> {
    const urlWithParams = buildUrl('https://graph.facebook.com/me', {
      access_token: accessToken,
      fields: 'id,name,email,picture',
    });
    const res = await fetch(urlWithParams);
    if (!res.ok) return undefined;
    const data: FacebookInfo = await res.json();

    return {
      name: data.name,
      email: data.email,
    };
  }
}
