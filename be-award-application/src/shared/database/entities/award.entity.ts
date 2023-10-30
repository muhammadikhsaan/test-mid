import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { MetaDeleteEntity } from './common.entity';
import { UserEntity } from './user.entity';
import { AwardType, AwardTypeEnum } from 'src/shared/enums/award.enum';

@Entity({
  name: 'award',
})
@Index('search-by-index', ['slug', 'deleted_at'])
@Index('search-by-user-index', ['user', 'deleted_at'])
export class AwardEntity extends MetaDeleteEntity {
  @Column({
    name: 'award_type',
    type: 'enum',
    enum: Object.keys(AwardTypeEnum),
  })
  award_type: AwardType;

  @Column({
    name: 'award_point_exchanges',
    type: 'bigint',
  })
  point_exchanges: number;

  @Column({
    name: 'award_name',
    type: 'varchar',
  })
  award_name: string;

  @Column({
    name: 'award_image',
    type: 'varchar',
  })
  award_image: string;

  @ManyToOne(() => UserEntity, (r) => r.id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
