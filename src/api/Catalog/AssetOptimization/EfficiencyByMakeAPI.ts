import axios from "axios";
import { SecondaryAPIBaseURL } from "../../APIBaseURL";

interface SearchTag {
  [key: string]: string;
}

const TransformerEfficiencyByMakeAPI = async (
  searchTag: SearchTag,
  type: "plant" | "portfolio"
) => {
  const BASE_URL = SecondaryAPIBaseURL;

  const token = localStorage.getItem("token");
  const customerID = localStorage.getItem("SelectedCustomerId");
  const timeZone = localStorage.getItem("SelectedTimezone");
  const plantTimeZone = localStorage.getItem("PlantTimeZone");

  if (!token) {
    throw new Error("JWT not found!");
  }

  const body = {
    token,
    customerID,
    type,
    searchTag,
    timeZone,
    plantTimeZone,
  };

  return axios.post(
    `${BASE_URL}/v1/assetOptimization/efficiencyByMake`,
    body
  );
};

export default TransformerEfficiencyByMakeAPI;