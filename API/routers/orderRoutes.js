const express = require('express');
const {
    getOrderById,
    addOrder,
    deleteOrder,
    updateOrderStatus,
    getAllOrders,
    create_order,
    getOrdersByUserId,
    createPaymentUrl,
    vnpayReturn
} = require('../controllers/orderController');

const router = express.Router();

// lấy theo id
router.get('/getOrderById/:id', getOrderById);
// tạo
router.post('/addOrder', addOrder);
// cập nhật trạng thái
router.put('/status/:id/status', updateOrderStatus);
//xóa
router.delete('/delete/:id', deleteOrder);
// lấy tất cả
router.get('/getAll', getAllOrders);
// Route để thêm đơn hàng mới
router.post('/create_order', create_order);
// lấy order theo User
router.get('/userId/:userId', getOrdersByUserId);
// thanh toán vnpay
router.post('/create_payment_url', createPaymentUrl);
// trả về thông báo
router.get('/vnpay_return', vnpayReturn);

module.exports = router;
