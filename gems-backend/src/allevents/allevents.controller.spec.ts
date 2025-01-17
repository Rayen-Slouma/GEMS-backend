import { Test, TestingModule } from '@nestjs/testing';
import { AlleventsController } from './allevents.controller';

describe('AlleventsController', () => {
  let controller: AlleventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlleventsController],
    }).compile();

    controller = module.get<AlleventsController>(AlleventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
