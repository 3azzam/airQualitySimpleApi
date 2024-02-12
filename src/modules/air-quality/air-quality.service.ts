import { HttpService } from '@nestjs/axios';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { NearestCityQueryDto } from './dto/find-nearest-city.dto';
import { ConfigService } from '@nestjs/config';
import { EnvVariables, ErrorResponse, INearestCityResponse } from '../../common/types';
import { AirQualityApi, DEFAULT_MESSAGE_ERROR } from '../../common/constants';
import { InjectModel } from '@nestjs/mongoose';
import { AirQuality } from './entities/air-quality.entity'
import { Model } from 'mongoose';
import { StoreNearestCityDto } from './dto/store-nearest-city.dto';

@Injectable()
export class AirQualityService {

  constructor(
    private httpService: HttpService, private configService: ConfigService<EnvVariables>,
    @InjectModel(AirQuality.name) private airQualityModel: Model<AirQuality> 
  ) {}

  async addAirQuality(record: StoreNearestCityDto) {
    return this.airQualityModel.create(record);
  }

  async findNearestCity(queryParams: NearestCityQueryDto): Promise<INearestCityResponse>{
    try{
      const {data} = await this.httpService.axiosRef.get(
        `${AirQualityApi.NEAREST_CITY}?lat=${queryParams.latitude}&lon=${queryParams.longitude}&key=${this.configService.get('IqAirApiKey')}`
        );
        return data.data
    }
    catch(e) {
      throw new HttpException(e.response?.statusText || DEFAULT_MESSAGE_ERROR, e.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
