import { useState, useCallback } from "react";
import RevenueRankingLeaderboardAPI from "../../../../api/Catalog/RevenueInteligence/RevenueRankingLeaderboardAPI";

const UseRevenueRankingLeaderboard = (
  searchTag: Object,
  timeWindow: {
    startTs: number;
    endTs: number;
    aggregate: string;
    interval: number;
  },
  type?: "plant" | "portfolio"
) => {
  const [data, setData] = useState<any>(null);

  const fetchRevenueRankingLeaderboard = useCallback(async () => {
    try {
      const response = await RevenueRankingLeaderboardAPI(
        searchTag,
        timeWindow,
        type
      );

      setData(response?.data);
    } catch (error) {
      console.error(
        "Error fetching Revenue Ranking Leaderboard:",
        error
      );
    }
  }, [searchTag, timeWindow, type]);

  return {
    data,
    fetchRevenueRankingLeaderboard,
  };
};

export default UseRevenueRankingLeaderboard;