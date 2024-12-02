import React, { useState, useEffect } from "react";
import { WapperHeader } from "./style";
import { Button, Table, Tag, Space, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddOrderModal from "../AddOrderModal/AddOrderModal";
import UpdateOrderStatusModal from "./UpdateOrderStatusModal";
import axios from "axios";

const AdminOrder = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch orders from the server
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/orders/getAll`);
            const formattedOrders = response.data.data.map(order => ({
                key: order._id,
                orderId: order.orderId,
                userInfo: `${order.userInfo.name} (${order.userInfo.phone})`,
                address: order.userInfo.address,
                totalPrice: order.totalPrice,
                status: order.status,
                products: order.products.map(product => ({
                    name: product.productId.name,
                    price: product.productId.price,
                    quantity: product.quantity,
                })),
            }));
            setOrders(formattedOrders);
        } catch (error) {
            message.error("Lỗi khi lấy danh sách đơn hàng!");
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchOrders();
    }, []);

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);
    const handleAddOrder = () => {
        setIsModalVisible(false);
        fetchOrders();
    };

    const showDeleteModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
        setSelectedOrderId(null);
    };

    const handleDeleteOrder = async () => {
        try {
            await axios.delete(`http://localhost:4000/orders/${selectedOrderId}`);
            message.success("Xóa đơn hàng thành công!");
            fetchOrders();
        } catch (error) {
            message.error("Lỗi khi xóa đơn hàng!");
            console.error("Error deleting order:", error);
        } finally {
            setIsDeleteModalVisible(false);
            setSelectedOrderId(null);
        }
    };

    const showUpdateModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsUpdateModalVisible(true);
    };

    const handleUpdateCancel = () => {
        setIsUpdateModalVisible(false);
        setSelectedOrderId(null);
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
        },
        {
            title: 'User Info',
            dataIndex: 'userInfo',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            render: (total) => `${total.toLocaleString('vi-VN')} đ`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
                <Tag color={status === 'delivered' ? 'green' : status === 'canceled' ? 'red' : 'orange'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => showUpdateModal(record.key)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => showDeleteModal(record.key)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <WapperHeader>Order List</WapperHeader>
            <div style={{ padding: '10px' }}>
                <Button
                    style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}
                    onClick={showModal}
                >
                    <PlusOutlined style={{ fontSize: '40px' }} />
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={orders}
                loading={loading}
                // pagination={false} // Turn off pagination
            />
            <AddOrderModal
                isVisible={isModalVisible}
                onCancel={handleCancel}
                onSubmit={handleAddOrder}
            />
            <Modal
                title="Xác nhận xóa"
                open={isDeleteModalVisible}
                onOk={handleDeleteOrder}
                onCancel={handleDeleteCancel}
                okText="Xóa"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn xóa đơn hàng này không?</p>
            </Modal>
            <UpdateOrderStatusModal
                isVisible={isUpdateModalVisible}
                orderId={selectedOrderId}
                onCancel={handleUpdateCancel}
                onUpdate={fetchOrders}
            />
        </div>
    );
};

export default AdminOrder;
