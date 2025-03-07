import { Body, Controller, Inject, Post } from '@nestjs/common';
import { GoogleBodyReq } from '@route/oauth/oauth.dto';
import { OauthService } from '@route/oauth/oauth.service';

@Controller('/api/oauth2')
export class OauthController {
  constructor(
    @Inject('GOOGLE_SERVICE')
    private readonly oauthService: OauthService,
  ) {}

  @Post('/google')
  async loginGoogle(@Body() req: GoogleBodyReq) {
    const user = await this.oauthService.login(req.accessToken);
    return user;
  }
}
