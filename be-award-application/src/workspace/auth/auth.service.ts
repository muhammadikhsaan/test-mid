import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthRequestDto } from './dto/login-auth.dto';
import { EntityManager } from 'typeorm';
import { userRepository } from 'src/shared/database/repositoris/user.repository';
import { JwtHelper } from 'src/shared/helper/jwt.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly jh: JwtHelper,
    private readonly em: EntityManager,
  ) {}

  async loginService({ email }: LoginAuthRequestDto) {
    const { em, jh } = this;

    const user = await userRepository(em).getUserByEmail(email);

    if (!user) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Email Address is not exists',
      });
    }

    return jh.generator(user);
  }
}
