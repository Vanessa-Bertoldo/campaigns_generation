import {
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';

import { CampaignCategory, CampaignStatus } from '../entities/campanha.entity';

export class CreateCampaignDto {
  @IsNotEmpty()
  nome!: string;

  @IsDateString()
  dataInicio!: string;

  @IsDateString()
  dataFim!: string;

  @IsOptional()
  @IsEnum(CampaignStatus)
  status!: CampaignStatus;

  @IsEnum(CampaignCategory)
  categoria!: CampaignCategory;
}
