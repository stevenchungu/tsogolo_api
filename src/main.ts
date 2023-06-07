import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  helmet from 'helmet';
import * as enforce from 'express-sslify';
import * as cors from 'cors'


const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   
     // Enable helmet middleware for security headers
  app.use(helmet({
    contentSecurityPolicy: false,
  }));

  app.use(cors());

  if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
  }
  await app.listen(port);
}
bootstrap();
