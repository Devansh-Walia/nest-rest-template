import { NestFactory } from '@nestjs/core';
import { applicationConfig } from 'config';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4000', 'http://localhost:5000'],
  });
  app.useGlobalPipes(new ValidationPipe());

  app.use(morgan('combined'));
  app.use(
    helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }),
  );

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(cookieParser('my-secret'));

  const res = await app.listen(applicationConfig.app.port, '0.0.0.0');
  const serverAddress = res.address();

  console.log(
    `⚡ Server is listening at http://${serverAddress.address}:${serverAddress.port}`,
  );
  console.log(
    `⚡ Checkout Documentation at http://${serverAddress.address}:${serverAddress.port}/api-docs`,
  );
}
bootstrap();
