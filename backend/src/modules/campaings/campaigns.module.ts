import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsService } from './service/campaigns.service';
import { CampaignsController } from './controller/campaigns.controller';
import { Campaign } from './entities/campanha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  providers: [CampaignsService],
  controllers: [CampaignsController],
})
export class CampaignsModule {}
