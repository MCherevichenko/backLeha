import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: false});
  app.enableCors({ allowedHeaders: ['Content-Type']});
  
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  )
  
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
