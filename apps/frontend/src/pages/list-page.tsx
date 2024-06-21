import { useState, useEffect, useTransition } from "react";
import { useDebounce } from "use-debounce";
import { Report } from "../typings/report.type";
import { fetchReportsData } from "../api/report/report";
import { useSearchParams } from "react-router-dom";

// I didn't use separate compunents for table or input. It's just a fast example of functionality.

export default function ListPage() {
  const [data, setData] = useState<Report[]>([]);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 500); 
  const [isPending, startTransition] = useTransition();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setQuery(initialQuery);
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ query: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  useEffect(() => {
    startTransition(() => {
      const fetchData = async () => {
        try {
          const res = await fetchReportsData({ query: debouncedQuery });
          if (res?.data) {
            setData(res.data as Report[]);
          } else {
            setError(res?.error || "Unknown error");
          }
        } catch (error) {
          setError("Something went wrong while fetching data!");
        }
      };

      fetchData();
    });
  }, [debouncedQuery]);

  return (
    <div className="p-4">
      {error && <p className="text-red-500">{error}</p>}
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {isPending ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-black">
            <thead>
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">City</th>
                <th className="px-4 py-2 border">Temperature (°C)</th>
                <th className="px-4 py-2 border">Feels Like (°C)</th>
                <th className="px-4 py-2 border">Max Temperature (°C)</th>
                <th className="px-4 py-2 border">Min Temperature (°C)</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border animate-pulse bg-gray-300"></td>
                  <td className="px-4 py-2 border animate-pulse bg-gray-300"></td>
                  <td className="px-4 py-2 border animate-pulse bg-gray-300"></td>
                  <td className="px-4 py-2 border animate-pulse bg-gray-300"></td>
                  <td className="px-4 py-2 border animate-pulse bg-gray-300"></td>
                  <td className="px-4 py-2 border animate-pulse bg-gray-300"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-black">
            <thead>
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">City</th>
                <th className="px-4 py-2 border">Temperature (°C)</th>
                <th className="px-4 py-2 border">Feels Like (°C)</th>
                <th className="px-4 py-2 border">Max Temperature (°C)</th>
                <th className="px-4 py-2 border">Min Temperature (°C)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((report, index) => (
                <tr key={report.id}>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{report.name}</td>
                  <td className="px-4 py-2 border">{report.temp}</td>
                  <td className="px-4 py-2 border">{report.feels_like}</td>
                  <td className="px-4 py-2 border">{report.max_temp}</td>
                  <td className="px-4 py-2 border">{report.min_temp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
