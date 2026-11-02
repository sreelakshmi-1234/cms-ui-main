import axios from 'axios';

const INVvsStringHeatmapAPI  = async (searchTag : Object) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");
    const timeZone = localStorage.getItem("SelectedTimezone");
    const plantTimeZone = localStorage.getItem("PlantTimeZone");


    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "searchTag" : searchTag,
            "timeZone" : timeZone,
            "plantTimeZone" : plantTimeZone
        };
        try {
                const response = await axios.post(`${BASE_URL}/v1/getINVvsStringHeatmapData`, body);
                return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default INVvsStringHeatmapAPI;