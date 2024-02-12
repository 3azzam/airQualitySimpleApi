import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AirQualityService } from '../air-quality/air-quality.service';
import { PARIS_LATITUDE, PARIS_LONGITUDE } from '../../common/constants';
import { ErrorResponse, INearestCityResponse } from '../../common/types';

@Injectable()
export class TasksService {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleParisAirQualityCron() {
    console.log('running cron job');

    const data: INearestCityResponse | ErrorResponse = await this.airQualityService.findNearestCity({
      latitude: PARIS_LATITUDE,
      longitude: PARIS_LONGITUDE,
    });

    this.airQualityService.addAirQuality({
      country: data.country,
      city: data.city,
      pollution: data.current.pollution
    });
  }
}
