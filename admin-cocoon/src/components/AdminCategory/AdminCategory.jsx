import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Input, Modal } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import { addCategory, deleteCategory, getAllCategory, getDetailCategory, updateCategory } from "../../services/CategorySevices";
import DrawerCompoment from "../DrawerComponent/DrawerComponent";

const AdminCategory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [stateCategory, setStateCategory] = useState({
        categoryId: '',
        categoryName: '',
        image: '',
    });
    const [stateCategoryDetails, setStateCategoryDetails] = useState({
        categoryId: '',
        categoryName: '',
        image: '',
    });

    const [categories, setAllCategories] = useState([]);
    const [form] = Form.useForm();

    const fetchGetDetailCategory = async (rowSelected) => {
        const res = await getDetailCategory(rowSelected);
        if (res) {
            setStateCategoryDetails({
                categoryId: res?.categoryId,
                categoryName: res?.categoryName,
                image: res?.image,
            });
        }
    };

    useEffect(() => {
        form.setFieldsValue(stateCategoryDetails);
    }, [form, stateCategoryDetails]);

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailCategory(rowSelected);
        }
    }, [rowSelected]);

    const handleDetailsCategory = () => {
        if (rowSelected) {
            fetchGetDetailCategory();
        }
        setIsOpenDrawer(true);
    };

    const onUpdateCategory = async () => {
        try {
            await updateCategory(stateCategoryDetails.categoryId, stateCategoryDetails);
            alert("Cập nhật danh mục thành công");
            setIsOpenDrawer(false);
            fetchGetDetailCategory(rowSelected);
            fetchCategories();
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await getAllCategory();
            setAllCategories(res.map(item => ({ ...item, key: item.categoryId })));
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteCategory = async () => {
        try {
            await deleteCategory(stateCategoryDetails.categoryId, stateCategoryDetails);
            alert("Xóa danh mục thành công");
            setIsOpenDrawer(false);
            setIsModalOpenDelete(false);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const onFinish = async () => {
        try {
            await addCategory(stateCategory);
            alert("Thêm danh mục thành công");
            setIsModalOpen(false);
            fetchCategories();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const handleOnchange = (e) => {
        setStateCategory({
            ...stateCategory,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnchangeDetails = (e) => {
        setStateCategoryDetails({
            ...stateCategoryDetails,
            [e.target.name]: e.target.value,
        });
    };

    const renderAction = () => (
        <div>
            <Button icon={<DeleteOutlined style={{ color: 'red'}} />} onClick={() => setIsModalOpenDelete(true)} style={{marginRight: 5}} />
            <Button icon={<EditOutlined style={{ color: 'orange'}} />} onClick={handleDetailsCategory} />
        </div>
    );

    const columns = [
        { title: 'Mã loại', dataIndex: 'categoryId' },
        { title: 'Tên', dataIndex: 'categoryName', sorter: (a, b) => a.categoryName.length - b.categoryName.length },
        {
            title: 'URL hình ảnh', dataIndex: 'image',
            render: (image) => (
                <img
                    src={image}
                    alt="category"
                    style={{ height: '80px', width: '80px', borderRadius: '20%', marginLeft: '5px' }}
                />
            ),
        },
        { title: 'Action', dataIndex: 'action', render: renderAction },
    ];

    return (
        <div>
            <WrapperHeader> Quản lý danh mục </WrapperHeader>
            <div style={{ padding: '10px' }}>
                <Button
                    style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusOutlined style={{ fontSize: '40px' }} />
                </Button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} data={categories}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => setRowSelected(record.categoryId),
                        };
                    }}
                />
            </div>

            <Modal title="Tạo danh mục" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    {['categoryId', 'categoryName'].map(field => (
                        <Form.Item
                            key={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            rules={[{ required: true, message: `Please input your ${field}!` }]}
                        >
                            <Input value={stateCategory[field]} onChange={handleOnchange} name={field} />
                        </Form.Item>
                    ))}
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your Image!' }]}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input onChange={handleOnchange} name="image" style={{ flex: 1 }} />
                            {stateCategory.image && (
                                <img
                                    src={stateCategory.image}
                                    alt="avatar"
                                    style={{ height: '80px', width: '80px', borderRadius: '20%', marginLeft: '5px' }}
                                />
                            )}
                        </div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <DrawerCompoment title="Chi tiết danh mục" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="80%">
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onUpdateCategory}
                    autoComplete="off"
                    form={form}
                >
                    {['categoryId', 'categoryName'].map(field => (
                        <Form.Item
                            key={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            rules={[{ required: true, message: `Please input your ${field}!` }]}
                        >
                            <Input value={stateCategoryDetails[field]} onChange={handleOnchangeDetails} name={field} />
                        </Form.Item>
                    ))}
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your Image!' }]}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input onChange={handleOnchangeDetails} name="image" style={{ flex: 1 }} />
                            {stateCategoryDetails.image && (
                                <img
                                    src={stateCategoryDetails.image}
                                    alt="avatar"
                                    style={{ height: '90px', width: '90px', borderRadius: '20%', marginLeft: '5px' }}
                                />
                            )}
                        </div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 18, span: 18 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerCompoment>

            <Modal title="Xóa danh mục" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteCategory}>
                <p>Bạn có chắc chắn muốn xóa danh mục không?</p>
            </Modal>
        </div>
    );
};

export default AdminCategory;
