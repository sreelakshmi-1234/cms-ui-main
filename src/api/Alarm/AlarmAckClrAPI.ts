import axios from 'axios';

const AlarmAckClrAPI  = async (AlarmID : string, event : string) => {
    const BASE_URL = "https://cogneta.cloud/api";

    const token = localStorage.getItem("token");
    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {

        try {
            // Direct Thingsboard API For ACK & CLR
            const response = await axios.post(`${BASE_URL}/alarm/${AlarmID}/${event}`, {}, {
                headers : {'X-Authorization' : `Bearer ${token}`}
            });
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default AlarmAckClrAPI;