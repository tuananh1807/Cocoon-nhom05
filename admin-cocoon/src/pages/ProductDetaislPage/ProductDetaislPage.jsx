import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, message, Col, Row, Input, Modal } from 'antd';
import { ShoppingOutlined, PlusOutlined, MinusOutlined, LeftOutlined } from '@ant-design/icons';
import { getDetailProduct } from '../../services/ProductServices';
import HomePageHeader from '../../components/HeaderComponents/HomePageHeader';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ProductDetailsPage = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [userId, setUserId] = useState(null); // State to store userId
    const [isModalVisible, setIsModalVisible] = useState(false); // State for Modal visibility

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken); // Decode token to get userId
                setUserId(decoded.userId);
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchProductDetail = async () => {
            setLoading(true);
            try {
                const productData = await getDetailProduct(_id);
                if (productData) {
                    setProduct(productData);
                } else {
                    setError("Could not fetch product details.");
                    message.error("Failed to load product details.");
                }
            } catch (err) {
                setError("Failed to load product details.");
            }
            setLoading(false);
        };
        fetchProductDetail();
    }, [_id]);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    const showLoginModal = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
        navigate('/login'); // Redirect to login page
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddToCart = async () => {
        if (!userId) {
            showLoginModal(); // Show login modal if user is not logged in
            return;
        }

        if (!_id) {
            message.error("Product ID is required");
            return;
        }

        const data = {
            userId: userId,
            productId: _id,
            quantity: quantity,
        };

        try {
            const response = await axios.post('http://localhost:4000/carts/add', data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                message.success('Thêm sản phẩm vào giỏ hàng thành công');
            }
        } catch (error) {
            message.error('Lỗi khi thêm sản phẩm vào giỏ hàng');
            console.error(error);
        }
    };

    if (loading) return <Spin style={{ display: 'block', margin: '20px auto' }} />;
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div>
            <HomePageHeader />
            <Button onClick={() => navigate(-1)} style={{ marginTop: '5px', marginLeft: '5px' }}>
                <LeftOutlined /> Go Back
            </Button>
            <div style={{ padding: 20, margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <Row>
                        <Col span={10}>
                            <div style={{ marginLeft: '80px' }}>
                                {product.imageUrl && (
                                    <img
                                        src={product.imageUrl}
                                        alt="product"
                                        style={{ width: '100%', maxWidth: '700px', borderRadius: '5%' }}
                                    />
                                )}
                            </div>
                        </Col>
                        <Col span={14}>
                            <div style={{ maxWidth: '400px', marginLeft: '100px' }}>
                                <h1 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: '-moz-initial' }}>{product.name}</h1>
                                <p style={{ fontSize: '20px', color: 'red', fontFamily: '-moz-initial' }}>{`${product.price.toLocaleString('vi-VN')} đ`}</p>
                                <p style={{ fontSize: '16px', fontFamily: '-moz-initial' }}>{product.description}</p>

                                <div>
                                    <div>Số lượng</div>
                                    <div style={{ marginTop: 5, width: '112px', gap: 4, border: '1px solid #ccc', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                                        <Button style={{ width: 30, height: 30, border: 'none' }} onClick={() => handleQuantityChange(quantity - 1)}>
                                            <MinusOutlined />
                                        </Button>
                                        <Input
                                            value={quantity}
                                            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                            size='small'
                                            style={{ textAlign: 'center', width: '40px', height: 30 }}
                                        />
                                        <Button style={{ width: 30, height: 30, border: 'none' }} onClick={() => handleQuantityChange(quantity + 1)}>
                                            <PlusOutlined />
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    type="primary"
                                    icon={<ShoppingOutlined />}
                                    style={{ width: '320px', height: '50px', marginTop: '20px', background: '#000' }}
                                    onClick={handleAddToCart}
                                >
                                    <span style={{ fontSize: '16px' }}>Add to Cart</span>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Modal for login prompt */}
            <Modal
                title="Login Required"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Login"
                cancelText="Cancel"
            >
                <p>Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng của mình. Vui lòng đăng nhập để tiếp tục.</p>
            </Modal>
        </div>
    );
};

export default ProductDetailsPage;
