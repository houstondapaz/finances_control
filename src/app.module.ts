import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './database/database.module';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
        RUN_MIGRATIONS: Joi.bool().default(true).optional(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_SECONDS: Joi.number().positive().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_SECONDS: Joi.number().positive().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_SECRET: Joi.string().required(),
        HOST: Joi.string().default('http://localhost:3000'),
      }),
    }),
    DatabaseModule,
    AuthModule,
    TransactionsModule,
    UsersModule,
    CategoryModule,
  ],
  providers: [AppService],
})
export class AppModule {}