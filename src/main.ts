import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = process.env.PORT || 4000; // 3000 conflicts with React

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Issue Tracker API')
    .setDescription('built by Jeff Rossi')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  console.log(`server port: ${PORT}`);

  await app.listen(PORT);
}
bootstrap();
