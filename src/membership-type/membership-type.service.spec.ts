import { Test, TestingModule } from '@nestjs/testing';
import { MembershipTypeService } from './membership-type.service';

describe('MembershipTypeService', () => {
  let service: MembershipTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembershipTypeService],
    }).compile();

    service = module.get<MembershipTypeService>(MembershipTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
