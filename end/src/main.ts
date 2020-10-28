import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(new LoggerMiddleware().use)
  app.enableCors()
  const options = new DocumentBuilder()
    .setTitle('云盘API文档')
    .setDescription('author:kun')
    .setVersion('1.0')
    .addTag('使用nestjs编写的后端服务')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
