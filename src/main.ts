import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { generate } from './lib/generator/data.generator';
import { UserService } from './app/user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const changesStream = app.get<UserService>(UserService);

  changesStream.listenChanges();

  await app.listen(3001);
}
bootstrap();
