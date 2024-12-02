import axios from 'axios';

const API_URL = "http://localhost:4000/categories/";

export async function getAllCategory() {
    try {
        const response = await axios.get(`${API_URL}/getAll`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error?.message);
        return [];
    }
}

export async function addCategory(newCategory) {
    try {
        const response = await axios.post(`${API_URL}/addCategory`, newCategory, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error?.message);
        return [];
    }
}

export async function getDetailCategory(productId) {
    try {
        const response = await axios.get(`${API_URL}/getDetailCategory/${productId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log('response.data', response.data)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error?.message);
        return [];
    }
}

export async function updateCategory(categoryId, updatedData) {
    try {
        const response = await axios.put(`${API_URL}/updateCategory/${categoryId}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log('response.data', response.data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error?.message);
        return [];
    }
}

export async function deleteCategory(categoryId) {
    try {
        const response = await axios.delete(`${API_URL}/deleteCategory/${categoryId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log('response.data', response.data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error?.message);
        return [];
    }
}

