import axios from 'axios';

const DeviceAttributeValueAPI  = async (deviceLabel : string) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");


    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "deviceLabel" : deviceLabel
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getDeviceAttributes`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default DeviceAttributeValueAPI;