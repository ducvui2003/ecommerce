import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OAuth2BodyReq } from '@route/oauth/oauth.dto';
import { OauthService } from '@route/oauth/oauth.service';

@Controller('/api/oauth2')
export class OauthController {
  constructor(
    @Inject('GOOGLE_SERVICE')
    private readonly googleService: OauthService,
    @Inject('FACEBOOK_SERVICE')
    private readonly facebookService: OauthService,
  ) {}

  @Post()
  async login(@Body() req: OAuth2BodyReq) {
    let user;
    switch (req.provider) {
      case 'google': {
        user = await this.googleService.login(req.accessToken);
        break;
      }
      case 'facebook': {
        user = await this.facebookService.login(req.accessToken);
        break;
      }
    }

    return user;
  }
}
