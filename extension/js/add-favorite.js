//Fetching coins
window.addEventListener('load', function(evt) {
    let xhr = new XMLHttpRequest();
    let coinOptions = document.getElementById('coin')
    getToken(result => {
      xhr.open("GET", "http://localhost:4003/coins", true)
      xhr.setRequestHeader('x-access-token',result.token)
      xhr.send()
    })
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        let result = JSON.parse(xhr.responseText)
        result.coins.forEach(coin => {
          let el = document.createElement('option')
          el.value = coin
          coinOptions.appendChild(el)
          el.innerText = coin
        })
      }
    }
    // Form submission
  })
  