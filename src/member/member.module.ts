import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { MembershipTypeService } from '../membership-type/membership-type.service';
import { MemberController } from './member.controller';
import { MembershipTypeController } from '../membership-type/membership-type.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './schemas/member.schema';
import { MembershipTypeSchema } from '../membership-type/schemas/membershipType.schema';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Member', schema: MemberSchema },
      { name: 'MembershipType', schema: MembershipTypeSchema },
    ]),
  ],
  providers: [MemberService, MembershipTypeService],
  controllers: [MemberController, MembershipTypeController],
})
// export class MemberModule {}  //comment 

//----- uncomment following to add AUTH0 validation

export class MemberModule  implements NestModule {

  //auth0 middleware
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
      consumer.apply(AuthenticationMiddleware).forRoutes(
        { method: RequestMethod.POST, path: '/member/create' },
        { method: RequestMethod.GET, path: '/member' },
        { method: RequestMethod.GET, path: '/member/:memberID' },
        { method: RequestMethod.PUT, path: '/member/edit/:memberID' },
        { method: RequestMethod.DELETE, path: '/member/delete/:memberID' }
      )
    }
}
