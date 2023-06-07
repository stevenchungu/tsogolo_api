import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { proxyMiddleware } from 'proxy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(proxyMiddleware)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
