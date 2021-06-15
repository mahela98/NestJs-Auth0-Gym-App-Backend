import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './schemas/member.schema'; 
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';
    
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
    ], 
  providers: [MemberService],
  controllers: [MemberController],
})

export class MemberModule {}

// export class MemberModule  implements NestModule {

//   //auth0 middleware 
//     configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
//       consumer.apply(AuthenticationMiddleware).forRoutes(
//         { method: RequestMethod.POST, path: '/member/create' },
//         { method: RequestMethod.GET, path: '/member' },
//         { method: RequestMethod.GET, path: '/member/:memberID' },
//         { method: RequestMethod.PUT, path: '/member/edit/:memberID' },
//         { method: RequestMethod.DELETE, path: '/member/delete/:memberID' }
//       )
//     }
// }