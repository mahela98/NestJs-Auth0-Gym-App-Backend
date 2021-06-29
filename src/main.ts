import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); //allow another domain to request resources.
  app.useGlobalPipes(
    new ValidationPipe(
      
      { //disabling all informative messages
        // disableErrorMessages: true, 
        
      },
    ),
  );
  await app.listen(5000);
}
bootstrap();
