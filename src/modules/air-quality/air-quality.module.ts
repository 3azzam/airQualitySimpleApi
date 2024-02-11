import { Module } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/common/types';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQuality, AirQualitySchema } from './entities/air-quality.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: AirQuality.name, schema: AirQualitySchema }
    ]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<EnvVariables>) => ({
        baseURL: configService.get('IqAirBaseURL')
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AirQualityController],
  providers: [AirQualityService],
  exports: [AirQualityService]
})
export class AirQualityModule {}
