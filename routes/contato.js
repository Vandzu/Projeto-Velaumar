var express = require('express');
var router = express.Router();

router.get("/", function (req, res, next){
    res.render('contato');
})

router.post("/", function (req, res){
    let nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremail@gmail.com',
          pass: 'yourpassword'
        }
      });
    
    let mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Contato pelo site',
        text: req.body.mensagem
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.render('contato', {
              envio: 'E-mail enviado com sucesso!'
          })
        }
    });
})

module.exports = router