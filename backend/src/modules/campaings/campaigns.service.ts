import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CreateCampaignDto } from './dto/create-campaing.dto';
import { Campaign } from './entities/campanha.entity';
import { FilterCampaignDto } from './dto/filter-campaing.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async create(createDto: CreateCampaignDto): Promise<Campaign> {
    const campaign = this.campaignRepository.create(createDto);
    return await this.campaignRepository.save(campaign);
  }

  async findAll(): Promise<Campaign[]> {
    return await this.campaignRepository.find({
        where: { indexcluido: false },
    });
  }

  async findOne(id: number): Promise<Campaign> {
      const campaign = await this.campaignRepository.findOne({
          where: { id, indexcluido: false },
      });
      if (!campaign) {
          throw new NotFoundException(`Campanha não encontrada`);
      }
      return campaign;
  }

  async findByFiltersPaginated(filters: FilterCampaignDto): Promise<{
    data: Campaign[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { nome, dataInicio, dataFim, page = 1, limit = 10 } = filters;

    const query = this.campaignRepository.createQueryBuilder('campaign');

    if (nome) {
      query.andWhere('campaign.nome ILIKE :nome', { nome: `%${nome}%` });
    }

    if (dataInicio) {
      query.andWhere('campaign.dataInicio >= :dataInicio', { dataInicio });
    }

    if (dataFim) {
      query.andWhere('campaign.dataFim <= :dataFim', { dataFim });
    }

    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return { data, total, page, limit };
  }


  async update(id: number, updateDto: UpdateCampaignDto): Promise<Campaign> {
    const campaign = await this.findOne(id);
    Object.assign(campaign, updateDto);
    return this.campaignRepository.save(campaign);
  }

  async remove(id: number): Promise<void> {
    await this.campaignRepository.update(id, { indexcluido: true });
    }
}
