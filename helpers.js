//Configurations
const Pusher = require('pusher')
const config = require('./config')
const https = require('https')
const pusher = new Pusher(config)


//functions
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next();
}

let fetchCoins = (url, handler, event=false) => {
    setInterval(() => {
        https.get(url, response => {
            response.setEncoding('utf8')
            .on('data', data => event? handler(Data, event) : handler(data))
            .on('error', e => console.error(e.message))
        })

    }, 1000)
}

//Response Handlers
let handleResponse = (data) => {
    pusher.trigger('cryptowatch', 'prices', {
        "update":data
    });
}

let handleFavoriteResponse = (data, event) => {
    pusher.trigger('cryptowatch', event, {
        "update":data
    });
}