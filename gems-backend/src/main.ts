import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import NestExpressApplication

config();

async function bootstrap() {
  // Type cast the application to NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the assets/uploads directory
  app.useStaticAssets(join(__dirname, '..', 'assets/uploads'), {
    prefix: '/assets/uploads', // Static file path prefix
  });

  // Serve other assets if needed
  app.useStaticAssets(join(__dirname, '..', 'assets'));

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // Configure Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for Gems backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  // Start the server on the specified port or default to 3000
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
