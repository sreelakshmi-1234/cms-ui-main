import axios from 'axios';

const PlantAvailabilityAPI  = async (searchtag : Object) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");
    const timeZone = localStorage.getItem("SelectedTimezone");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "searchTag" : searchtag,
            "customerID" : customerID,
            "timeZone" : timeZone,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getPlantAvailabilityData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default PlantAvailabilityAPI;