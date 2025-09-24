import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://kashop1.runasp.net/api";

export const usePost = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const postData = async (endpoint, payload) => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/${endpoint}`, payload);
            //  alert('test')
            console.log(payload);
            console.log(response.data);
            console.log(response);
            if (response.status == 200) {
                navigate('/login')
                // console.log('hhhhhhhhhhhhhhhhhh');
            }
            return response.data;

        } catch (err) {
            console.log(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, postData };
};
