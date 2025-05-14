import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseHealthService {

  constructor(private dataSource: DataSource) {}

  async checkConnection(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1'); 
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
      return true;
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      return false;
    }
  }
}
