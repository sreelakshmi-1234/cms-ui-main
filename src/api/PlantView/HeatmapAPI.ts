import axios from 'axios';

const HeatmapAPI  = async (apiName : string, searchTag : Object) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "searchTag" : searchTag,
        };
        switch (apiName) {
            case "inverter":
                
                try {
                    const response = await axios.post(`${BASE_URL}/v1/getInverterHeatmapData`, body);
                    return response;
                } catch (error) {
                    console.error(error);
                }
            break;

            case "status":

                try {
                    const response = await axios.post(`${BASE_URL}/v1/getInverterHeatmapStatusData`, body);
                    return response;
                } catch (error) {
                    console.error(error);
                }
            break;
        
            default:
                const response = {
                    data : "API not Found!"
                }
                return(response)
            break;
        }
    }
}

export default HeatmapAPI;