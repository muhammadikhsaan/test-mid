import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MetaResponse<T extends object> {
  @ApiProperty({
    example: 'success',
  })
  status: 'success' | 'failed';

  @ApiPropertyOptional()
  message?: string;

  data?: T;

  constructor(params: MetaResponse<T>) {
    this.status = params.status;
    this.message = params?.message;
    this.data = params?.data;
  }
}
