import React, { useState } from 'react';
import { Button, Input, Select, notification } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const CreateOrder = () => {
  const location = useLocation();
  const initialTotalPrice = location.state?.totalPrice || 0;
  const cartProducts = location.state?.products || []; // Get selected products
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [selectedBankCode, setSelectedBankCode] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('vn');

  async function handlePayment() {
    try {
      const total = totalPrice;
      const newPayment = {
        products: cartProducts, // Include selected products
        amount: total,
        bankCode: selectedBankCode,
        language: selectedLanguage,
      };

      const response = await axios.post(
        'http://localhost:4000/vnpay/create_payment_url',
        newPayment
      );

      if (response.status === 200 && response.data) {
        window.location.href = response.data;
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Error: ${error?.message || error}`,
      });
    }
  }

  return (
    <div>
      <div style={{ margin: '40px 200px' }}>
        <b style={{ fontSize: 20 }}>Tạo mới đơn hàng</b>

        <div style={{ marginTop: 30 }}>
          <label>Số tiền:</label><br />
          <Input
            style={{ width: 300 }}
            value={totalPrice.toLocaleString('vi-VN')}
            readOnly
          />
        </div>

        <div style={{ marginTop: 30 }}>
          <label>Phương thức thanh toán:</label>
          <Input.Group compact>
            <Select
              defaultValue={null}
              style={{ width: 200 }}
              onChange={(value) => setSelectedBankCode(value)}
            >
              <Option value={null}>Không chọn</Option>
              <Option value="VNPAYQR">VNPAYQR</Option>
              <Option value="VNBANK">VNBANK</Option>
            </Select>
          </Input.Group>
        </div>

        <div style={{ marginTop: 30 }}>
          <label htmlFor="language">Ngôn ngữ:</label>
          <Input.Group compact>
            <Select
              defaultValue="vn"
              style={{ width: 200 }}
              onChange={(value) => setSelectedLanguage(value)}
            >
              <Option value="vn">Tiếng Việt</Option>
              <Option value="en">English</Option>
            </Select>
          </Input.Group>
        </div>

        <div style={{ marginTop: 30 }}>
          <h3>Thông tin đơn hàng: </h3>
        </div>

        <Button style={{ marginTop: 30 }} onClick={handlePayment}>Thanh toán</Button>
      </div>
    </div>
  );
};

export default CreateOrder;
