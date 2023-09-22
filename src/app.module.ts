import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {config} from "./config/config"

import {MongooseModule} from "@nestjs/mongoose"
import { cityModule } from './modules/cities/cities.module';
import { usersModule } from './modules/users/users.module';
import { websiteModule } from './modules/websites/websites.module';
@Module({
  imports: [MongooseModule.forRoot(config.mongo_url),
  cityModule,
  usersModule,
  websiteModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}