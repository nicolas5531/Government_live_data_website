// var URL_GET = 'https://api.propublica.org/congress/v1/113/senate/members.json';
// var API_KEY = 'bstQMPJjcTZEeWFdAZe07vRAfmPEZUWNB9B9Dwb1';

// //Realiza el pedido del JSON al servidor de propublica
// fetch(URL_GET, {              ////////1° LE PIDO AL SERVIDOR QUE HAGA ALGO
//   method: 'GET',                            /////// EJECUTO LA ACCION QUE QUIERO REALIZAR CON LA API O BASE DE DATOS por defecto es get asi q podria no poner method e igual funciona.
//   headers: {                                ///////
//     'X-API-KEY': API_KEY                    /////// ENVIO LA LLAVE PARA ACCEDER A LA API CADA API ES UN MUNDO DIFERENTE HAY QUE LEER LA DOCUMENTACION PARA VER LAS CONDICIONES y que propiedad hay que aplicar, en este caso "x-api-key"
//   }
// }).then(function (response) {               ////// 2° REALIZO UNA PETICION que recibe una funcion anonima dentro de la funcion un parametro que nos inventemos que sea una definicion de lo que recibo del servidor o base de datos
//   if(response.ok){                          ////// Tengo que trabajar la respuesta si la respuesta esta bien me trae el json que estoy pidiendo
//     return response.json();
//   }
//   //else{                                  //// Si el if da falso pasa al error de else
//     //trow new Error(response.status)
//   //}
// })
// .then(function(data){
//   app.members = data.results[0].members;
// })
// .catch(function (error) {                 ///////3° Si no es exitoso mando una respuesta
//   console.log('Looks like there was a problem: \n', error);
// });



///STATUS EN CONSOLE.LOG

//200 CODIGO DE EXITO OPERACION EXITOSA
//201 CREACION EXITOSA

//300 REDIRECCIONAMIENTO

//400 ERRORES DEL LADO DEL CLIENTE  BAD REQUEST "PEDISTE MAL LOS RECURSOS"
//401 NO ESTAS AUTORIZADO
//403 Forbidden o prohibido o non proxy
//404 Not found

//500 ERRORES DEL LADO DEL SERVIDOR "INTERNAL SERVER ERROR" base de datos corrompida.