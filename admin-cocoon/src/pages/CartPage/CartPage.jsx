import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Input, Modal, notification } from 'antd';
import { PlusOutlined, DeleteOutlined, MinusOutlined, LeftOutlined } from '@ant-design/icons';
import HomePageHeader from '../../components/HeaderComponents/HomePageHeader';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CartPage = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const navigate = useNavigate();

    const fetchCart = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/carts/${userId}`);
            if (response.status === 200) {
                const products = response.data?.products || [];
                setCartProducts(products);
                const initialQuantities = {};
                products.forEach(product => {
                    initialQuantities[product.productId._id] = product.quantity || 1;
                });
                setQuantities(initialQuantities);
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: `Error displaying cart products: ${error}`,
            });
            console.error(error);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                if (decoded.exp * 1000 < Date.now()) {
                    notification.error({
                        message: 'Phiên đã hết hạn',
                        description: 'Vui lòng đăng nhập lại.',
                    });
                    navigate('/login');
                    return;
                }
                const userId = decoded.userId;
                fetchCart(userId);
            } catch (error) {
                console.error("Lỗi khi giải mã token:", error);
            }
        }
    }, []);
    

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity > 0) {
            setQuantities(prevQuantities => ({
                ...prevQuantities,
                [productId]: newQuantity
            }));
            try {
                const userId = jwtDecode(localStorage.getItem('token')).userId;
                await axios.put(`http://localhost:4000/carts/update`, {
                    userId,
                    productId,
                    quantity: newQuantity,
                });
                calculateTotalPrice(selectedProducts);
                // notification.success({
                //     message: 'Success',
                //     description: 'Quantity updated successfully.',
                // });
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'Error updating quantity.',
                });
                console.error('Error updating quantity:', error);
            }
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
        setDeleteProduct(null);
    };

    const confirmDelete = (product) => {
        setDeleteProduct(product);
        setIsModalOpenDelete(true);
    };

    const handleDeleteProduct = async () => {
        if (deleteProduct) {
            try {
                const userId = jwtDecode(localStorage.getItem('token')).userId;
                await axios.delete(`http://localhost:4000/carts/delete`, {
                    data: { userId, productId: deleteProduct.productId._id },
                });
                setCartProducts(prevProducts => prevProducts.filter(p => p.productId._id !== deleteProduct.productId._id));
                calculateTotalPrice(selectedProducts.filter(p => p.productId._id !== deleteProduct.productId._id));
                notification.success({
                    message: 'Success',
                    description: 'Product removed from cart.',
                });
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'Error removing product from cart.',
                });
                console.error('Error removing product from cart:', error);
            } finally {
                setIsModalOpenDelete(false);
                setDeleteProduct(null);
            }
        }
    };

    const calculateTotalPrice = (selectedProducts) => {
        const total = selectedProducts.reduce((sum, product) => {
            const quantity = quantities[product.productId._id] || 1;
            return sum + (product.productId.price * quantity);
        }, 0);
        setTotalPrice(total);
    };

    const onSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedProducts(selectedRows);
        calculateTotalPrice(selectedRows);
    };

    const renderAction = (_, record) => (
        <Button type="link" danger onClick={() => confirmDelete(record)}>
            Xóa <DeleteOutlined />
        </Button>
    );

    const renderQuality = (_, record) => {
        const productId = record.productId._id;
        const quantity = quantities[productId] || 1;

        return (
            <div style={{ marginTop: 5, width: '112px', gap: 4, borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                <Button style={{ width: 30, height: 30, border: 'none' }} onClick={() => handleQuantityChange(productId, quantity - 1)}>
                    <MinusOutlined />
                </Button>
                <Input
                    value={quantity}
                    onChange={(e) => handleQuantityChange(productId, parseInt(e.target.value) || 1)}
                    size='small'
                    style={{ textAlign: 'center', width: '40px', height: 30 }}
                />
                <Button style={{ width: 30, height: 30, border: 'none' }} onClick={() => handleQuantityChange(productId, quantity + 1)}>
                    <PlusOutlined />
                </Button>
            </div>
        );
    };

    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: ['productId', 'imageUrl'],
            render: (imageUrl) => (
                <img
                    src={imageUrl}
                    alt="product"
                    style={{ height: '40px', width: '40px', borderRadius: '20%', marginLeft: '5px' }}
                />
            ),
        },
        { title: 'Tên', dataIndex: ['productId', 'name'], sorter: (a, b) => a.productId.name.length - b.productId.name.length },
        { title: 'Giá', dataIndex: ['productId', 'price'], render: (price) => `${price.toLocaleString('vi-VN')} đ`, },
        { title: 'Số lượng', dataIndex: 'quantity', render: renderQuality },
        { title: '', dataIndex: 'action', render: renderAction },
    ];

    return (
        <div>
            <HomePageHeader />
            <div>
                <div style={{ display: 'flex' }}>
                    <Button onClick={() => navigate(-1)} style={{ marginTop: '5px', marginLeft: '5px' }}>
                        <LeftOutlined /> Go Back
                    </Button>
                    <b style={{ margin: '10px 100px', fontSize: 20 }}>Cart</b>
                </div>


                <b style={{ marginTop: 60, marginLeft: 800 }}>Tổng số tiền: {totalPrice.toLocaleString('vi-VN')} đ</b>
                <br></br>
                <Button
                    style={{ marginLeft: 800, marginTop: 10 }}
                    onClick={() => {
                        const token = localStorage.getItem('token');
                        if (token) {
                            try {
                                const decoded = jwtDecode(token);
                                const userId = decoded.userId; // Lấy userId từ token
                                navigate('/order', {
                                    state: {
                                        userId,
                                        totalPrice,
                                        products: selectedProducts.map(product => ({
                                            productId: product.productId._id,
                                            name: product.productId.name,
                                            quantity: quantities[product.productId._id],
                                            price: product.productId.price,
                                            total: quantities[product.productId._id] * product.productId.price
                                        }))
                                    }
                                });
                            } catch (error) {
                                notification.error({
                                    message: 'Lỗi',
                                    description: 'Không thể giải mã token. Vui lòng đăng nhập lại.',
                                });
                                console.error('Error decoding token:', error);
                            }
                        } else {
                            notification.warning({
                                message: 'Cảnh báo',
                                description: 'Bạn chưa đăng nhập.',
                            });
                            navigate('/login');
                        }
                    }}
                >
                    Thanh toán
                </Button>

                <div>
                     {cartProducts.length === 0 ? (
                    <b style={{marginLeft:200, fontSize:20}}>Your cart is empty.</b>
                ) : (
                    <Table
                        rowSelection={{
                            onChange: onSelectChange,
                        }}
                        style={{ margin: '15px 60px' }}
                        columns={columns}
                        dataSource={cartProducts}
                        rowKey={(record) => record.productId._id}
                    />
                )}
                </div>
               
            </div>

            <Modal title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
                <div>Bạn có chắc chắn xóa sản phẩm này không ?</div>
            </Modal>
        </div>
    );
};

export default CartPage;

// Ngân hàng	NCB
// Số thẻ	9704198526191432198
// Tên chủ thẻ	NGUYEN VAN A
// Ngày phát hành	07/15
// Mật khẩu OTP	123456