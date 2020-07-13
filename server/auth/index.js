const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const db = require('../database/connection');

const users = db.get('users');

users.createIndex('username', { unique: true });

db.then(()=>{
    console.log('Connected to the database!');
});

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
   // password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    password: Joi.string().trim().min(5).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    age: Joi.number().integer().min(0).max(100).required(),
    adress: Joi.string().required(),
    balance: Joi.number().min(1).max(30000).required()
});

router.get('/', (req, res) => {

    res.json({
        message: 'Hi Kancso',
        user: req.user,
    });

});

router.post('/signup', (req, res, next)=>{

    console.log(req.body);

    const result = Joi.validate(req.body, schema);

        if(result.error === null){

            // username is unique

            users.findOne({

                username: req.body.username

            }).then(user => {

                // if user is null, username is not in the db , otherwise duplicate
                if(user){
                    // user in the db already

                    const error = new Error('The username is already in use. Please choose another one!');
                    
                    next(error);

                    

                }else {
                    // hash the password
                    bcrypt.hash(req.body.password, 10, function(err, hash){

                        // insert the user with the hashed psw in the db
                            
                        const newUser = {
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            age: req.body.age,
                            adress: req.body.adress,
                            balance: req.body.balance
                        }

                        users.insert(newUser).then(result => {
                            res.json({ result });

                        });

                    });

                }
            });

        }else {
            res.status(406);
            next(result.error);

        }



});

router.post('/login', (req, res, next) =>{

    users.findOne({
       
        username: req.body.username

    }).then((user) => {

        if(!user){

            const error = new Error('The username or the password incorrect!');
            res.status(422);
            next(error);

        } else {

            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(err){
                    console.log(err);
                    return;
                }
                
                if(result === false){
                    // the password was incorrect
                    const error = new Error('The username or the password incorrect!');
                    next(error);
                } else {
                    // The password was correct ----> create JWT !!!
                    const payload = {
                        _id: user._id,
                        username: user.username,
                        balance: user.balance,
                        age: user.age,
                        adress: user.adress,
                        email: user.email,
                    };

                    
                    //process.env.TOKEN_SECRET

                    // Create JWT here
                    jwt.sign(payload, 'nemtudom', {
                        expiresIn: '1d'
                    },(err, token) => {

                        if(err){
                            res.status(422);
                            console.log(err);
                        } else {

                            res.json({token});

                        }
                    });
                }
            });

        }

    });

});



module.exports = router;


