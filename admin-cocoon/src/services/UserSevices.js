// UserServices.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/users'; // Đường dẫn đến API của bạn

export const signup = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy tất cả người dùng
export const getAllUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Thêm người dùng mới
export const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Cập nhật thông tin người dùng
export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xóa người dùng
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
