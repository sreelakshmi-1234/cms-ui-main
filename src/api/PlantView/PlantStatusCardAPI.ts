import axios from 'axios';

const PlantStatusCardAPI  = async (DataLabel : string[], resolution : string) => {
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
            "timeZone" : timeZone,
            "DataLabel" : DataLabel,
            "resolution" : resolution
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getPlantStatusCardData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default PlantStatusCardAPI;