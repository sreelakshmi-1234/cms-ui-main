import axios from 'axios';

const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

export const GetDeviceProfileAPI = async (pageInfo : object) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token,
            pageInfo
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/deviceProfile/get`, body);
            return response.data;

        } catch (error) {
            console.error("Error while fetching device profile info!");
            return [];
        }

    }
}

export const GetDeviceProfileByIdAPI = async (profileId : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token,
            profileId
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/deviceProfile/get/id`, body);
            return response.data;

        } catch (error) {
            console.error("Error while fetching device profile by ID!");
            return [];
        }

    }
}

export const PostDeviceProfileAPI = async (profile : object) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token,
            profile
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/deviceProfile/post`, body);
            return response.data;

        } catch (error) {
            console.error("Error while Posting device profile!");
            return [];
        }

    }
}

export const GetDeviceProfileDevicesAttributeByIdAPI = async (profileId : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token,
            profileId
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/deviceProfile/device/attribute`, body);
            return response.data;

        } catch (error) {
            console.error("Error while fetching device profile devices attributes!");
            return [];
        }

    }
}

export const GetDeviceProfileDevicesTimeseriesByIdAPI = async (profileId : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token,
            profileId
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/deviceProfile/device/timeseries`, body);
            return response.data;

        } catch (error) {
            console.error("Error while fetching device profile devices timeseriess!");
            return [];
        }

    }
}