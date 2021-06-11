import { Module } from '@nestjs/common';
import { MembershipTypeService } from './membership-type.service';
import { MembershipTypeController } from './membership-type.controller';
import { MongooseModule } from '@nestjs/mongoose'; 
import { MembershipTypeSchema } from './schemas/membershipType.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'MembershipType', schema: MembershipTypeSchema }]),
],
  providers: [MembershipTypeService],
  controllers: [MembershipTypeController]
})
export class MembershipTypeModule {}
