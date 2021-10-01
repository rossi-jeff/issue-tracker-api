import { Test, TestingModule } from '@nestjs/testing';
import { TimeclockController } from './timeclock.controller';

describe('TimeclockController', () => {
  let controller: TimeclockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeclockController],
    }).compile();

    controller = module.get<TimeclockController>(TimeclockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
