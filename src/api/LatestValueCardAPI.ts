import axios from 'axios';

const LatestValueCardAPI  = async (deviceLabel : string, telemetry : string, title : string) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");
    const timeZone = localStorage.getItem("SelectedTimezone");


    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "deviceLabel" : deviceLabel,
            "telemetry" : telemetry,
            "title" : title,
            "timeZone" : timeZone
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getLatestValueCardData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default LatestValueCardAPI;