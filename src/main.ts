import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  helmet from 'helmet';
import * as enforce from 'express-sslify';
import * as cors from 'cors'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   
     // Enable helmet middleware for security headers
  app.use(helmet({
    contentSecurityPolicy: false,
  }));

  app.use(cors());

  const config = new DocumentBuilder()
  .setTitle('Tsogolo api')
  .setDescription('Tsogolo Api used to scrawl jobs and add personality questiions and users')
  .setVersion('1.0')
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
  }
  await app.listen(port);
}
bootstrap();
