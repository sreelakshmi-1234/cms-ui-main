import axios from 'axios';

const DeleteUserReportAPI  = async (report : object) => {
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
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/deleteUserReport`, body);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}

export default DeleteUserReportAPI;