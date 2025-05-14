import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseHealthService } from './database-health.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ng@mastermaq2010',
      database: 'campanha',
      entities: [],
      synchronize: true,
    }),
  ],
  providers: [DatabaseHealthService],
  exports: [DatabaseHealthService],
})
export class DatabaseModule {}
