import { Test, TestingModule } from '@nestjs/testing';
import { LandingpageService } from './landingpage.service';

describe('LandingpageService', () => {
  let service: LandingpageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LandingpageService],
    }).compile();

    service = module.get<LandingpageService>(LandingpageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
