import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { ReportsModule } from 'src/reports/reports.module';
import { ReportsService } from 'src/reports/reports.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [ReportsModule],
  controllers: [WeatherController],
  providers: [WeatherService, ReportsService, PrismaService]
})
export class WeatherModule {}
