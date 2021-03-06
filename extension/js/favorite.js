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


  window.addEventListener('load', function(evt) {
    let xhr = new XMLHttpRequest();
    getToken(function(result) {
      xhr.open("GET", 'http://localhost:4003/favorite', true);
      xhr.setRequestHeader('x-access-token',result.token)
      xhr.send();
    })
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        let res = JSON.parse(xhr.responseText)
        if(res.event) handleBinding(res.event)
        else document.getElementById('crypto-prices').innerHTML = res.message
      }
    }
  })