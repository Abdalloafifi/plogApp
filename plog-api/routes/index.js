var express = require('express');
var router = express.Router();
const asynchandler = require("express-async-handler")
/* GET home page. */
router.get('/', asynchandler((req, res, next)=> {
  res.render('index', { title: 'Express' });
}));

module.exports = router;
