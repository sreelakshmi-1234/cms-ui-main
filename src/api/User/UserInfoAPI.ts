import axios from 'axios';

const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

export const GetUserInfosAPI = async () => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/user/info`, body);
            return response.data;

        } catch (error) {
            console.error("Error while fetching users info!");
            return [];
        }

    }
}