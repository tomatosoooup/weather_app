import { WeatherData } from "@web/src/typings/weather.type";

export const WeatherDataTable = ({ data }: { data: WeatherData }) => {
  
  const kelvinToCelsius = (kelvin: number) => {
    return (kelvin - 273.15).toFixed(1);
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 text-black">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Attribute</th>
            <th className="px-4 py-2 border">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">City</td>
            <td className="px-4 py-2 border">{data.name}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Longitude</td>
            <td className="px-4 py-2 border">{data.coord.lon}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Latitude</td>
            <td className="px-4 py-2 border">{data.coord.lat}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Weather</td>
            <td className="px-4 py-2 border">{data.weather[0].main} ({data.weather[0].description})</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Temperature</td>
            <td className="px-4 py-2 border">{kelvinToCelsius(data.main.temp)} °C</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Feels Like</td>
            <td className="px-4 py-2 border">{kelvinToCelsius(data.main.feels_like)} °C</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Min Temperature</td>
            <td className="px-4 py-2 border">{kelvinToCelsius(data.main.temp_min)} °C</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Max Temperature</td>
            <td className="px-4 py-2 border">{kelvinToCelsius(data.main.temp_max)} °C</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Pressure</td>
            <td className="px-4 py-2 border">{data.main.pressure} hPa</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Humidity</td>
            <td className="px-4 py-2 border">{data.main.humidity} %</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Visibility</td>
            <td className="px-4 py-2 border">{data.visibility} m</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Wind Speed</td>
            <td className="px-4 py-2 border">{data.wind.speed} m/s</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Wind Direction</td>
            <td className="px-4 py-2 border">{data.wind.deg} °</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Cloudiness</td>
            <td className="px-4 py-2 border">{data.clouds.all} %</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Sunrise</td>
            <td className="px-4 py-2 border">{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Sunset</td>
            <td className="px-4 py-2 border">{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Country</td>
            <td className="px-4 py-2 border">{data.sys.country}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
