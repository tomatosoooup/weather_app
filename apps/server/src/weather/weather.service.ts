import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReportsService } from 'src/reports/reports.service';
import { WeatherData } from './typings/weather.type';

@Injectable()
export class WeatherService {
    private readonly apiKey: string;

    constructor(private readonly configService: ConfigService, private readonly reportsService: ReportsService){
        this.apiKey = this.configService.get<string>('WEATHER_API_KEY') as string;
    }

    async getLonAndLatByCity(city: string): Promise<{lon: number, lat: number}>{
  const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
    params: {
      q: city,
      appid: this.apiKey,
    },
  });



  if (res.data.length === 0) {
    throw new Error(`No location data found for city: ${city}`);
  }

  const { lat, lon } = res.data[0];
  return { lat, lon };
}
    
    
    async getWeather(city: string): Promise<WeatherData>{
        const { lon, lat } = await this.getLonAndLatByCity(city);

      const currentTime = Math.floor(Date.now() / 1000);

      const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { lon, lat, dt: currentTime, appid: this.apiKey },
      });

      const data = res.data as WeatherData

      const report = {
        name: city,
        weather: data.weather[0].main,
        temp: kelvinToCelsius(data.main.temp),
        feels_like: kelvinToCelsius(data.main.feels_like),
        max_temp: kelvinToCelsius(data.main.temp_max),
        min_temp: kelvinToCelsius(data.main.temp_min),
      }

      await this.reportsService.createReport({...report})

      return res.data;
    }
}

function kelvinToCelsius(kelvin: number): number {
  return +(kelvin - 273.15).toFixed(1);
}


