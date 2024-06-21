import { Report } from "@web/src/typings/report.type";
import axios, { AxiosResponse } from "axios";

export const getReportsData = async({query}: {query?: string}): Promise<AxiosResponse<Report[]> | null | undefined>=>{
    try {
        if(!query){
            const res = await axios.get(`${import.meta.env.VITE_BACKEND}/reports/all`);
            return res
        }
        
        const res = await axios.get(`${import.meta.env.VITE_BACKEND}/reports/search?query=${query}`);
        return res
        
    } catch (error) {
        console.error('ERROR_FETCHING_DATA', error);
        return undefined
    }
}