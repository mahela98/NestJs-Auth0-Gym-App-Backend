import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from './member/member.module';
import { BlogController } from './blog/blog.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-blog-project', {
      useNewUrlParser: true,
    }),
    MemberModule,
  ],
  controllers: [AppController, BlogController],
  providers: [AppService],
})
export class AppModule {}
