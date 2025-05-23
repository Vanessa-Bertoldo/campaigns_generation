import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe
} from '@nestjs/common';
import { CampaignsService } from '../service/campaigns.service';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';
import { CreateCampaignDto } from '../dto/create-campaing.dto';
import { FilterCampaignDto } from '../dto/filter-campaing.dto';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  async create(@Body() createDto: CreateCampaignDto) {
    return this.campaignsService.create(createDto);
  }

  @Get()
  async findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.campaignsService.findOne(id);
  }

  @Post('buscar')
  async buscarComFiltroPaginado(@Body() filters: FilterCampaignDto) {
    return this.campaignsService.findByFiltersPaginated(filters);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateCampaignDto) {
    return this.campaignsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.campaignsService.remove(id);
  }
}
