import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

function getServerPort(app: INestApplication) {
  const configService = app.get(EnvService);
  return configService.get('PORT');
}

function registerGlobalFilters(app: INestApplication) {
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
}

function setupCors(app: INestApplication) {
  app.enableCors();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupCors(app);
  registerGlobalFilters(app);
  const port = getServerPort(app);

  await app.listen(port);
}
bootstrap();
