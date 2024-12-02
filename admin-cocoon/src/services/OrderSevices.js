import axios from 'axios';

const API_URL = 'http://localhost:4000/orders'; // Đường dẫn đến API của bạn

export const id = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/id`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};



