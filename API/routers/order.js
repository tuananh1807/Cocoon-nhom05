let express = require('express');
let router = express.Router();
let $ = require('jquery');



router.get('/', function (req, res, next) {
    res.render('orderlist', { title: 'Danh sách đơn hàng' })
});

router.get('/vnpay_return', function (req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let config = require('config');
    let secretKey = config.get('vnp_HashSecret');
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        // Verify the transaction in the database, if valid, proceed
        let orderStatus = vnp_Params['vnp_ResponseCode'] === '00' ? 'success' : 'error';

        const redirectToPaymentSuccessPage = (status) => `
        <html>
            <head>
                <meta http-equiv="refresh" content="0; url=http://localhost:3000/">
            </head>
            <body>
                <p>Redirecting to payment ${status} page...</p>
            </body>
        </html>`;

        res.status(200).send(redirectToPaymentSuccessPage(orderStatus));
    } else {
        res.status(400).render('error', { code: '97', message: 'Invalid Signature' });
    }
});




module.exports = router;