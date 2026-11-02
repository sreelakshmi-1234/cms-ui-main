import axios from "axios";
import { SecondaryAPIBaseURL } from "../../APIBaseURL";

const UnderperformersAPI = async (
  searchTag: {
    devName: string;
    keys: string;
  },
  timeWindow: {
    startTs: number;
    endTs: number;
    aggregate: string;
    interval: number;
  },
  type: "plant" | "portfolio"
) => {
  const BASE_URL = SecondaryAPIBaseURL;

  const token = localStorage.getItem("token");
  const customerID = localStorage.getItem("SelectedCustomerId");
  const timeZone = localStorage.getItem("SelectedTimezone");
  const plantTimeZone = localStorage.getItem("PlantTimeZone");

  return axios.post(`${BASE_URL}/v1/fleetBenchmark/underperformers`, {
    token,
    customerID,
    type,
    searchTag,
    timeWindow,
    timeZone,
    plantTimeZone,
    sortBy: "pr_percent",
    sortOrder: "ASC",
    limit: 5,
  });
};

export default UnderperformersAPI;