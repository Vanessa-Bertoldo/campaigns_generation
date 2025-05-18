import {
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsBoolean,
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
  @IsBoolean()
  indexcluido: boolean = false;

  @IsOptional()
  @IsEnum(CampaignStatus)
  status!: CampaignStatus;

  @IsEnum(CampaignCategory)
  categoria!: CampaignCategory;
}
