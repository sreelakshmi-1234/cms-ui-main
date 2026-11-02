import axios from 'axios';

const ManyDeviceSameFilteredKeyTableAPI  = async (searchTag : Object, searchFields : string[], FieldDisplayName : string[]) => {
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
            "searchFields" : searchFields,
            "FieldDisplayName" : FieldDisplayName
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getManyDeviceSameFilteredKeyTableData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default ManyDeviceSameFilteredKeyTableAPI;