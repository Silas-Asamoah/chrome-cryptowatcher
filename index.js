"use strict";

const cryptos = require('./cryptos.json')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const helpers = require('./helpers')
const config = require('./config')
const express = require('express')
const bcrypt = require('bcrypt')
const DB = require('./db')


const db = new DB("sqlitedb")
const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const { allowCrossDomain, fetchCoins, handleResponse, handleFavoriteResponse, generateUrl} = helpers
app.use(allowCrossDomain)

const defaultUrl = generateUrl(cryptos.coins,cryptos.currencies)
fetchCoins(defaultUrl, handleResponse)

//Defining Routes
app.use(router)
app.listen(process.env.PORT || 4003)

router.post('/auth', function(req, res){
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send(JSON.stringify({ message: "There was a problem getting user"}))
        if (user) {
            if(!bcrypt.compareSync(req.body.password, user.user_pass)) {
                return res.status(400).send(JSON.stringify({message: "The email or passowrd is incorrect"}))
            }

            let token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 //expires in 24 hours
            })
            res.status(200).send(JSON.stringify({toekn: token, user_id: user.id}))
        } else {
            db.insertUser([req.body.email, bcrypt.hashSync(req.body.password, 8)],
            function (err, id) {
                if (err) return res.status(500).send(JSON.stringify({message: "There was a problem getting user"}))
                else {
                    let token = jwt.sign({ id: id}, config.secret, {
                        expiresIn: 86400
                    });
                    res.status(200).send(JSON.stringify({token: token, user_id:id}))
                }
            });
        }
    })
})