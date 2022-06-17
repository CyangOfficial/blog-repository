import { HttpException, Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
// import { PostsController } from './posts/posts.controller';
// import { PostsService } from './posts/posts.service';
// import { ConfigMod as ConfigModule } from './config/config.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import configuration from './config/configuration'
import { configuration, database, alioss } from './config/index';

import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { TransformInterceptor } from './shared/interceptor/transform.interceptor';
import { ValidationPipe } from './shared/pipes/validation.pipe';
// import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { UploaderModule } from './uploader/uploader.module';
import { PlayerModule } from './player/player.module';
const businessModules = [
  PostsModule,
  AuthModule,
  UsersModule,
  JwtModule,
  UploaderModule,
  PlayerModule,
];

const libModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    envFilePath: '.development.env',
    load: [configuration, database, alioss],
    //忽略配置文件，为true则仅读取操作系统环境变量，常用于生产环境
    ignoreEnvFile: false,
    validationSchema: Joi.object({
      HOST: Joi.string().default('localhost'),
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
    }),
  }),
  MongooseModule.forRootAsync({
    useFactory: async (Config: ConfigService) => ({
      uri: Config.get<string>('mongoUrl'),
      // useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    }),
    inject: [ConfigService],
  }),
];

@Module({
  imports: [...libModules, ...businessModules],
  controllers: [],
  // controllers: [PostsController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
