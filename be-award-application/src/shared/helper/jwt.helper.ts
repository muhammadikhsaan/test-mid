import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Algorithm } from 'jsonwebtoken';
import { UserEntity } from '../database/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Injectable()
export class JwtHelper {
  constructor(
    private readonly js: JwtService,
    private readonly cs: ConfigService,
  ) {}

  generator(user: UserEntity) {
    const { cs, js } = this;

    const expired = cs.get<string>('JWT_ACCESS_TOKEN_EXPIRATION');
    const expiredDate = new Date(new Date().getTime() + ms(String(expired)));

    const access_token = js.sign(
      {
        slug: user.slug,
        name: user.full_name,
      },
      {
        secret: cs.get<string>('JWT_SECRET_KEY'),
        algorithm: cs.get<Algorithm>('JWT_ALGORITHM'),
        expiresIn: expired,
      },
    );

    return {
      token: access_token,
      expired: expiredDate,
    };
  }

  verify(token: string): UserEntity {
    const { cs, js } = this;

    return js.verify<UserEntity>(token, {
      secret: cs.get<string>('JWT_SECRET_KEY'),
    });
  }
}
