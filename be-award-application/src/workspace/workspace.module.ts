import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AwardModule } from './award/award.module';
import { IoModule } from './io/io.module';

@Module({
  imports: [AuthModule, AwardModule, IoModule],
  controllers: [],
  providers: [],
})
export class WorkspaceModule {}
