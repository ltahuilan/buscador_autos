//variables
const resultado = document.getElementById('resultado');
const marca = document.getElementById('marca');
const year = document.getElementById('year');
const minimo = document.getElementById('minimo');
const maximo = document.getElementById('maximo');
const puertas = document.getElementById('puertas');
const transmision = document.getElementById('transmision');
const color = document.getElementById('color');

const yearMax = new Date().getFullYear();
const yearMin = yearMax - 10;

const filtros = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}


//event listeners
eventsListeners();
function eventsListeners() {
    getAutos(autos);
    llenarYear();
}

marca.addEventListener('change', (event) => {
    filtros.marca = event.target.value;
    filtrarAutos();
});
year.addEventListener('change', (event) => {
    filtros.year = parseInt( event.target.value );
    filtrarAutos();
});
minimo.addEventListener('change', (event) => {
    filtros.minimo = parseInt( event.target.value );
    filtrarAutos();
});
maximo.addEventListener('change', (event) => {
    filtros.maximo = event.target.value;
    filtrarAutos();
});
puertas.addEventListener('change', (event) => {
    filtros.puertas = parseInt(event.target.value);
    filtrarAutos();
}); 
transmision.addEventListener('change', (event) => {
    filtros.transmision = event.target.value;
    filtrarAutos();
});
color.addEventListener('change', (event) => {
    filtros.color = event.target.value;
    console.log(filtros);
    filtrarAutos();
});

//funciones
function getAutos(autos) {
    limpiarHTML();
    autos.forEach( auto => {
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;

        const p = document.createElement('p');
        p.textContent = `
            ${marca} ${modelo} - 
            ${year} - 
            Precio: ${precio} - 
            Puertas: ${puertas} - 
            Color: ${color} - 
            Transmision: ${transmision}
        `;

        resultado.appendChild(p);
    });
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarYear() {
    for(i = yearMax; i >=yearMin; i--) {
        const option = document.createElement('OPTION');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

function filtrarAutos() {    
    const filtro = autos
        .filter(filtrarMarca)
        .filter(filtrarYear)
        .filter(filtrarMin)
        .filter(filtrarMax)
        .filter(filtrarPuertas)
        .filter(filtrarTransmision)
        .filter(filtrarColor);

    if(filtro.length === 0) {
        limpiarHTML();
        const alerta = document.createElement('DIV');
        alerta.classList.add('alerta', 'error');
        alerta.textContent = 'No se encontraron resultados con las características seleccionadas';
        resultado.appendChild(alerta);
        return;
    }

    getAutos(filtro);
}

//el parametro autos se pasa automaticamente en la llamada desde filter()
function filtrarMarca(autos) {
    if(filtros.marca) {
        return autos.marca === filtros.marca;
    }
    return autos;
    // console.log(autos);
}

function filtrarYear(autos) {
    if(filtros.year) {
        return autos.year === filtros.year;
    }
    return autos;
}

function filtrarMin(autos) {
    if(filtros.minimo) {
        return autos.precio >= filtros.minimo;
    }
    return autos;
}

function filtrarMax(autos) {
    if(filtros.maximo) {
        return autos.precio <= filtros.maximo;
    }
    return autos;
}

function filtrarPuertas(autos) {
    if(filtros.puertas) {
        return autos.puertas === filtros.puertas;
    }
    return autos;
}

function filtrarTransmision(autos) {
    if(filtros.transmision) {
        return autos.transmision === filtros.transmision;
    }
    return autos;
}

function filtrarColor(autos) {
    if(filtros.color) {
        return autos.color === filtros.color;
    }
    return autos;
}
