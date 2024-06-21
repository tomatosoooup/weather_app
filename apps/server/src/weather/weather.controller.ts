import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService){}

    @Get()
    async getData(@Query('city') city: string): Promise<object>{
        const res = await this.weatherService.getWeather(city)
        return res
    }
}
