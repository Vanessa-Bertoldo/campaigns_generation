import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateCampaignDto } from "src/modules/campaings/dto/create-campaing.dto";
import { UpdateCampaignDto } from "src/modules/campaings/dto/update-campaign.dto";
import { Campaign, CampaignCategory, CampaignStatus } from "src/modules/campaings/entities/campanha.entity";
import { CampaignsService } from "src/modules/campaings/service/campaigns.service";
import { Repository } from "typeorm";

describe('CampaignService', () => {
    let service: CampaignsService;
    //let repo: Repository<Campaign>;

    const mockRepo = {
        create: jest.fn().mockReturnValue({}),
        save: jest.fn().mockResolvedValue({ id: 1 }),
        find: jest.fn().mockResolvedValue([{ id: 1 }]),
        findOne: jest.fn().mockResolvedValue({ id: 1 }),
        update: jest.fn().mockResolvedValue({}),
        remove: jest.fn().mockResolvedValue({}),
        createQueryBuilder: jest.fn(() => ({
            andWhere: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getManyAndCount: jest.fn().mockResolvedValue([[{ id: 1 }], 1]),
        })),
    };

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CampaignsService,
                {
                    provide: getRepositoryToken(Campaign),
                    useValue: mockRepo,
                },
            ]
    }).compile();
        service = module.get<CampaignsService>(CampaignsService);
        module.get<Repository<Campaign>>(getRepositoryToken(Campaign));
    });

    it('must create a new compaign', async() => {
        const dto: CreateCampaignDto = { nome: 'Nova Campanha', dataInicio: new Date('2023-01-01'), dataFim: new Date('2023-12-31'), indexcluido: false, status: CampaignStatus.ATIVA, categoria: CampaignCategory.PROMOCAO };
        await service.create(dto);
        expect(mockRepo.create).toHaveBeenCalledWith(dto);
        expect(mockRepo.save).toHaveBeenCalled();
    })

    it('must find all campaing', async() => {
        const result = await service.findAll();
        expect(result).toEqual([{ id: 1 }]);
        expect(mockRepo.find).toHaveBeenCalled();
    })

    it('must find one campaing by id', async() => {
        const result = await service.findOne(1);
        expect(result).toEqual({ id: 1 });
        expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1, indexcluido: false } });
    })

    it('must update a campaing', async() => {
        const dto: UpdateCampaignDto = { nome: 'Atualizada', dataFim: new Date('2023-12-31'), };
        await service.update(1, dto);
        expect(mockRepo.update).toHaveBeenCalledWith(1, dto);
    })

    it('must find campaing with filters', async() => {
        const filters = { status: CampaignStatus.ATIVA, page: 1, limit: 10 };
        const result = await service.findByFiltersPaginated(filters);
        expect(result.data.length).toBe(1);
        expect(result.page).toBe(1);
        expect(mockRepo.createQueryBuilder).toHaveBeenCalled();
    })

    it('must delete a campaign', async() => {
        await service.remove(1);
        expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1, indexcluido: false } });
    })
})