const pusher = new Pusher('35d2b602fcec5b9c8edf', {
  cluster: 'eu',
  encrypted: true
});

let channel = pusher.subscribe('cryptowatcher');
channel.bind('prices', (data) => {
    let priceLists = ""
    let obj = JSON.parse(data.update)
    Object.keys(obj).forEach((key, index) => {
        priceLists += `<li>${key}: </br>`
        let currencies = obj[key]
        let currencyList = "<ul>"
        Object.keys(currencies).forEach( (currency, index) => {
            currencyList += `<li>${currency} : ${currencies[currency]}</li>`
        });

            currencyList += "</ul>"
            priceLists += `${currencyList}</li>`
    });
    document.getElementById('crypto-prices').innerHTML = priceLists
})