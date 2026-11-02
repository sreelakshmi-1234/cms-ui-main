import axios from 'axios';

const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

// **************** Types **************
export const GetAlarmTypeList = async () => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/activityAlarm/type/list`, body);
            return response.data;

        } catch (error) {
            console.error("Error while fetching alarm type list!");
            return [];
        }

    }
};

// ******************** Comments **************
export const GetAlarmCommentsById = async (alarmId : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token,
            id : alarmId
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/activityAlarm/comment/get`, body);
            return response.data;

        } catch (error) {
            console.error("Error while fetching alarm comments!");
            return [];
        }

    }
};


export const PostAlarmCommentById = async (alarmId : string, comment : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token,
            id : alarmId,
            comment : comment
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/activityAlarm/comment/post`, body);
            return response.data;

        } catch (error) {
            console.error("Error while posting alarm comment!");
            return [];
        }

    }
};

export const DeleteAlarmCommentById = async (alarmId : string, commentId : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token,
            alarmId : alarmId,
            commentId : commentId
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/activityAlarm/comment/delete`, body);
            return response.data;

        } catch (error) {
            console.error("Error while posting alarm comment!");
            return [];
        }

    }
};


// ******************** Assigns *****************

export const GetAlarmAssignUsersById = async (alarmId : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token,
            id : alarmId
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/activityAlarm/assign/user/get`, body);
            return response.data;

        } catch (error) {
            console.error("Error while fetching alarm type list!");
            return [];
        }

    }
};

export const AssignUserToAlarmById = async (alarmId : string, userId : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token,
            alarmId : alarmId,
            userId : userId
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/activityAlarm/assign/user/assign`, body);
            return response.data;

        } catch (error) {
            console.error("Error while fetching alarm type list!");
            return [];
        }

    }
};

export const UnassignUserToAlarmById = async (alarmId : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        
        const body = {
            token : token,
            alarmId : alarmId
        };

        try {
            const response = await axios.post(`${BASE_URL}/v1/activityAlarm/assign/user/unassign`, body);
            return response.data;

        } catch (error) {
            console.error("Error while fetching alarm type list!");
            return [];
        }

    }
};