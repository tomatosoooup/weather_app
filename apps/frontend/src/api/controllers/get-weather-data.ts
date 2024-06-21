import axios, { AxiosResponse } from "axios";
import { WeatherData } from "@web/src/typings/weather.type";

export const getWeatherData = async({city}: {city: string}): Promise<AxiosResponse<WeatherData> | null>=>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND}/weather?city=${city}`);
        return res
        
    } catch (error) {
        console.error('ERROR_FETCHING_DATA', error);
        return null
    }
}