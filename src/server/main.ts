import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT_NUMBER } from './common/config';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  await server.listen(PORT_NUMBER);
}

bootstrap();
