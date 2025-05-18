import { Test, TestingModule } from "@nestjs/testing";
import { CampaignsController } from "src/modules/campaings/controller/campaigns.controller";
import { CreateCampaignDto } from "src/modules/campaings/dto/create-campaing.dto";
import { FilterCampaignDto } from "src/modules/campaings/dto/filter-campaing.dto";
import { UpdateCampaignDto } from "src/modules/campaings/dto/update-campaign.dto";
import { CampaignCategory, CampaignStatus } from "src/modules/campaings/entities/campanha.entity";
import { CampaignsService } from "src/modules/campaings/service/campaigns.service";

describe('CampaignController', () => {
    let controller: CampaignsController;
    let service: CampaignsService;
   
    const mockService = {
        create: jest.fn().mockResolvedValue({ id: 1, nome: 'Nova Campanha' }),
        findAll: jest.fn().mockResolvedValue([{ id: 1, nome: 'Nova Campanha' }]),
        findOne: jest.fn().mockResolvedValue({ id: 1, nome: 'Nova Campanha' }),
        update: jest.fn().mockResolvedValue({ id: 1, nome: 'Atualizada' }),
        remove: jest.fn().mockResolvedValue(undefined),
        findByFiltersPaginated: jest.fn().mockResolvedValue({
        data: [{ id: 1, nome: 'Campanha Filtro' }],
        total: 1,
        page: 1,
        limit: 10,
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CampaignsController],
            providers: [{provide: CampaignsService, useValue: mockService}],
        }).compile();

        controller = module.get<CampaignsController>(CampaignsController);
        service = module.get<CampaignsService>(CampaignsService);
    })

    it('must create a new campaing', async() => {
        const dto: CreateCampaignDto = { nome: 'Nova Campanha', dataInicio: '2023-01-01', dataFim: '2023-12-31', indexcluido: false, status: CampaignStatus.ATIVA, categoria: CampaignCategory.PROMOCAO };
        expect(await controller.create(dto)).toEqual({ id: 1, nome: 'Nova Campanha' });
    })

    it('must find all campaing', async() => {
        expect(await controller.findAll()).toEqual([{ id: 1, nome: 'Nova Campanha' }]);
    })

    it('must find one campaing', async() => {
        expect(await controller.findOne(1)).toEqual({ id: 1, nome: 'Nova Campanha' });
    })

    it('must update a campaing', async() => {
        await controller.update(1, { nome: 'Atualizada' } as UpdateCampaignDto);
        expect(mockService.update).toHaveBeenCalledWith(1, { nome: 'Atualizada' });
    })

    it('must find campaing with filters', async() => {
        const filters: FilterCampaignDto = { status: CampaignStatus.ATIVA, page: 1, limit: 10 };
        const result = await service.findByFiltersPaginated(filters);
        expect(result.data.length).toBe(1);
        expect(result.page).toBe(1);
    })

    it('must delete a campaign', async() => {
        const result = await controller.remove(1); 
        expect(result).toBeUndefined();
        expect(mockService.remove).toHaveBeenCalledWith(1);
    })
})