import { Module } from '@nestjs/common';
import { PrismaOauthRepository } from '@route/oauth/oauth.repository';
import { OauthController } from './oauth.controller';
import { GoogleService, OauthService } from './oauth.service';
import { AuthModule } from '@route/auth/auth.module';

@Module({
  controllers: [OauthController],
  imports: [AuthModule],
  providers: [
    {
      provide: 'GOOGLE_SERVICE',
      useClass: GoogleService,
    },
    {
      provide: 'OAUTH_REPOSITORY',
      useClass: PrismaOauthRepository,
    },
  ],
})
export class OauthModule {}
