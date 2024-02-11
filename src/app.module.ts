import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AirQualityModule } from './modules/air-quality/air-quality.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvVariables } from './common/types';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService<EnvVariables>) => ({
        uri: `mongodb://${config.get('dbHost')}:${config.get('dbPort')}/${config.get('dbName')}`
      })
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    AirQualityModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
