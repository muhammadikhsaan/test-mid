import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigModule as CommonConfigModule,
  ConfigService as CommonConfigService,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtHelper } from './helper/jwt.helper';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      global: true,
      imports: [
        CommonConfigModule.forRoot({
          envFilePath: ['.env'],
        }),
        TypeOrmModule.forRootAsync({
          imports: [CommonConfigModule],
          inject: [CommonConfigService],
          useFactory: async (config: CommonConfigService) => ({
            type: 'postgres',
            host: config.get<string>('DATABASES_HOST'),
            port: config.get<number>('DATABASES_PORT'),
            username: config.get<string>('DATABASES_USERNAME'),
            password: config.get<string>('DATABASES_PASSWORD'),
            database: config.get<string>('DATABASES_DATABASE'),
            entities: [
              'dist/shared/database/entities/**/*{.entity.ts,.entity.js}',
            ],
            autoLoadEntities: true,
            keepConnectionAlive: false,
            synchronize: config.get<boolean>('DATABASE_SYNCHRONIZE'),
          }),
        }),
      ],
      providers: [CommonConfigService, JwtHelper, JwtService, JwtStrategy],
      exports: [CommonConfigService, JwtHelper, JwtStrategy],
    };
  }
}
