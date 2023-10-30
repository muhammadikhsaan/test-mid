import {
  And,
  EntityManager,
  LessThanOrEqual,
  MoreThanOrEqual,
  In,
} from 'typeorm';
import { AwardEntity } from '../entities/award.entity';

export type findAllAwardByUserIdQuery = {
  min_point?: number;
  max_point?: number;
  type?: string;
  skip?: number;
};

export const awardRepository = (manage: EntityManager) =>
  manage.getRepository(AwardEntity).extend({
    findAllAwardByUserId(
      user_id: number,
      { skip, min_point, max_point, type }: findAllAwardByUserIdQuery,
    ): Array<AwardEntity> {
      const condition = {
        user: { id: user_id },
      };

      if (type) {
        const arrType = type.split(',');
        condition['award_type'] = In(arrType);
      }

      const pointCondition = [];

      if (min_point >= 0) {
        pointCondition.push(MoreThanOrEqual(min_point));
      }

      if (max_point >= 0) {
        pointCondition.push(LessThanOrEqual(max_point));
      }

      if (pointCondition.length > 0) {
        condition['point_exchanges'] = And(...pointCondition);
      }

      return this.find({
        where: condition,
        order: {
          created_at: 'DESC',
        },
        // take: 10,
        skip: skip,
      });
    },
  });
