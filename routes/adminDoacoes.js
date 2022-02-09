var express = require('express');
var router = express.Router();

router.get("/", function (req, res, next){
    res.render('adminDoacoes');
    console.log(db);
})

module.exports = router