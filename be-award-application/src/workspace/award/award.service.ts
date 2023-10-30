import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/shared/database/entities/user.entity';
import { EntityManager } from 'typeorm';
import { AwardFindAllRequestDto } from './dto/award.dto';
import { awardRepository } from 'src/shared/database/repositoris/award.entity';

@Injectable()
export class AwardService {
  constructor(private readonly em: EntityManager) {}

  async findAllAward({ id }: UserEntity, query: AwardFindAllRequestDto) {
    const { em } = this;
    return awardRepository(em).findAllAwardByUserId(id, query);
  }
}
