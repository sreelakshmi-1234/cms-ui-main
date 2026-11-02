import axios from 'axios';

const LatestValueOfSameKeyMultipleDeviceAPI  = async (searchTag : Object[]) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";           //"http://localhost:7001/api"; 

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");
    const timeZone = localStorage.getItem("SelectedTimezone");

    if(!token) {
        throw new Error("JWT not found!");
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "searchTag" : searchTag,
            "timeZone" : timeZone
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getLatestValueOfSameKeyMultipleDevice`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default LatestValueOfSameKeyMultipleDeviceAPI;