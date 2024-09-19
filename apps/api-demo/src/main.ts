import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

   // Configuración de Swagger
   const config = new DocumentBuilder()
   .setTitle('API de Usuarios')
   .setDescription(
     'Documentación de la API para la gestión de usuarios, roles y permisos',
   )
   .setVersion('1.0')
   .addBearerAuth()
   .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  await app.listen(3000);

}
bootstrap();
