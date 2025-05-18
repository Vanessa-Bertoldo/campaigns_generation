import {
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

import { CampaignCategory, CampaignStatus } from '../entities/campanha.entity';
import { IsDateFinalLargerThanDataInicioValidation } from '../validators/is-date-fim-maior-que-inicio.validator';
import { IsFutureOrToday } from '../validators/is-future-or-today.validator';


export class CreateCampaignDto {
  @IsNotEmpty()
  nome!: string;

  @IsDateString()
  @IsFutureOrToday({ message: 'A data de início deve ser maior ou igual a data atual' })
  dataInicio!: Date;

  @IsDateString()
  @IsDateFinalLargerThanDataInicioValidation({
    message: 'A data final deve ser maior que a data de início',
  })
  dataFim!: Date;

  @IsOptional()
  @IsBoolean()
  indexcluido: boolean = false;

  @IsOptional()
  @IsEnum(CampaignStatus)
  status: CampaignStatus = CampaignStatus.ATIVA;
  
  @IsEnum(CampaignCategory)
  categoria!: CampaignCategory;
}
