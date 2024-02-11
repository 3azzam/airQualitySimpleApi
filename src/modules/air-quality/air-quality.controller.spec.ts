import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { AirQuality } from './entities/air-quality.entity';
import { Model } from 'mongoose';

describe('AirQualityController', () => {
  let controller: AirQualityController;

  let httpMock = {
    axiosRef : {
      get: (uri) => { data: {message: uri} }
    }
  };

  let configServiceMock = {
    get: (item) => item
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirQualityController],
      providers: [
        AirQualityService,
        { provide : HttpService,useValue: httpMock },
        { provide: ConfigService, useValue: configServiceMock },
        { provide: getModelToken(AirQuality.name) , useValue: Model }
      ],
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
