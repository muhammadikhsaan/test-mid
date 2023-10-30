import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { COOKIE_KEY } from './shared/constant/key.constant';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './shared/exception/http.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swagger = new DocumentBuilder()
    .setTitle('Awards Api Documentation')
    .setDescription('Api documentation for Award API')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.setGlobalPrefix('/api/v1', {
    exclude: ['health'],
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser(COOKIE_KEY));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(process.env?.APPLICATION_PORT || 3030);
}

bootstrap();
