import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MembershipTypeService } from './membership-type.service';
import { MembershipTypeController } from './membership-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MembershipTypeSchema } from './schemas/membershipType.schema';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MembershipType', schema: MembershipTypeSchema },
    ]),
  ],
  providers: [MembershipTypeService],
  controllers: [MembershipTypeController],
})
export class MembershipTypeModule {}

// export class MembershipTypeModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
//     consumer
//       .apply(AuthenticationMiddleware)
//       .forRoutes(
//         { method: RequestMethod.POST, path: '/membershiptype/create' },
//         { method: RequestMethod.GET, path: '/membershiptypes' },
//         { method: RequestMethod.GET, path: '/membershiptype/:MambershipTypeID' },
//         { method: RequestMethod.PUT, path: '/membershiptype/edit/:MambershipTypeID' },
//         { method: RequestMethod.DELETE, path: '{/membershiptype/delete/:MambershipTypeID' },
//       );
//   }
// }
