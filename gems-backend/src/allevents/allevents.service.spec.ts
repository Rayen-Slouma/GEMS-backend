import { Test, TestingModule } from '@nestjs/testing';
import { AlleventsService } from './allevents.service';

describe('AlleventsService', () => {
  let service: AlleventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlleventsService],
    }).compile();

    service = module.get<AlleventsService>(AlleventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
