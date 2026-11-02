import axios from 'axios';

const InfoSymbolAPI  = async () => {
    const BASE_URL = "https://cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {

        try {
            const response = await axios.get(`${BASE_URL}/entityGroup/${customerID}`, {
                 
                headers : {'X-Authorization' : `Bearer ${token}`}
            });
            return response.data;
        } catch (error) {
            console.error("ERROR")
        }
    }
}

export default InfoSymbolAPI;