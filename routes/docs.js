var express = require('express');
var router = express.Router();

router.get("/", function (req, res, next){
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', '*');
    res.render('docs');
})


module.exports = router