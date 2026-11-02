import axios from 'axios';

const StatisticsCardAPI  = async (deviceLabel : string, telemetry : string, title : string) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "deviceLabel" : deviceLabel,
            "telemetry" : telemetry,
            "title" : title,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getStatisticsData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default StatisticsCardAPI;