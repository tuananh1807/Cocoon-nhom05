import axios from 'axios';

const API_URL = "http://localhost:4000/products/";

export async function getAllProduct() {
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
        console.error('Error fetching all products:', error.response ? error.response.data : error.message);
        return [];
    }
}

export async function addProduct(newProduct) {
    // Loại bỏ _id nếu có trong newProduct
    const { _id, ...productData } = newProduct;

    try {
        const response = await axios.post(`${API_URL}/addProduct`, productData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error adding product:', error.response ? error.response.data : error.message);
        return [];
    }
}


export async function getDetailProduct(_id) {
    if (!_id) {
        console.error("Error: Product ID is undefined.");
        return null;
    }
    try {
        const response = await axios.get(`${API_URL}/getDetail/${_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log('response.data', response.data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Failed to fetch product details:", error.response ? error.response.data : error.message);
        return null;
    }
}

export async function getProductByCate(categoryId) {
    try {
        const response = await axios.get(`${API_URL}/category/${categoryId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log('response.data', response.data)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching products by category:', error.response ? error.response.data : error.message);
        return [];
    }
}

export async function updateProduct(_id, updatedData) {
    try {
        const response = await axios.put(`${API_URL}/updateProduct/${_id}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log('response.data', response.data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error updating product:', error.response ? error.response.data : error.message);
        return [];
    }
}

export async function deleteProduct(_id) {
    try {
        const response = await axios.delete(`${API_URL}/deleteProduct/${_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log('response.data', response.data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        return [];
    }
}

export async function searchProduct(value) {
    try {
        const response = await axios.get(`${API_URL}/search?name=${value}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log('response.data', response.data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        return [];
    }
}