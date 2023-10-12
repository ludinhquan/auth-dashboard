import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpInterceptor } from './interceptors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalInterceptors(new HttpInterceptor());

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
