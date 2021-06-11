import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from './member/member.module';


@Module({
  imports: [
    MemberModule,
    MongooseModule.forRoot('mongodb://localhost/nest-blog-project', {
      useNewUrlParser: true,
    }),
    
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
