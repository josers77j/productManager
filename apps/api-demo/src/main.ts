import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = +process.env.PORT || 3001;

  app.enableCors();

  const globalPrefix = 'api/v1';

  app.setGlobalPrefix(globalPrefix);
  
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
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
 
await app.listen(port , () => {
  Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
});

}
bootstrap();
