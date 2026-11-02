import axios from 'axios';

const SaveReportAPI  = async (report : object, isUpdate : boolean) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    // const customerID = localStorage.getItem("SelectedCustomerId");
    // const userTimeZone = localStorage.getItem("SelectedTimezone");
    // const plantTimeZone = localStorage.getItem("PlantTimeZone");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "report" : report,
            isUpdate
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/saveReport`, body);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}

export default SaveReportAPI;