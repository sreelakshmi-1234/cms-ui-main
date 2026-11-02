import axios from 'axios';

const PlantViewBlocksTableAPI  = async (searchTag : Object[]) => {
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
        try {
            const response = await axios.post(`${BASE_URL}/v2/getPlantViewBlocksTableData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default PlantViewBlocksTableAPI;