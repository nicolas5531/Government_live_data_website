var URL_GET = 'https://api.propublica.org/congress/v1/113/senate/members.json';
if (document.title.includes("House")) {
    var URL_GET = 'https://api.propublica.org/congress/v1/113/house/members.json';
}
var API_KEY = 'bstQMPJjcTZEeWFdAZe07vRAfmPEZUWNB9B9Dwb1';

//Realiza el pedido del JSON al servidor de propublica
fetch(URL_GET, { ////////1° LE PIDO AL SERVIDOR QUE HAGA ALGO
        method: 'GET', /////// EJECUTO LA ACCION QUE QUIERO REALIZAR CON LA API O BASE DE DATOS por defecto es get asi q podria no poner method e igual funciona.
        headers: { ///////
            'X-API-KEY': API_KEY /////// ENVIO LA LLAVE PARA ACCEDER A LA API CADA API ES UN MUNDO DIFERENTE HAY QUE LEER LA DOCUMENTACION PARA VER LAS CONDICIONES y que propiedad hay que aplicar, en este caso "x-api-key"
        }
    }).then(function (response) { ////// 2° REALIZO UNA PETICION que recibe una funcion anonima dentro de la funcion un parametro que nos inventemos que sea una definicion de lo que recibo del servidor o base de datos
        if (response.ok) { ////// Tengo que trabajar la respuesta si la respuesta esta bien me trae el json que estoy pidiendo
            return response.json();
        }
        //else{                                  //// Si el if da falso pasa al error de else
        //trow new Error(response.status)
        //}
    })
    .then(function (data) {
        app.members = data.results[0].members;
        start(app.members);
    })
    .catch(function (error) { ///////3° Si no es exitoso mando una respuesta
        console.log('Looks like there was a problem: \n', error);
    });

let app = new Vue({ ////Llamo a toda la libreria que estamos llamando en el script de vue en el html
    el: "#app",
    data: {
        members: [],
        filterAndMemb: [],
        partidos: "all",
        statistics: {
            numeroRepublicanos: 0,
            numeroDemocratas: 0,
            numeroIndependientes: 0,
            totalNum: 0,
            promedioVotosRepublicanos: 0,
            promedioVotosDemocratas: 0,
            promedioVotosIndependientes: 0,
            totalPromedio: 0,
            votantesMenosComprometidos: [],
            votantesMasComprometidos: [],
            mostEngaged: [],
            leastEngaged: [],
        },
        ////Todas las variables que necesitemos las podemos crear dentro de data.
    },
    methods: {
        filterByParty() {
            this.filterAndMemb = this.members.filter(e => this.partidos == (e.party) || this.partidos == "all")

        },
        ordenar(reverse) {
            this.filterAndMemb = this.filterAndMemb.sort((a, b) => a["votes_with_party_pct"] - b["votes_with_party_pct"]); //ORDENA EL ARRAY
            if (reverse) {
                this.filterAndMemb = this.filterAndMemb.reverse();
            };
        },
        ordenar2(reverse) {
            this.filterAndMemb = this.filterAndMemb.sort((a, b) => a["seniority"] - b["seniority"]); //ORDENA EL ARRAY
            if (reverse) {
                this.filterAndMemb = this.filterAndMemb.reverse();
            };
        },
        numMiembros() { /////////////// NUMERO DE MIEMBROS POR PARTIDO ///////////////////
            let democratas = this.members.filter(this.demofilt);
            let republicanos = this.members.filter(this.repufilt);
            let independientes = this.members.filter(this.indepfilt);
            this.statistics.numeroDemocratas = democratas.length; //si o si tiene que estar debajo de la funcion ya que es lo que se ejecuta primero.
            this.statistics.numeroRepublicanos = republicanos.length;
            this.statistics.numeroIndependientes = independientes.length;
            this.statistics.totalNum = (app.statistics.numeroDemocratas + this.statistics.numeroRepublicanos + this.statistics.numeroIndependientes || "0");
        },
        votosPorPartido() {
            ////////////// PORCENTAJE DE VOTOS POR PARTIDO /////////////////////////////
            let democratas = this.members.filter(this.demofilt);
            let republicanos = this.members.filter(this.repufilt);
            let independientes = this.members.filter(this.indepfilt);
            suma = this.sumatoria(democratas);
            this.statistics.promedioVotosDemocratas = Math.round((suma / democratas.length) * 100) / 100;
            suma = 0;
            suma = this.sumatoria(republicanos);
            this.statistics.promedioVotosRepublicanos = Math.round((suma / republicanos.length) * 100) / 100;
            suma = 0;
            suma = this.sumatoria(independientes);
            this.statistics.promedioVotosIndependientes = Math.round((suma / independientes.length || "0") * 100) / 100;
            this.statistics.totalPromedio = Math.round((this.statistics.promedioVotosIndependientes + this.statistics.promedioVotosRepublicanos + this.statistics.promedioVotosDemocratas) * 100) / 100;
        },
        compromisoYlealtad() {
            this.statistics.votantesMenosComprometidos = this.lealtadYvotPerdidos(this.members, false, "votes_with_party_pct");
            this.statistics.votantesMasComprometidos = this.lealtadYvotPerdidos(this.members, true, "votes_with_party_pct"); ////////////// VOTANTES MAS COMPROMETIDOS CON EL PARTIDO /////////////////////////////
            this.statistics.mostEngaged = this.lealtadYvotPerdidos(this.members, false, 'missed_votes_pct'); ////////////// MIEMBROS QUE HAN PERDIDO MENOS VOTOS /////////////////////////////
            this.statistics.leastEngaged = this.lealtadYvotPerdidos(this.members, true, 'missed_votes_pct'); ////////////// MIEMBROS QUE HAN PERDIDO MENOS VOTOS /////////////////////////////
        },
        lealtadYvotPerdidos(integrantes, reverse, propiedad) { ////////////// LELTAD/DEASLALTAD/VOTOS PERDIDOS ///////////////
            integrantes.sort((a, b) => a[propiedad] - b[propiedad]); //ORDENA EL ARRAY
            if (reverse) {
                integrantes.reverse()
            };
            let diezmo = (integrantes.length * 10) / 100; // Sacar el 10%
            let porcEntero = Math.round(diezmo); //Funcion para pasar a numero entero uno decimal
            let dieses = integrantes.slice(0, porcEntero); // Guardo solo los objetos del 0 al 11 o sea el 10% de miembros.lenght
            return dieses;
        },
        sumatoria(members) { ////// FUNCIONES ANALOGAS PARA USO DE FUNCIONES DE ORDEWN SUPERIOR/////////////
            let suma = 0;
            members.forEach(element => {
                suma += element.votes_with_party_pct;
            });
            return suma;
        },
        demofilt(tipos) { //solo es una configuracion de filtrado, puede estar en cualquier lado.
            return (tipos.party === "D");
        },
        repufilt(tipos) {
            return (tipos.party === "R");
        },
        indepfilt(tipos) {
            return (tipos.party === "ID");
        },
    },
})

function start() {
    app.numMiembros();
    app.votosPorPartido();
    app.compromisoYlealtad();
    app.filterByParty();
}