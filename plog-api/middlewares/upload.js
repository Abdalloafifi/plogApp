const multer = require('multer');



const storage = multer.memoryStorage(); // تخزين الصورة في الذاكرة مؤقتًا
const upload = multer({ storage });

module.exports = upload;
