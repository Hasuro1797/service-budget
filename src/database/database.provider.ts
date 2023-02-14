/* eslint-disable prettier/prettier */
import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config/dist';
import { Environment } from 'src/common/enum';
import { DataSourceOptions } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Operation } from 'src/modules/operations/entities';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevelopmentEnv = config.get('NODE_ENV') !== Environment.Production;

    const dbConfig = {
      type: 'mysql',
      host: config.get('DB_HOST'),
      port: +config.get('DB_PORT'),
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      synchronize: isDevelopmentEnv,
      entities:[User, Operation],
      autoLoadEntities: true,
    } as DataSourceOptions;
    return dbConfig;
  },
});
