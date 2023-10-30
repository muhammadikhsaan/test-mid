import { Column, Entity, Index, OneToMany } from 'typeorm';
import { MetaDeleteEntity } from './common.entity';
import { AwardEntity } from './award.entity';

@Entity({
  name: 'users',
})
@Index('user-login-index', ['email', 'deleted_at'])
export class UserEntity extends MetaDeleteEntity {
  @Column({
    name: 'username',
    type: 'varchar',
  })
  username?: string;

  @Column({
    name: 'full_name',
    type: 'varchar',
  })
  full_name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
  })
  email: string;

  @OneToMany(() => AwardEntity, (r) => r.user)
  award?: AwardEntity[];
}
