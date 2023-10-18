import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { HttpInterceptor, UserSessionInterceptor } from './interceptors';
import { Swagger } from './swagger';
import { UsersService } from './users';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalInterceptors(new HttpInterceptor());
  app.useGlobalInterceptors(new UserSessionInterceptor(app.get(UsersService)));

  app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });

  new Swagger(app).initialize();

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
