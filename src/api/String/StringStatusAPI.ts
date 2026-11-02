import axios from 'axios';

const StringStatusAPI  = async (searchTag : Object) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");
    const timeZone = localStorage.getItem("SelectedTimezone"); // It was user time but not use in API (Backend).


    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "searchTag" : searchTag,
            "timeZone" : timeZone,

        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getStringStatusData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default StringStatusAPI;