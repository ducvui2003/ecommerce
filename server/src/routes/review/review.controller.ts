import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import { ActiveUser } from '@shared/decorators/active-user.decorator';
import { SendReviewReqDTO } from '@route/review/review.dto';

@Controller('/api/v1/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @HttpCode(HttpStatus.OK)
  @Post()
  createReview(
    @ActiveUser('id') userId: number,
    @Body() body: SendReviewReqDTO,
  ) {
    return this.reviewService.sendReview(userId, body);
  }

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  editReview(
    @ActiveUser('id') userId: number,
    @Body() body: SendReviewReqDTO,
    @Param('id', ParseIntPipe) reviewId: number,
  ) {
    return this.reviewService.sendReview(userId, body, reviewId);
  }
}
