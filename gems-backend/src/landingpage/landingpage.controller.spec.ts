import { Test, TestingModule } from '@nestjs/testing';
import { LandingpageController } from './landingpage.controller';

describe('LandingpageController', () => {
  let controller: LandingpageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandingpageController],
    }).compile();

    controller = module.get<LandingpageController>(LandingpageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
