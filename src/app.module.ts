import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from './member/member.module';
import { MembershipTypeModule } from './membership-type/membership-type.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-blog-project', {
      
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    MembershipTypeModule,
    MemberModule,
    AuthzModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
