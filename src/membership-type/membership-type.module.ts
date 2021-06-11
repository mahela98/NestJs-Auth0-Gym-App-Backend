import { Module } from '@nestjs/common';
import { MembershipTypeService } from './membership-type.service';

@Module({
  providers: [MembershipTypeService]
})
export class MembershipTypeModule {}
