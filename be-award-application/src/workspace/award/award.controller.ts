import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AwardService } from './award.service';
import {
  AwardFindAllRequestDto,
  AwardFindAllResponseDocumentation,
  AwardFindAllResponseDto,
} from './dto/award.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt.guard';
import { UserEntity } from 'src/shared/database/entities/user.entity';
import { User } from 'src/shared/decorator/user.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { MetaResponse } from 'src/shared/dto/meta.dto';

@Controller('award')
export class AwardController {
  constructor(private readonly as: AwardService) {}

  @ApiResponse({
    status: 200,
    description: '',
    type: AwardFindAllResponseDocumentation,
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllAward(
    @User() user: UserEntity,
    @Query() query: AwardFindAllRequestDto,
    @Res() resp: Response,
  ) {
    const { as } = this;

    const award = await as.findAllAward(user, query);

    return resp.status(HttpStatus.OK).json(
      new MetaResponse<Array<AwardFindAllResponseDto>>({
        status: 'success',
        data: award.map((data) => ({
          slug: data.slug,
          award_type: data.award_type,
          point_exchanges: +data.point_exchanges,
          award_name: data.award_name,
          award_image: data.award_image,
        })),
      }),
    );
  }
}
