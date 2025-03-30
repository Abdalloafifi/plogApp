// routes/password.js
const express = require('express');
const router = express.Router();
const password = require('../controllers/password.js');
const { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAdmin, }= require('../middlewares/vEerfytoken');

// مسار لإرسال رابط إعادة تعيين كلمة المرور عبر البريد الإلكتروني
router.post('/reset-password-sendEmail',verifyToken, password.sendResetPasswordEmail);

// مسار لمعالجة إعادة تعيين كلمة المرور
// هنا نستخدم POST ونستقبل الـ token (ورغم أن الرابط المرسل يحتوي على token و id، يمكننا التقاط token فقط أو التقاط كلاهما)
// يمكنك تعديل الدالة لتستخدم req.params.id إذا احتجت لذلك.
router.post('/reset-password/:token/:id', verifyToken, password.resetPassword);

module.exports = router;
