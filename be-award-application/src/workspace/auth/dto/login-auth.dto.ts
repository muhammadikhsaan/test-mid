import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { MetaResponse } from 'src/shared/dto/meta.dto';

export class LoginAuthRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'creadential email user',
    required: true,
    type: String,
  })
  email: string;
}

export class LoginAuthResponseDto {
  @ApiProperty()
  access_token: string;
}

export class LoginAuthResponseDocumentation extends MetaResponse<LoginAuthResponseDto> {
  @ApiPropertyOptional({
    type: LoginAuthResponseDto,
  })
  data?: LoginAuthResponseDto;
}
