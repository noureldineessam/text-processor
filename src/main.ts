import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('TEXT PROCESSOR APIs')
    .setDescription('APIs for processing text data and user management')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Convert incoming payload to DTO instance
    whitelist: true, // Strip non-whitelisted properties
    forbidNonWhitelisted: true, // Reject requests containing properties not defined in the DTO
  }));

  app.enableCors(); // Enable CORS with the specified options


  await app.listen(3000);
}
bootstrap();
