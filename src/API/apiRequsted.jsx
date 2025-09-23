import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://kashop1.runasp.net/api";

export const usePost = () => {
    const [loading, setLoading] = useState(false);

    const postData = async (endpoint, payload) => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/${endpoint}`, payload);
            //  alert('test')
            console.log(payload);
            console.log(response.data);
            console.log(response);

            return response.data;
        } catch (err) {
            console.log(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, postData };
};
