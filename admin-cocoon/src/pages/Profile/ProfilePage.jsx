import React, { useState, useEffect } from 'react';
import { Tabs, Table, Input, Button, DatePicker, Select, message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './ProfilePage.css';
import { getUserById, updateUser } from '../../services/UserSevices';
import HomePageHeader from '../../components/HeaderComponents/HomePageHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';

const { Option } = Select;

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('1');
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    phone: '',
    address:'',
    gender: '',
    birthday: null,
  });
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [initialUserInfo, setInitialUserInfo] = useState(null); // Trạng thái ban đầu

  const orderHistoryColumns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'products',
      key: 'products',
      render: (products) =>
        products.map((product, index) => (
          <div key={index}>
            {product.productId.name} - Số lượng: {product.quantity}
          </div>
        )),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (date) => (date ? moment(date).format('MM/DD/YYYY') : 'Chưa thanh toán'),
    },
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      fetchUserData(decoded.userId);
      fetchOrderHistory(decoded.userId);
    }
  }, []);

    // Hàm tải dữ liệu người dùng
    const fetchUserData = async (userId) => {
      try {
        const user = await getUserById(userId);
        const formattedUser = {
          email: user.email,
          name: user.name,
          phone: user.phone,
          address: user.address,
          gender: user.gender,
          birthday: user.birthday ? moment(user.birthday) : null,
        };
        setUserInfo(formattedUser);
        setInitialUserInfo(formattedUser); // Lưu trạng thái ban đầu
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

  const fetchOrderHistory = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/orders/userId/${userId}`);
      setOrderHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const decoded = jwtDecode(storedToken);
      const updatedData = await updateUser(decoded.userId, userInfo);
      setUserInfo(updatedData); // Cập nhật lại giao diện với thông tin mới
      message.success('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Cập nhật thông tin thất bại. Vui lòng thử lại.');
    }
  };
  
  // Hàm khôi phục lại trạng thái ban đầu
  const handleReset = () => {
    setUserInfo(initialUserInfo);
    message.info('Đã hủy bỏ các thay đổi.');
  };

  const handleInputChange = (field, value) => {
    setUserInfo({ ...userInfo,
      [field]: field === 'birthday' ? (value ? value.format('YYYY-MM-DD') : null) : value, });
  };

  return (
    <div>
      <HomePageHeader />
      <div className="account-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="account-title">TÀI KHOẢN</h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowRightOutlined />
          </Button>
        </div>
        <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={(key) => setActiveTab(key)} className="account-tabs">
          <Tabs.TabPane tab="Thông tin tài khoản" key="1">
            <div className="account-info">
              <section className="account-section">
                <h2>Thông tin tài khoản</h2>
                <div className="grid-container">
                  <div className="grid-item">
                    <label>Email</label>
                    <Input
                      value={userInfo.email}
                      className="input-enabled"
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="grid-item">
                    <label>Địa chỉ</label>
                    <Input
                      placeholder="Địa chỉ"
                      value={userInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                </div>
              </section>
              <section className="personal-info">
                <h2>Thông tin cá nhân</h2>
                <div className="grid-container">
                  <div className="grid-item">
                    <label>Họ và tên</label>
                    <Input
                      placeholder="Họ và tên"
                      value={userInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid-item">
                    <label>Ngày sinh</label>
                    <DatePicker
                      placeholder="mm/dd/yyyy"
                      value={userInfo.birthday ? moment(userInfo.birthday) : null} // Hoặc dùng dayjs(userInfo.birthday)
                      onChange={(date) => handleInputChange('birthday', date)}
                      style={{ width: '30%' }}
                    />
                  </div>
                  <div className="grid-item">
                    <label>Số điện thoại</label>
                    <Input
                      placeholder="Số điện thoại"
                      value={userInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid-item">
                    <label>Giới tính</label>
                    <Select
                      placeholder="-- Chọn giới tính --"
                      value={userInfo.gender}
                      onChange={(value) => handleInputChange('gender', value)}
                      style={{ width: '30%' }}
                    >
                      <Option value="male">Nam</Option>
                      <Option value="female">Nữ</Option>
                      <Option value="other">Khác</Option>
                    </Select>
                    <div className="action-buttons">
                      <Button type="link" className="cancel-button" onClick={handleReset} >Hủy Bỏ</Button> 
                      <Button type="primary" className="save-button" onClick={handleUpdateUser} >Lưu Thông Tin Mới</Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Lịch sử mua hàng" key="3">
            <Table
              columns={orderHistoryColumns}
              dataSource={orderHistoryData}
              rowKey="orderId"
              pagination={false}
              className="order-history-table"
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
