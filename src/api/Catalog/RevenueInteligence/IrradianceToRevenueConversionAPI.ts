import axios from "axios";
import { SecondaryAPIBaseURL } from "../../APIBaseURL";

const IrradianceToRevenueConversionAPI = async (
  searchTag: any,
  timeWindow: {
    startTs: number;
    endTs: number;
    aggregate: string;
    interval: number;
  },
  type?: "plant" | "portfolio"
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
    timeWindow,
    timeZone,
    plantTimeZone,
  };

  console.log("Payload:", body);

  return axios.post(
    `${BASE_URL}/v1/irradianceToRevenueConversion`,
    body
  );
};

export default IrradianceToRevenueConversionAPI;