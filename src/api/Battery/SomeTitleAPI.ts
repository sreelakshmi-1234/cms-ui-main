import axios from 'axios';

const SomeTitleAPI  = async (searchTagSomeTitle : Object) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "searchTag" : searchTagSomeTitle,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getSomeTitleData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default SomeTitleAPI;