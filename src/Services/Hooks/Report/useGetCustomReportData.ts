import { useState, useCallback } from 'react';
import getCustomReportDataAPI from '../../../api/Report/GetCustomReportDataAPI';

interface reportData {
  title: string;
  createdAt: string;
  data: {
    [plant: string]: Array<{
      timestamp: string;
      [key: string]: string | number;
    }>;
  };
}

interface UseGetCustomReportDataReturn {
  getUserReportData: (report  : any) => Promise<any>;
  loading: boolean;
  error: string | null;
  data: reportData | null;
}

export const useGetCustomReportData = (): UseGetCustomReportDataReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<reportData | null>(null);

  const getUserReportData = useCallback(async (report : any) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getCustomReportDataAPI(report) as reportData;
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.response.data.error || 'Something went wrong');
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getUserReportData, loading, error, data };
};
