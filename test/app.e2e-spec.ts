import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PARIS_LATITUDE , PARIS_LONGITUDE } from './../src/common/constants';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.useFakeTimers()
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  });

  it('/ (GET) get air-quality with no long and lat and it should return 400 error', () => {
    return request(app.getHttpServer()).get('/air-quality').expect(400);
  });

  it('/ (GET) get air-quality with long and lat and it should return 200 success', () => {
    return request(app.getHttpServer()).get('/air-quality').query({latitude:PARIS_LATITUDE , longitude: PARIS_LONGITUDE }).expect(200);
  });

});
