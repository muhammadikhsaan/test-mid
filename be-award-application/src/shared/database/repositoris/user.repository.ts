import { EntityManager } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export const userRepository = (manage: EntityManager) =>
  manage.getRepository(UserEntity).extend({
    getUserByEmail(email: string): Promise<UserEntity> {
      return this.findOne({
        select: ['email', 'full_name', 'slug', 'username'],
        where: { email: email },
      });
    },
  });
