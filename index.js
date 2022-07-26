class Provincia {

    constructor(nombre, distancia, valorHotel, datoProvincia) {
        this.nombre = nombre;
        this.distancia = distancia;
        this.valorHotel = valorHotel;
        this.datoProvincia = datoProvincia;
    }

}

const provincias = [

    {
        nombre: "cordoba",
        distancia: 800,
        valorHotel: 1500,
        datoProvincia: "En Cordoba podes visitar Tras La Sierra, zona de montes y rios ideal para disfrutar en verano."
    },
    {
        nombre: "santa fe",
        distancia: 500,
        valorHotel: 1000,
        datoProvincia: "En Santa Fe capital, se encuentra el rio Parana. Tomate un Amargo Obrero en la ribera."
    },
    {
        nombre: "chubut",
        distancia: 900,
        valorHotel: 2500,
        datoProvincia: "Si visitas la provincia de Chubut entre los meses de septiembre a diciembre, podras ver ballenas francas australes nadando por las costas de Puerto Madryn."
    },
    {
        nombre: "rio negro",
        distancia: 1000,
        valorHotel: 3000,
        datoProvincia: "Rio Negro, una de las provincias con mas atractivos turisticos de la Patagonica. Algunos destinos imperdibles son: Bariloche, San Martin de los Andes, Villa La Angostura y muchos mas. "
    },

]

let provinciasAgregadas1 = []
let destinos = [];

let formulario;
let nombreIngresado;
let distaHotelIngresado;
let datoProvinciaIngresado;
let provinciaAgregada;
let costoTotal;

let formCalculadora;
let destino;
let presupuestoOtorgado;
let cantidadDias;

let btnEnvio;
let btnCalcular;
let btnHistorial; 

function inicializarElementos() {

    formulario = document.getElementById("formulario");
    nombreIngresado = document.getElementById("nombre");
    distanciaIngresada = document.getElementById("distancia");
    valorHotelIngresado = document.getElementById("valorhotel");
    datoProvinciaIngresado = document.getElementById("datocurioso");
    provinciaAgregada = document.getElementById("provinciaAgregada");

    formCalculadora = document.getElementById("formCalculadora");
    destino = document.getElementById("destino");
    presupuestoOtorgado = document.getElementById("presupuesto");
    cantidadDias = document.getElementById("dias");
    btnEnvio = document.getElementById("btnEnvio");
    btnCalcular = document.getElementById("btnCalcular");
    btnHistorial = document.getElementById("btnHistorial");
}

function inicializarPropiedades() {

    btnEnvio.addEventListener("click", (event) => validarFormulario(event));
    btnCalcular.addEventListener("click", calculadora);
    btnHistorial.addEventListener("click", (event) => mostrarEnDomProvinciasAgregadas(event));
}

function traslado(kilometros, valor) {

    let valorKilometro = kilometros * valor;
    return valorKilometro;
}

function hospedaje(dias, valor) {

    let valorHospedaje = dias * valor;
    return valorHospedaje;
}

function costoViaje(valorHospedaje, valorKilometro) {

    costo = valorHospedaje + valorKilometro;
    return costo;
}

function destinoPosible(presupuesto, costoTotal) {

    if (parseFloat(presupuesto) > parseFloat(costoTotal)) {
        viajePosible.innerHTML =
            "Con el presupuesto dado podras darte unas buenas vacaciones!"
        return true;
    } else {
        viajePosible.innerHTML =
            "Con el presupuesto dado quizas puedas probar con otro destino o ir menos dias"
        return false;
    }
}

function verDato(provincia) {

    let datoCheck = document.getElementById("verDato").checked;

    if (datoCheck === true) {
        let dato = provincia['datoProvincia'];
        datoConteiner.innerHTML =
            `<p><strong>Aqui mas info : </strong> ${dato}</p>`
        return dato = provincia['datoProvincia'];
    }
}

