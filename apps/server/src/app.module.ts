import { Module } from '@nestjs/common';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), WeatherModule, ReportsModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class AppModule {}
