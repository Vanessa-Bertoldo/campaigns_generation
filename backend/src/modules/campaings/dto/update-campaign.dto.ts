import {
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { CampaignCategory, CampaignStatus } from '../entities/campanha.entity';

export class UpdateCampaignDto {
  @IsOptional()
  @IsNotEmpty()
  nome?: string;

  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @IsOptional()
  @IsDateString()
  dataFim?: string;

  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;

  @IsOptional()
  @IsEnum(CampaignCategory)
  categoria?: CampaignCategory;
}
