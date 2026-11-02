import axios from 'axios';

const DeviceKeysAPI  = async (searchTag : Object, customerId? : string | undefined) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const timeZone = localStorage.getItem("currentUserTimeZone");

    const customerID = customerId || localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "searchTag" : searchTag,
            "customerID" : customerID
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getDeviceKeys`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default DeviceKeysAPI;