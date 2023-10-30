import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { JwtHelper } from '../helper/jwt.helper';
import { COOKIE_KEY } from '../constant/key.constant';
import { EntityManager } from 'typeorm';
import { userRepository } from '../database/repositoris/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly jh: JwtHelper,
    private readonly em: EntityManager,
  ) {
    super();
  }

  async authenticate(req: Request) {
    const { jh, em } = this;

    try {
      const cookie = req.cookies?.[COOKIE_KEY];
      const authorization: string = req.headers.authorization;

      if (cookie === undefined && authorization === undefined) {
        return this.fail(HttpStatus.UNAUTHORIZED);
      }

      const token =
        cookie !== undefined ? cookie : authorization.replace('Bearer ', '');

      const payload = jh.verify(token);

      const user = await userRepository(em).findOne({
        where: [{ slug: payload.slug }],
      });

      this.success(user);
    } catch (error) {
      this.fail(HttpStatus.UNAUTHORIZED);
    }
  }
}
