// src/components/HeaderComponents/HomePageHeader.jsx
import React, { useEffect, useState } from "react";
import { Col, Input, Button, Popover, message } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../services/UserSevices"; // Sửa tên service
import { getAllCategory } from "../../services/CategorySevices";
import { getAllProduct, getProductByCate, searchProduct } from "../../services/ProductServices";
import {
  TextHeader,
  WrapperHeader,
  AccoutHeader,
  ContentPopup,
  Span,
} from "./style";
import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
import { jwtDecode } from "jwt-decode";

const { Search } = Input;

const HomePageHeader = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch user information
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setToken(storedToken);
        fetchUsername(decoded.userId);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const fetchUsername = async (userId) => {
    try {
      const user = await getUserById(userId);
      if (user) {
        setUsername(user.name);
      }
    } catch (error) {
      console.error("Failed to fetch user information:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategory();
      if (res) {
        setCategories(res.map((item) => ({ ...item, key: item.categoryId })));
      }
    } catch (error) {
      message.error("Failed to load categories.");
    }
  };

  const fetchGetDetailProduct = async (categoryId) => {
    try {
      const res = await getProductByCate(categoryId);
      if (res) {
        navigate("/products", { state: { products: res } });
        setIsOpenDrawer(false);
      }
    } catch (error) {
      message.error("Failed to load product details. Please try again.");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await getAllProduct();
      if (res) {
        navigate("/products", { state: { products: res } });
      }
    } catch (error) {
      message.error("Failed to load products.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = async (value) => {
    if (!value) {
      message.error('Vui lòng nhập tên sản phẩm để tìm kiếm');
      return;
    }
    try {
      const res = await searchProduct(value);
      if (res) {
        navigate("/products", { state: { products: res } });
      } else {
        message.error(res.message || 'No products found');
      }
    } catch (error) {
      message.error('Lỗi tìm kiếm sản phẩm');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUsername("");
    navigate("/login");
  };

  const handleNavigateLogin = () => {
    navigate(token ? "/profile" : "/login");
  };

  const content = (
    <div>
      <ContentPopup onClick={handleLogout}>Đăng xuất</ContentPopup>
      <ContentPopup onClick={() => navigate("/profile")}>Thông tin người dùng</ContentPopup>
    </div>
  );

  return (
    <div>
      <WrapperHeader>
        <Col span={3} style={{ padding: "18px 0px" }}>
          <div onClick={() => setIsOpenDrawer(true)}>
            <img
              width={20}
              src="https://cdn3.iconfinder.com/data/icons/remixicon-system/24/menu-unfold-line-1024.png"
              alt="Menu"
            />
            <TextHeader style={{ marginLeft: 5 }}>Sản Phẩm</TextHeader>
          </div>
        </Col>
        <Col span={7} style={{ padding: "18px 0px" }}>
          <Search placeholder="Search" allowClear style={{ padding: "0px 50px" }} onSearch={handleSearch} />
        </Col>
        <Col span={8}>
          <img
            width={165}
            src="https://cocoonvietnam.com/_nuxt/img/logo.f502f17.svg"
            alt="Logo"
          />
        </Col>
        <Col span={3} style={{ padding: "18px 0px" }}>
          <img
            width={20}
            src="https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/cart_shop_buy_retail-1024.png"
            alt="Cart"
          />
          <TextHeader style={{ marginLeft: 5 }} onClick={() => navigate("/cart")}>
            Giỏ Hàng
          </TextHeader>
        </Col>
        <Col span={3} style={{ padding: "18px 0px" }}>
          <AccoutHeader>
            <div>
              <img
                width={20}
                src="https://cdn1.iconfinder.com/data/icons/web-essentials-6/24/user-128.png"
                alt="User"
              />
            </div>
            {token ? (
              <Popover placement="bottom" content={content} trigger="click">
                <Span>Chào, {username}</Span>
              </Popover>
            ) : (
              <div onClick={handleNavigateLogin}>
                <Span>Đăng nhập</Span>
              </div>
            )}
          </AccoutHeader>
        </Col>
      </WrapperHeader>

      <DrawerComponent
        title="Sản Phẩm"
        placement="left"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="25%"
      >
        <TextHeader
          onClick={() => {
            fetchProducts();
            setIsOpenDrawer(false);
          }}
          style={{ margin: "5px 5px 10px", fontSize: 20 }}
        >
          Tất cả sản Phẩm
        </TextHeader>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {categories.map((category) => (
            <div
              key={category.categoryId}
              style={{
                height: "120px",
                width: "120px",
                marginTop: 10,
                cursor: "pointer",
              }}
              onClick={() => fetchGetDetailProduct(category.categoryId)}
            >
              {category.image && (
                <img
                  src={category.image}
                  alt="Category"
                  style={{ height: "100px", width: "100px", borderRadius: "20%" }}
                />
              )}
              <p style={{ marginTop: 5, marginLeft: 5 }}>{category.categoryName}</p>
            </div>
          ))}
        </div>
      </DrawerComponent>
    </div>
  );
};

export default HomePageHeader;
