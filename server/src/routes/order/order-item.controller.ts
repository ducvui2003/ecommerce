import {
  Controller,
  Get,
  HttpCode,
  HttpStatus, Param, ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from '@route/review/review.service';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import { ActiveUser } from '@shared/decorators/active-user.decorator';
import { GetReviewOfOrderItemResDTO } from '@route/review/review.dto';

@Controller('/api/v1/order-items')
export class OrderItemController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @HttpCode(HttpStatus.OK)
  @Get(':id/reviews')
  getReviewOfOrderItem(
    @ActiveUser('id') userId: number,
    @Param('id', ParseIntPipe) orderItemId: number,
  ): Promise<GetReviewOfOrderItemResDTO> {
    return this.reviewService.getReviewOfOrderItem(userId, orderItemId);
  }
}
