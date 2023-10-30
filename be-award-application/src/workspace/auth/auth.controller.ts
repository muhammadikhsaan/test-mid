import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginAuthRequestDto,
  LoginAuthResponseDocumentation,
  LoginAuthResponseDto,
} from './dto/login-auth.dto';
import { MetaResponse } from 'src/shared/dto/meta.dto';
import { ConfigService } from '@nestjs/config';
import { ApiResponse } from '@nestjs/swagger';
import { COOKIE_KEY } from 'src/shared/constant/key.constant';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly as: AuthService,
    private readonly cs: ConfigService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Response will token on cookie',
    type: LoginAuthResponseDocumentation,
  })
  @Post('/login')
  async login(@Body() body: LoginAuthRequestDto, @Res() res: Response) {
    const { as, cs } = this;
    const { token, expired } = await as.loginService(body);

    return res
      .status(HttpStatus.OK)
      .cookie(COOKIE_KEY, token, {
        httpOnly: true,
        expires: expired,
        secure: cs.get<boolean>('APPLICATION_SECURE_COOKIE'),
      })
      .json(
        new MetaResponse<LoginAuthResponseDto>({
          status: 'success',
          data: { access_token: token },
        }),
      )
      .send();
  }

  @ApiResponse({
    status: 200,
    description: 'Response will delete cookie',
    type: MetaResponse,
  })
  @Delete('/logout')
  register(@Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .cookie(COOKIE_KEY, '', {
        httpOnly: true,
        expires: new Date(),
      })
      .json(
        new MetaResponse<LoginAuthResponseDto>({
          status: 'success',
        }),
      )
      .send();
  }
}
