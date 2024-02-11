import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityService } from './air-quality.service';
import { AirQuality } from './entities/air-quality.entity'
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NearestCityQueryDto } from './dto/find-nearest-city.dto';

describe('AirQualityService', () => {
  let service: AirQualityService;
  
  let httpMock = {
    axiosRef : {
      get: (uri: string) => {
        return {
          data: {
            data: {
              current: {
                pollution : {long: 5 , lat: 10}
              }
            }
          }
        }
      }    
    }
  };

  let configServiceMock = {
    get: (item) => item
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirQualityService,
        { provide : HttpService,useValue: httpMock },
        { provide: ConfigService, useValue: configServiceMock },
        { provide: getModelToken(AirQuality.name) , useValue: Model }
      ],
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find findNearestCity', async () => {
    let queryParams: NearestCityQueryDto  = {latitude: 23.233555 , longitude: 45.244554}
    const response:any = await service.findNearestCity(queryParams);
    expect(response.pollution).toMatchObject({long: 5 , lat: 10})
  })

});
