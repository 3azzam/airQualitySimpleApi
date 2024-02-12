import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AirQualityModule } from '../../modules/air-quality/air-quality.module'

@Module({
  imports: [AirQualityModule],
  providers: [TasksService]
})
export class TasksModule {}
