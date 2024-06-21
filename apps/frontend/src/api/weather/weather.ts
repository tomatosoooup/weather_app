import { WeatherData } from "@web/src/typings/weather.type"
import { getWeatherData } from "../controllers/get-weather-data"

interface WeatherDataResponse {
    error?: string
    data: WeatherData | null,
    status: number
}

export const fetchWeatherData = async ({ city }: { city: string }): Promise<WeatherDataResponse | null> => {
    const data = await getWeatherData({ city });

    if (!data?.data) {
        return { error: "Data not available", data: null, status: data?.status ?? 500 };
    }

    return { data: data.data, status: data.status, error: "" };
}