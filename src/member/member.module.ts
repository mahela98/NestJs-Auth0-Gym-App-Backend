import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { MemberSchema } from './schemas/member.schema'; // and this
    
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Post', schema: MemberSchema }]),
    ], // add 
  providers: [MemberService],
  controllers: [MemberController],
})
export class MemberModule {}