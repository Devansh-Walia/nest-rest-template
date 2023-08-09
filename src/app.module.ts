import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';

import { applicationConfig } from 'config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppService } from '../src/app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_DIALECT: Joi.string(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string(),
        DB_PASSWORD: Joi.string().allow(''),
        DB_NAME: Joi.string(),
        PORT: Joi.number().default(8080),
        ENV: Joi.string()
          .valid('development', 'base', 'beta', 'qa', 'qa2')
          .default('development'),
      }),
    }),
    SequelizeModule.forRoot({
      dialect: applicationConfig.db.db_dialect as Dialect,
      host: applicationConfig.db.host || 'localhost',
      username: applicationConfig.db.user || 'rajat',
      password: applicationConfig.db.password || '',
      port: parseInt(applicationConfig.db.port, 10) || 5432,
      database: applicationConfig.db.name || 'oasis_db',
      models: [],
    }),
    ThrottlerModule.forRoot({
      ttl: parseInt(applicationConfig.rateLimit.ttl),
      limit: parseInt(applicationConfig.rateLimit.limit),
    }),
    ClientModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
