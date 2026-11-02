import { useState, useCallback } from 'react';
import getUserReportAPI from '../../../api/Report/GetUserReportAPI';

interface reportData {
    TotalReportCount: number,
    ReportLimit: number,
    AllReportTitles: string[],
    AllReports: {
      title: string;
      createdAt: string;
      // fields: fieldsType[];
      // timewindow: timewindowType;
    }[]
  }

interface UseGetUserReportReturn {
  getUserReport: () => Promise<void>;
  loading: boolean;
  error: string | null;
  data: reportData | null;
}

export const useGetUserReport = (): UseGetUserReportReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<reportData | null>(null);

  const getUserReport = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getUserReportAPI() as reportData;
      setData(result);
      localStorage.setItem("UserReportCount", (`${result.TotalReportCount} / ${result.ReportLimit}` || "0/8"))
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { getUserReport, loading, error, data };
};