function calculadora(event) {

    resultados.innerHTML = ``
    viajePosible.innerHTML = ``
    datoConteiner.innerHTML = ``

    let destinoSeleccionado = destino.value;

    let presupuesto = presupuestoOtorgado.value;

    let dias = cantidadDias.value;

    const provinciaEncontrada = provincias.find(provincia => provincia.nombre === destinoSeleccionado.toLowerCase());

    if (provinciaEncontrada !== "", presupuesto !== "", dias !== "") {

        const valorKilometro = 50;
        let costoHotel = provinciaEncontrada['valorHotel'];
        let costoTraslado = traslado(provinciaEncontrada['distancia'], valorKilometro);
        let costoHospedaje = hospedaje(dias, costoHotel);
        let costoTotal = costoViaje(costoTraslado, costoHospedaje);

        // mostrarEnDomCalculadora(costoTotal);
        destinoPosible(presupuesto, costoTotal);
        verDato(provinciaEncontrada);
        mostrarAlert(costoTotal);
    } else {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos',
        })
    }

    formCalculadora.reset();
}

function mostrarAlert(costoTotal) {

    Swal.fire({

        title: 'Aqui tiene el resultado de tu calculo!',
        icon: 'info',
        text: `Costo aproximado:$ ${costoTotal}`,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
    })
}

function validarFormulario(event) {

    provinciaAgregada.innerHTML = '';
    event.preventDefault();
    let nombre = nombreIngresado.value;
    let distancia = parseFloat(distanciaIngresada.value);
    let valorHotel = parseFloat(valorHotelIngresado.value);
    let datoProvincia = datoProvinciaIngresado.value;
    if (nombre !== null, distancia !== null, valorHotel !== null){
        
        let provincia = new Provincia(
            nombre,
            distancia,
            valorHotel,
            datoProvincia
        );
        
        mostrarToastAprobado();
        provinciasAgregadas1.push(provincia)
        formulario.reset();
        almacenarProvinciasLS();
    } else {

        mostrarToastNoAprobado ();
    }
}

function almacenarProvinciasLS() {

    localStorage.setItem("provincias", JSON.stringify(provinciasAgregadas1));
}

function obtenerProvinciasAgregadas() {

    let destinosGuardados = localStorage.getItem("provincias");
    if (destinosGuardados !== null) {
        lugar = JSON.parse(destinosGuardados);
        destinos.push(lugar);
    }
    return destinos
}

function mostrarEnDomProvinciasAgregadas(event) {

    obtenerProvinciasAgregadas();
    event.preventDefault();
    console.log(destinos);
    for (i in destinos.length){

        listaProvincias.innerHTML =
        "<h2>Ultimo destino agregado: </h2>"
            individual = destinos[i];
            console.log(individual);
            nombreA = individual["nombre"];
            console.log(nombreA);
            listaProvincias.innerHTML =
                `<p><strong>Nombre: </strong> ${individual["nombre"]}</p>
            <p><strong>Distancia: </strong> ${individual["distancia"]}</p>
            <p><strong>Valor del Hotel: </strong> ${individual['valorHotel']}</p>
            <p><strong>Dato curioso: </strong> ${individual['datoProvincia']}</p>`
    }       
//Luis querido, logro que funcione todo hasta aca ( o eso creo). Sin embargo, no puedo hacer que imprima en pantalla, a traves del DOM todos los objetos. Solo imprime el ultimo, por
// lo que entiendo que esta sobre escribiendo. Sin embargo, el innerHTML esta adentro del for. Seguro hay algo que no entendi. Podrias explicarme como hacer para que, tal cual aparece uno
//solo aparezcan todos los objetos del DOM. Gracias
}

function mostrarToastAprobado() {
    
    Toastify({
        text: "Gracias por tu recomendacion!",
        duration: 3000,
        close: true,
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
    
}

function mostrarToastNoAprobado () {

    Toastify({
        text: "This is a toast",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

function main() {

    inicializarElementos();
    inicializarPropiedades();
}

main();