import { Controller, Get, Query } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { NearestCityQueryDto } from './dto/find-nearest-city.dto';

@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get('/find')
  findOne() {
    return this.airQualityService.getCities();
  }

  @Get()
  findAll(@Query() queryParams: NearestCityQueryDto) {
    return this.airQualityService.findNearestCity(queryParams);
  }
}
