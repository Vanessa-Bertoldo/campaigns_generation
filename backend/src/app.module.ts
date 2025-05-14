import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseHealthService } from './database/database-health.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dbHealthService: DatabaseHealthService) {}

  async onModuleInit() {
    const connected = await this.dbHealthService.checkConnection();
    if (!connected) {
      // opcional: lançar erro para parar a aplicação
      throw new Error('Não foi possível conectar ao banco de dados na inicialização!');
    }
  }
}
