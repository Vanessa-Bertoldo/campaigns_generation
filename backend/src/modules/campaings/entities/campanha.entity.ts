import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum CampaignStatus {
  ATIVA = 'ativa',
  PAUSADA = 'pausada',
  EXPIRADA = 'expirada',
}

export enum CampaignCategory {
  MARKETING = 'marketing',
  VENDAS = 'vendas',
  PROMOCAO = 'promocao',
}

@Entity('campanhas')
export class Campaign {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  nome!: string;

  @CreateDateColumn({ 
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP' 
  })
  dataCadastro!: Date;

  @Column({ type: 'timestamp' })
  dataInicio!: Date;

  @Column({ type: 'timestamp' })
  dataFim!: Date;

  @Column({ default: false })
  indexcluido!: boolean;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.ATIVA,
  })
  status!: CampaignStatus;

  @Column({
    type: 'enum',
    enum: CampaignCategory,
  })
  categoria!: CampaignCategory;
}
