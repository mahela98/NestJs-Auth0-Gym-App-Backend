import { Test, TestingModule } from '@nestjs/testing';
import { MembershipTypeController } from './membership-type.controller';

describe('MembershipTypeController', () => {
  let controller: MembershipTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembershipTypeController],
    }).compile();

    controller = module.get<MembershipTypeController>(MembershipTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
