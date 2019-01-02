"use strict";

const Pusher = require('pusher')
const https = require('https');
const config = require('./config')
const cryptos = require('./cryptos.json')
const pusher = new Pusher(config)

//Calling the Cryptocompare API

setInterval(() => {
    https.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${cryptos.coins.join()}&tsyms=${cryptos.currencies.join()}`, (response) => {
        response.setEncoding('utf8')
        .on('data', data => handleResponse(data))
        .on('error', e => console.error(e.message))
    })
}, 10000)

//Defining handleResponse
let handleResponse = data => {
    pusher.trigger('cryptowatcher', 'prices', {
        "update": data
    });
}

https.createServer().listen(process.env.PORT || 8080)