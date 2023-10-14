import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { HttpInterceptor } from './interceptors';
import { Swagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  new Swagger(app).initialize();

  app.use(cookieParser());
  app.useGlobalInterceptors(new HttpInterceptor());
  app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
