import {
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { CampaignCategory, CampaignStatus } from '../entities/campanha.entity';
import { IsFutureOrToday } from '../validators/is-future-or-today.validator';
import { IsDateFinalLargerThanDataInicioValidation } from '../validators/is-date-fim-maior-que-inicio.validator';

export class UpdateCampaignDto {
  @IsOptional()
  @IsNotEmpty()
  nome?: string;

  @IsOptional()
  @IsDateString()
  @IsFutureOrToday({ message: 'A data de início deve ser maior ou igual a data atual' })
  dataInicio?: Date;

  @IsOptional()
  @IsDateString()
  @IsDateFinalLargerThanDataInicioValidation({
    message: 'A data final deve ser maior que a data de início',
  })
  dataFim?: Date;

  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;

  @IsOptional()
  @IsEnum(CampaignCategory)
  categoria?: CampaignCategory;
}
