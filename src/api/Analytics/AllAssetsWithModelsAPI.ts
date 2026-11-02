import axios from 'axios';

const AllAssetsWithModelsAPI  = async (plantId : string) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "plantID" : plantId,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getAllAssetsWithModelsData`, body);
            return Promise.resolve(response.data);
        } catch (error) {
            console.error(error)
        }
    }
}

export default AllAssetsWithModelsAPI;