import axios from 'axios';

const ColumnLineAPI  = async (searchTag : Object, timeWindow : Object) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const timeZone = localStorage.getItem("currentUserTimeZone");

    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            // "textSearch" : textSearch,
            // "type" : type,
            "timeZone" : timeZone,
            "searchTag" : searchTag,
            "timeWindow" : timeWindow,

        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getColumnLine`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default ColumnLineAPI;