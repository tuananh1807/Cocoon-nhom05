import React, { useState } from 'react';
import { Button, Col, Input, notification, Radio, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './CreateOrder.css';

const CreateOrder = () => {
  const location = useLocation();
  const initialTotalPrice = location.state?.totalPrice || 0;
  const initialOrderSummary = location.state?.products || [];
  const userId = location.state?.userId; // Retrieve userId from location.state
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [orderSummary, setOrderSummary] = useState(initialOrderSummary);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    payment: 'vnpay', // Default payment method
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handlePayment() {
    try {
        const newOrder = {
            userInfo: {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
            },
            payment: formData.payment,
            products: orderSummary.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                total: item.total,
            })),
            userId: userId,
            amount: totalPrice,
        };

        // Step 1: Create order
        const orderResponse = await axios.post(
            'http://localhost:4000/orders/create_order',
            newOrder
        );

        if (orderResponse.status !== 200 || !orderResponse.data) {
            throw new Error('Failed to create order');
        }

        const { orderId, paymentUrl } = orderResponse.data;

        // Step 2: VNPay Payment URL
        if (paymentUrl) {
            window.location.href = paymentUrl;
        } else {
            throw new Error('Failed to get VNPay payment URL');
        }
    } catch (error) {
        notification.error({
            message: 'Payment Error',
            description: `Unable to process payment: ${error?.message || error}`,
        });
    }
}

  return (
    <div className="CreateOrder">
      <header className="checkout-header">
        <h1 style={{ fontSize: 20 }}>Thanh toán</h1>
      </header>
      <main className="checkout-container">
        <div className="form-container">
          <form className="checkout-form">
            <section className="billing-info">
              <h2>Thông tin liên hệ</h2>
              <h2>Địa chỉ giao hàng</h2>
              <label htmlFor="name">Họ và tên</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Nhập họ và tên"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="phone">Số điện thoại</label>
              <Input
                type="text"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange}
              />
              <label htmlFor="address">Địa chỉ</label>
              <Input.TextArea
                id="address"
                name="address"
                placeholder="Nhập địa chỉ cụ thể"
                value={formData.address}
                onChange={handleChange}
              />
              <section className="payment-method">
                <h2>Phương thức thanh toán</h2>
                <Radio.Group
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                >
                  <Radio style={{ display: 'block' }} value="cod">
                    Thanh toán khi giao hàng (COD)
                  </Radio>
                  <Radio style={{ display: 'block' }} value="vnpay">
                    Thanh toán bằng Ví VNPAY
                  </Radio>
                  <Radio style={{ display: 'block' }} value="atm">
                    Thanh toán bằng thẻ ATM/VISA/MASTER
                  </Radio>
                </Radio.Group>
              </section>
            </section>
          </form>

          <section className="order-summary">
            <b>Thông tin đơn hàng</b>
            <hr style={{ margin: 10 }}></hr>
            <ul>
              {orderSummary.map((item, index) => (
                <Row key={index} style={{ margin: 8 }}>
                  <Col span={10}>
                    {item.name.length > 25
                      ? `${item.name.substring(0, 25)}...`
                      : item.name}
                  </Col>
                  <Col span={2}>{item.quantity}</Col>
                  <Col span={6}>{item.price.toLocaleString()} VND</Col>
                  <Col span={6}>{item.total.toLocaleString()} VND</Col>
                </Row>
              ))}
            </ul>
            <div className="price-summary">
              <p>
                Tạm tính: <span>{totalPrice.toLocaleString()} VND</span>
              </p>
              <p>Giảm giá: <span>0 VND</span></p>
              <p>Phí vận chuyển: <span>0 VND</span></p>
              <p>
                <b>
                  Tổng cộng: <span>{totalPrice.toLocaleString()} VND</span>
                </b>
              </p>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="checkout-btn"
              onClick={handlePayment}
            >
              Đặt hàng
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CreateOrder;
