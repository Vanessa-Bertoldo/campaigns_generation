import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseHealthService } from './database/database-health.service';
import { CampaignsModule } from './modules/campaings/campaigns.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DatabaseModule,
    CampaignsModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dbHealthService: DatabaseHealthService) {}

  async onModuleInit() {
    const connected = await this.dbHealthService.checkConnection();
    if (!connected) {
      throw new Error('Não foi possível conectar ao banco de dados na inicialização!');
    }
  }
}
