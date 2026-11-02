import axios from 'axios';

const SourceContributionAPI  = async (textSearch : string, key : string, title : string[], resolution : string) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const timeZone = localStorage.getItem("currentUserTimeZone");

    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "textSearch" : textSearch,
            "key" : key,
            "title" : title,
            "timeZone" : timeZone,
            "resolution" : resolution

        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getSourceContributionData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default SourceContributionAPI;