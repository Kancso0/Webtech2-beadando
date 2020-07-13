const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const db = require('../database/connection');
const books = db.get('books');


router.get('/', (req, res) => {

    books.find().then(books => {
        res.json(books);
    });

});

router.post('/addBook', (req, res, next) => {

    const newBook = {
        title: req.body.title,
        isbn: req.body.isbn,
        Author: req.body.Author,
        yearOfPublication: req.body.yearOfPublication,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image,
        description: req.body.description
    }

        books.insert(newBook).then(newBook =>{
            res.json(newBook);
        });


});

router.post('/buyBook', (req, res, next) => {

    const output = `
        <p>Sikeres váráslás ${req.body.summ} összegben!</p>
    `;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'webtech2beadando@gmail.com',
          pass: 'test123test'
        }
      });
      
      var mailOptions = {
        from: 'webtech2beadando@gmail.com',
        to: req.body.email,
        subject: 'Library Buy',
        html: output
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
          next(error);
        } else {
          res.json({response: 'Email sent!'});
        }
      });

});


module.exports = router;