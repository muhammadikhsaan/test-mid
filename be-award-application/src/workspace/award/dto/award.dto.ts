import { ApiPropertyOptional } from '@nestjs/swagger';
import { MetaResponse } from 'src/shared/dto/meta.dto';
import { AwardType, AwardTypeEnum } from 'src/shared/enums/award.enum';

export class AwardFindAllRequestDto {
  @ApiPropertyOptional({
    type: Number,
  })
  min_point?: number;

  @ApiPropertyOptional({
    type: Number,
  })
  max_point?: number;

  @ApiPropertyOptional({
    type: String,
    example: ['ALL', 'OTHER', ...Object.keys(AwardTypeEnum)].join(','),
  })
  type?: string;

  @ApiPropertyOptional({
    type: Number,
  })
  skip?: number;
}

export class AwardFindAllResponseDto {
  @ApiPropertyOptional({
    type: String,
  })
  slug: string;

  @ApiPropertyOptional({
    enum: Object.keys(AwardTypeEnum),
  })
  award_type: AwardType;

  @ApiPropertyOptional({
    type: Number,
  })
  point_exchanges: number;

  @ApiPropertyOptional({
    type: String,
  })
  award_name: string;

  @ApiPropertyOptional({
    type: String,
  })
  award_image: string;
}

export class AwardFindAllResponseDocumentation extends MetaResponse<AwardFindAllResponseDto> {
  @ApiPropertyOptional({
    type: AwardFindAllResponseDto,
  })
  data?: AwardFindAllResponseDto;
}
