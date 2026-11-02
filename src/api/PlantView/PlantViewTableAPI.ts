import axios from 'axios';

const PlantViewTableAPI  = async (searchTag : Object, firstColName? : string) => {
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
            "firstColName" : firstColName || false
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getPlantViewTableData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default PlantViewTableAPI;