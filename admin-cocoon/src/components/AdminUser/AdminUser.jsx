import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Input, Modal, message } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../../services/UserSevices";
import DrawerCompoment from "../DrawerComponent/DrawerComponent";

const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [stateUser, setStateUser] = useState({
        userId: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    });
    const [stateUserDetails, setStateUserDetails] = useState({
        userId: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    });

    const [users, setAllUsers] = useState([]);
    const [form] = Form.useForm();

    const fetchUserDetail = async (rowSelected) => {
        const res = await getUserById(rowSelected);
        if (res) {
            setStateUserDetails({
                name: res?.name,
                email: res?.email,
                password: res?.password,
                phone: res?.phone,
                address: res?.address,
            });
        }
    };

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (rowSelected) {
            fetchUserDetail(rowSelected);
        }
    }, [rowSelected]);

    const handleUserDetails = () => {
        if (rowSelected) {
            fetchUserDetail(rowSelected); // Thêm rowSelected vào đây để fetch thông tin chi tiết
        }
        setIsOpenDrawer(true);
    };

    const onUpdateUser = async () => {
        try {
            await updateUser(stateUserDetails.userId, stateUserDetails);
            message.success("Cập nhật người dùng thành công");
            setIsOpenDrawer(false);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setAllUsers(res.map(item => ({ ...item, key: item.userId }))); // Sử dụng userId ở đây
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(stateUserDetails.userId);
            message.success("Xóa người dùng thành công");
            setIsOpenDrawer(false);
            setIsModalOpenDelete(false);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const onFinish = async () => {
        try {
            await createUser(stateUser);
            message.success("Thêm người dùng thành công");
            setIsModalOpen(false);
            fetchUsers();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleOnchange = (e) => {
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined
                    style={{ color: 'red', fontSize: '20px', cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => setIsModalOpenDelete(true)}
                />
                <EditOutlined
                    style={{ color: 'orange', fontSize: '20px', cursor: 'pointer' }}
                    onClick={handleUserDetails}
                />
            </div>
        );
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.length - b.name.length },
        { title: 'Email', dataIndex: 'email' },
        // { title: 'Password', dataIndex: 'password' },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Address', dataIndex: 'address' },
        { title: 'Action', dataIndex: 'action', render: renderAction },
    ];

    return (
        <div>
            <WrapperHeader> Quản lý người dùng </WrapperHeader>
            <div style={{ padding: '10px' }}>
                <Button
                    style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusOutlined style={{ fontSize: '40px' }} />
                </Button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <TableComponent
                    columns={columns}
                    data={users}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                setRowSelected(record.userId); // Sử dụng userId ở đây
                            },
                        };
                    }}
                />
            </div>

            <Modal title="Tạo người dùng" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    {['name', 'email', 'password', 'phone', 'address'].map(field => (
                        <Form.Item
                            key={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            rules={[{ required: true, message: `Vui lòng nhập ${field}!` }]}
                        >
                            <Input value={stateUser[field]} onChange={handleOnchange} name={field} />
                        </Form.Item>
                    ))}
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <DrawerCompoment title="Chi tiết người dùng" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="80%">
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onUpdateUser}
                    autoComplete="off"
                    form={form}
                >
                    {['name', 'email', 'password', 'phone', 'address'].map(field => (
                        <Form.Item
                            key={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            rules={[{ required: true, message: `Vui lòng nhập ${field}!` }]}
                        >
                            <Input value={stateUserDetails[field]} onChange={handleOnchangeDetails} name={field} />
                        </Form.Item>
                    ))}
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Áp dụng
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerCompoment>

            <Modal title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
                <div>Bạn có chắc chắn muốn xóa người dùng này không?</div>
            </Modal>
        </div>
    );
};

export default AdminUser;
