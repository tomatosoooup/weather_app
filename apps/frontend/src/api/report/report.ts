import { Report } from "@web/src/typings/report.type";
import { getReportsData } from "../controllers/get-reports";

interface ReportDataResponse {
  error?: string;
  data: Report[] | null;
  status: number;
}

export const fetchReportsData = async ({ query }: { query?: string }): Promise<ReportDataResponse | null> => {
  const data = await getReportsData({ query });

  if (!data?.data) {
    return { error: "Data not available", data: null, status: data?.status ?? 500 };
  }

  return { data: data.data, status: data.status, error: "" };
};
