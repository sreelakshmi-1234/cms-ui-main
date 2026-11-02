import { useState, useCallback } from 'react';
import DeleteUserReportAPI from '../../../api/Report/DeleteUserReportAPI';

interface UseDeleteUserReportReturn {
  deleteUserReport: (report: object) => Promise<any>;
  loading: boolean;
  error: string | null;
  data: any;
}

export const useDeleteUserReport = (): UseDeleteUserReportReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const deleteUserReport = useCallback(async (report: object) => {
    setLoading(true);
    setError(null);

    try {
      const result = await DeleteUserReportAPI(report);
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

  return { deleteUserReport, loading, error, data };
};
