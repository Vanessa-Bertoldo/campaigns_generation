import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Campaign, CampaignStatus } from '../entities/campanha.entity';

@Injectable()
export class CampaignsCronService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async atualizarCampanhasExpiradas() {
    await this.campaignRepository.update(
      {
        dataFim: LessThan(new Date()),
        status: CampaignStatus.ATIVA,
      },
      { status: CampaignStatus.EXPIRADA },
    );

    console.log('[CRON] Campanhas expiradas atualizadas');
  }
}
