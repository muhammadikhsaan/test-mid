import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WorkspaceModule } from './workspace/workspace.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule.forRoot(), WorkspaceModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
