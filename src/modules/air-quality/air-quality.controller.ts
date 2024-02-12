import { Controller, Get, Query } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { NearestCityQueryDto } from './dto/find-nearest-city.dto';
import { getAirQualityNearestCityMapper } from '../../common/mappers/airQualityMappers';
import { INearestCityResponse } from '../../common/types';

@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}
  
  @Get()
  async getNearestCity(@Query() queryParams: NearestCityQueryDto) {
    const response: INearestCityResponse = await this.airQualityService.findNearestCity(queryParams);
    return getAirQualityNearestCityMapper(response as INearestCityResponse);
  }
}
