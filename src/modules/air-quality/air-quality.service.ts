import { HttpService } from '@nestjs/axios';
import { Injectable, HttpStatus } from '@nestjs/common';
import { NearestCityQueryDto } from './dto/find-nearest-city.dto';
import { ConfigService } from '@nestjs/config';
import { EnvVariables, ErrorResponse, INearestCityResponse } from '../../common/types';
import { AirQualityApi, DEFAULT_MESSAGE_ERROR } from '../../common/constants';
import { InjectModel } from '@nestjs/mongoose';
import { AirQuality } from './entities/air-quality.entity'
import { Model } from 'mongoose';

@Injectable()
export class AirQualityService {

  constructor(
    private httpService: HttpService, private configService: ConfigService<EnvVariables>,
    @InjectModel(AirQuality.name) private airQualityModel: Model<AirQuality> 
  ) {}


  async getCities() {
    return this.airQualityModel.find();
  }

  async addAirQuality(record) {
    const createdRecord = await this.airQualityModel.create(record);
    return createdRecord;
  }

  async findNearestCity(queryParams: NearestCityQueryDto): Promise<INearestCityResponse | ErrorResponse>{
    try{
      const {data} = await this.httpService.axiosRef.get(
        `${AirQualityApi.NEAREST_CITY}?lat=${queryParams.latitude}&lon=${queryParams.longitude}&key=${this.configService.get('IqAirApiKey')}`
        );
        return {pollution: data.data.current?.pollution};
    }
    catch(e) {

      console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log(e);

      return {
        code: e.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.response?.statusText || DEFAULT_MESSAGE_ERROR
      }
    }
  }
}
