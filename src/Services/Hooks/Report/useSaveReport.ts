import { useState, useCallback } from 'react';
import SaveReportAPI from '../../../api/Report/SaveUserReportAPI';

interface UseSaveReportReturn {
  saveReport: (report: object, isUpdate : boolean) => Promise<any>;
  loading: boolean;
  error: string | null;
  data: any;
}

export const useSaveReport = (): UseSaveReportReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const saveReport = useCallback(async (report: object, isUpdate : boolean) => {
    setLoading(true);
    setError(null);

    try {
      const result = await SaveReportAPI(report, isUpdate);
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

  return { saveReport, loading, error, data };
};
