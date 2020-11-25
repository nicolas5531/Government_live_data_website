var URL_GET = 'https://api.propublica.org/congress/v1/113/house/members.json';
var API_KEY = 'bstQMPJjcTZEeWFdAZe07vRAfmPEZUWNB9B9Dwb1';

                                                        //Realiza el pedido del JSON al servidor de propublica ESTO ES FETCH
var promise = fetch(URL_GET, {
  method: 'GET',
  headers: {
    'X-API-KEY': API_KEY
  }
}).then(function (response) {                                 /////// ES UN OBJETO QUE ME DEVUELVE EL SERVIDOR CON LA ESTRUCTURA QUE TENGA
  if(response.ok){
    return response.json();
  }

}).catch(function (error) {                                     //////SI EL SERVIDOR FALLA APARECE ESTE CARTEL
  console.log('Looks like there was a problem: \n', error);
});