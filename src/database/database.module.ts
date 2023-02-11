import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseProvider } from './database.provider';
@Module({
  imports: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
