import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './modules/auth/auth.module';
import ORMOptionsProvider from 'src/configs/mikro-orm.config';
import { ContentModule } from './modules/content/content.module';
import { SystemsModule } from './modules/systems/systems.module';
import { AdminsModule } from './modules/admins/admins.module';
import { UsersModule } from './modules/users/users.module';
import * as Joi from 'joi';

@Module({
  imports: [
    MikroOrmModule.forRoot(ORMOptionsProvider),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod'),
        PASSWORD: Joi.string().required(),
        LOGIN: Joi.string().required(),
        SECRET: Joi.string().required(),
        PORT: Joi.number().default(3000),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_URL: Joi.string().required(),
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        quietReqLogger: true,
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
        level: 'info',
      },
    }),
    AuthModule,
    ContentModule,
    SystemsModule,
    AdminsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
