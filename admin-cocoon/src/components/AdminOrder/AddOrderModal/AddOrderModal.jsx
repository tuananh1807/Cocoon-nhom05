import React, { useState, useEffect } from "react";
import { Modal, Form, DatePicker, Select, InputNumber, Button, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const AddOrderModal = ({ isVisible, onCancel, onSubmit }) => {
    const [form] = Form.useForm();
    const [products, setProducts] = useState([{ id: Date.now(), productId: null, quantity: 1, price: 0 }]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [productList, setProductList] = useState([]);
    const [customerList, setCustomerList] = useState([]);

    // Lấy danh sách sản phẩm và khách hàng khi modal mở
    useEffect(() => {
        if (isVisible) {
            fetchCustomers();
            fetchProducts();
        }
    }, [isVisible]);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:4000/users");
            setCustomerList(response.data.map((user) => ({
                id: user.customerId || user.id, // Xử lý cả hai trường hợp
                name: user.name,
            })));
        } catch (error) {
            console.error("Lỗi khi lấy danh sách khách hàng:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/products/getAll");
            setProductList(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        }
    };

    const handleProductChange = (index, productId) => {
        const product = productList.find((item) => item.productId === productId);
        if (!product) return;
    
        const updatedProducts = products.map((item, i) =>
            i === index ? { ...item, productId, price: product.price } : item
        );
        setProducts(updatedProducts);
        calculateTotal(updatedProducts);
    };

    const handleQuantityChange = (index, quantity) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity = quantity;
        setProducts(updatedProducts);
        calculateTotal(updatedProducts);
    };

    const calculateTotal = (updatedProducts) => {
        const total = updatedProducts.reduce((sum, product) => {
            const subtotal = (product.price || 0) * (product.quantity || 0);
            return sum + subtotal;
        }, 0);
        setTotalAmount(total);
        form.setFieldsValue({ total });
    };
    const addProductField = () => {
        setProducts([...products, { id: Date.now(), productId: null, quantity: 1, price: 0 }]);
    };

    const removeProductField = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        calculateTotal(updatedProducts);
    };

    const handleFinish = async (values) => {
        const validItems = products.filter((item) => item.productId !== null);
    
        if (validItems.length === 0) {
            console.error("Không có sản phẩm hợp lệ để thêm vào đơn hàng.");
            return;
        }
    
        const orderData = {
            customerId: values.customerId,
            order_date: values.date,
            status: values.orderStatus,
            total_amount: totalAmount,
            items: validItems.map((product) => ({
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
            })),
        };
    
        try {
            const response = await axios.post("http://localhost:4000/orders", orderData);
            console.log("Đơn hàng đã được tạo:", response.data);
            onSubmit();
            form.resetFields();
            setProducts([{ id: Date.now(), productId: null, quantity: 1, price: 0 }]);
            setTotalAmount(0);
        } catch (error) {
            console.error("Lỗi khi tạo đơn hàng:", error.response?.data || error.message);
        }
    };

    return (
        <Modal
            title="Add New Order"
            open={isVisible}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={null}
            style={{ top: 20 }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{
                    orderStatus: "chờ xử lý",
                }}
            >
                 <Form.Item
    label="Customer"
    name="customerId"
    rules={[{ required: true, message: "Please select a Customer!" }]}
>
    <Select placeholder="Select Customer">
        {customerList.map((customer, index) => (
            <Option key={customer.customerId || index} value={customer.customerId}>
                {customer.name}
            </Option>
        ))}
    </Select>
</Form.Item>


                <Form.Item
                    label="Date"
                    name="date"
                    rules={[{ required: true, message: "Please select Date!" }]}
                >
                    <DatePicker showTime style={{ width: '100%' }} />
                </Form.Item>

                {products.map((product, index) => (
                    <Row gutter={16} key={product.id} align="middle">
                        <Col span={10}>
                            <Form.Item label="Product" required>
                                <Select
                                    placeholder="Select Product"
                                    onChange={(value) => handleProductChange(index, value)}
                                    value={product.productId}
                                >
                                    {productList.map((item) => (
                                        <Option key={item.productId} value={item.productId}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="Quantity" required>
                                <InputNumber
                                    min={1}
                                    value={product.quantity}
                                    onChange={(value) => handleQuantityChange(index, value)}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="Price">
                                <InputNumber value={product.price} style={{ width: '100%' }} disabled />
                            </Form.Item>
                        </Col>

                        <Col span={2}>
                            {products.length > 1 && (
                                <MinusCircleOutlined
                                    onClick={() => removeProductField(product.id)}
                                    style={{
                                        fontSize: '20px',
                                        color: 'red',
                                        cursor: 'pointer',
                                        marginTop: '35px',
                                    }}
                                />
                            )}
                        </Col>
                    </Row>
                ))}

                <Button type="dashed" onClick={addProductField} style={{ width: '100%', marginBottom: '20px' }}>
                    <PlusOutlined /> Add Product
                </Button>

                <Form.Item
                    label="Order Status"
                    name="orderStatus"
                    rules={[{ required: true, message: "Please select Order Status!" }]}
                >
                    <Select>
                        <Option value="chờ xử lý">Processing</Option>
                        <Option value="đã giao">Shipped</Option>
                        <Option value="hủy">Cancelled</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Total Amount" name="total">
                    <InputNumber value={totalAmount} style={{ width: '100%' }} disabled />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddOrderModal;

