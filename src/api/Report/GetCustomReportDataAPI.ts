import axios from 'axios';

const getCustomReportDataAPI  = async (report : any) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "reportBody" : report
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getCustomReportData`, body);
            return response.data;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

export default getCustomReportDataAPI;