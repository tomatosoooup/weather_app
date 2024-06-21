import {  useState, useTransition } from "react"
import { WeatherData } from '../typings/weather.type';
import { WeatherDataTable } from '../components/weather/weather-data-table';
import { fetchWeatherData } from "../api/weather/weather";

// I didn't use separate compunents for table or input. It's just a fast example of functionality.

export default function MainPage(){
    const [data, setData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string>("");
    const [city, setCity] = useState<string>('Kiev');

    const [isPending, startTransition] = useTransition()

    const handleFetch = (city: string) => {
        startTransition(() => {
            (async ()=> {
                await fetchWeatherData({city})
                .then((data)=> {
                    setData(data?.data!)
                    setError("")
                })
                .catch(()=> {
                    setError("Something went wrong while fetching data!")
                })
            })();
        })
        
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const handleButtonClick = () => {
        handleFetch(city);
    };

    return (
        <div className='p-4'>
            <div className="mb-4 px-4 flex flex-wrap gap-4 items-center">
            <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded mr-2 flex-1"
                    placeholder="Enter city name"
                    disabled={isPending}
                />
                <button
                    disabled={isPending}
                    onClick={handleButtonClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shrink-0 disabled:opacity-50"
                >
                    Get Weather
                </button>
            </div>

            {error && <div className='text-white px-4'>{error}</div>}
            {data && <WeatherDataTable data={data}/>}
            {!data && !error && <div className='text-white px-4'>Loading...</div>}
        </div>
    );
}

