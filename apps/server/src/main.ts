import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))


  const config = new DocumentBuilder().setTitle('Weather API').setDescription("Description for API routes").setVersion('1.0').addTag('weather').build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('app', app, document)
  
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
