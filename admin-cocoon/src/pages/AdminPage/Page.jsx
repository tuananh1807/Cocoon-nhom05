import React, { useState } from 'react';
import { Menu } from "antd";
import { getItem } from "../../utils";
import {
    UserOutlined, ProductOutlined, AppstoreOutlined, ShoppingOutlined, LayoutOutlined,
    LineChartOutlined, AreaChartOutlined, ContactsOutlined, DollarOutlined
} from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminCategory from '../../components/AdminCategory/AdminCategory';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import './style.css';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';
import HeaderComponent from '../../components/HeaderComponents/HeaderComponent';


// Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';
import AdminOrder from '../../components/AdminOrder/AdminOrder/AdminOrder';
import Charts from '../../components/Settings/Charts';

const AdminPage = () => {
    // Initialize navigate
    const navigate = useNavigate();

    const items = [
        {
            label: <strong style={{ color: '#000' }}>QUICK MENU</strong>,
            key: 'quickMenu',
            type: 'group',
            children: [
                getItem('Dashboard', 'dashboard', <LayoutOutlined />),
                getItem('Người dùng', 'user', <UserOutlined />),
                getItem('Danh mục', 'category', <AppstoreOutlined />),
                getItem('Sản phẩm', 'product', <ProductOutlined />),
                getItem('Đơn hàng', 'order', <ShoppingOutlined />),
            ],
        },
        {
            label: <strong style={{ color: '#000' }}>SETTINGS</strong>,
            key: 'settings',
            type: 'group',
            children: [
                getItem('Charts', 'charts', <LineChartOutlined />),
                getItem('Trends', 'trends', <AreaChartOutlined />),
                getItem('Contact', 'contact', <ContactsOutlined />),
                getItem('Billing', 'billing', <DollarOutlined />),
            ],
        },
    ];

    const [keySelected, setKeySelected] = useState('dashboard');

    // Function to render pages based on selected key
    const renderPage = (key) => {
        switch (key) {
            case 'dashboard':
                return <AdminDashboard />;
            case 'user':
                return <AdminUser />;
            case 'category':
                return <AdminCategory />;
            case 'product':
                return <AdminProduct />;
            case 'order':
                return <AdminOrder />;
            case 'charts':
                return <Charts />;    
            default:
                return <></>;
        }
    };

    // Handle menu click, including logout
    const handleOnClick = ({ key }) => {
        if (key === 'logout') {
            console.log("Logging out...");
            navigate('/login'); // Redirect to login page
        } else {
            setKeySelected(key);
        }
    };

    // Logout button component
    const LogoutButton = ({ onLogout }) => {
        return (
            <div className="logout-container">
                <button className="logout-button" onClick={onLogout}>
                    <LogoutOutlined className="logout-icon" />
                    Log Out
                </button>
            </div>
        );
    };

    return (
        <div className="admin-container">
            <div className="sidebar">
                <div className="logo-header">
                    <img
                        src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305571564_193544796366297_2042317215963346782_n.png?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH74gB4_opNdQdc7wvDuMrTbwuPsUZGyeJvC4-xRkbJ4iu59Zb2V9QmEzPpIhkx0JccbC60nf416fM5qSZrSJYo&_nc_ohc=HEQUu7tXGSMQ7kNvgFZspzM&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=AQPjWCfhEUkcp9rdUsvq6lg&oh=00_AYCUm74DAwxIBjA29c5GQJCNAWUapLewTUiVtwTfw19xOg&oe=672DA2A5"
                        alt="logo"
                        className="logo-image"
                    />
                    <div className="profile-header">Cocoon Original</div>
                </div>

                <Menu
                    mode="inline"
                    items={items}
                    onClick={handleOnClick}
                    className="menu"
                />

                {/* Render Logout Button */}
                <LogoutButton onLogout={() => handleOnClick({ key: 'logout' })} />


            </div>

            <div className="content-area">
                <HeaderComponent />
                {renderPage(keySelected)}

            </div>
        </div>
    );
};

export default AdminPage;
