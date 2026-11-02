import axios from "axios";
import { SecondaryAPIBaseURL } from "../../APIBaseURL";

const AssetRevenueHeatmapAPI = async (
  searchTag: Object,
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

  if (!token) {
    throw new Error("JWT not found!");
  } else {
    const body = {
      token: token,
      customerID: customerID,
      type: type,
      searchTag: searchTag,
      timeWindow: timeWindow,
      timeZone: timeZone,
      plantTimeZone: plantTimeZone,
    };

    try {
      console.log("Payload:", body);
      const response = await axios.post(
        `${BASE_URL}/v1/assetRevenueHeatmap`,
        body
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export default AssetRevenueHeatmapAPI;