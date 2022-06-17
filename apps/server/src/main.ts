import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
// import csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');

  app.use(helmet());
  // app.enableCors();
  // app.use(csurf());
  app.setGlobalPrefix('api');
  // swagger option
  const options = new DocumentBuilder()
    .setTitle('nest-blog')
    .setDescription('nest-blog-api')
    .setVersion('1.0')
    .build();
  // ignoreGlobalPrefix 忽略通过 setGlobalPrefix() 设置的路由的全局前缀
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
