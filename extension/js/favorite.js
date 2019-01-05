const pusher = new Pusher('35d2b602fcec5b9c8edf', {
    cluster: 'eu',
    encrypted: true
  });
  
  function handleBinding(event){
    let channel = pusher.subscribe('cryptowatch');
    channel.bind(event, (data) => {
      let priceLists = ""
      let obj = JSON.parse(data.update)
      Object.keys(obj).forEach( (key, index) => {
         priceLists += `<li>${key}: </br>`
         let currencies = obj[key]
         let currencyLists = "<ul>"
         Object.keys(currencies).forEach( (currency, index) => {
           currencyLists += `<li>${currency} : ${currencies[currency]}</li>`
         });
         currencyLists += "</ul>"
         priceLists += `${currencyLists}</li>`
       });
       document.getElementById('crypto-prices').innerHTML = priceLists
    });
  }