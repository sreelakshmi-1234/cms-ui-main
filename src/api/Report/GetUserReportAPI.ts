import axios from 'axios';

const getUserReportAPI  = async () => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getUserReportData`, body);
            return response.data;
        } catch (error) {
            console.error(error)
        }
    }
}

export default getUserReportAPI;