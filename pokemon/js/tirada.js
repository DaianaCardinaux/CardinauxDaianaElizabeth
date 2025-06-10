// falta poner quien es el equipo ganador las estadisticas
// quien es el ganador (equipo), (tirada), (cuanto queda con ataque),
// y de (defensa)

let tiradaUno = []
let tiradaDos = []
let cantidadTiradasUno = 0
let cantidadTiradasDos = 0

let numeroRandomUno = 0
let numeroRandomDos = 0

let botonUno = document.getElementById('tiradaUno')
let botonDos = document.getElementById('tiradaDos')

let contenedorDadoUno = document.getElementById('dadoUno')
let contenedorDadoDos = document.getElementById('dadoDos')

let botonBatalla = document.getElementById('botonPelea')

let tiradaResultado = document.getElementById('resultadoTirada')

let muestraResultadoUno = document.getElementById('muestraUno')
let muestraResultadoDos = document.getElementById('muestraDos')

function PrimeraTirada(){
    numeroRandomUno = Math.floor(Math.random() * 6) + 1
    numeroRandomDos = Math.floor(Math.random() * 6) + 1 

    console.log('num Uno '+ numeroRandomUno + ' num dos '+ numeroRandomDos)
    console.log('tiradas uno: ', tiradaUno, ' d ', tiradaDos)

    return [numeroRandomUno, numeroRandomDos]
}


function dados(contenedor, numeroRandomUno, numeroRandomDos){
    contenedor.innerHTML = ' '

    let dadoUno = document.createElement('div')
        dadoUno.classList.add('dadoEstilo')

    let numeroDadoUno = document.createElement('h1')
        numeroDadoUno.textContent = numeroRandomUno
        dadoUno.appendChild(numeroDadoUno)

    let dadoDos = document.createElement('div')
        dadoDos.classList.add('dadoEstilo')

    let numeroDadoDos = document.createElement('h1')
        numeroDadoDos.textContent = numeroRandomDos
        dadoDos.appendChild(numeroDadoDos)

    contenedor.appendChild(dadoUno)
    contenedor.appendChild(dadoDos)
}

function resultadoDado(contenedorResultado, mayorUno, mayorDos, desempate){
    contenedorResultado.innerHTML = ' '

    let resultadoTirada = document.createElement('div')
        resultadoTirada.classList.add('resultadoDadosEstilo')

    let tiradaUnoResultado = document.createElement('h1')
        tiradaUnoResultado.textContent = `Tirada mayor de equipo A: ${mayorUno}`
        resultadoTirada.appendChild(tiradaUnoResultado)

    let tiradaDosResultado = document.createElement('h1')
        tiradaDosResultado.textContent = `Tirada mayor de equipo B: ${mayorDos}`
        resultadoTirada.appendChild(tiradaDosResultado)

    let empateTiradas = document.createElement('h1')
        empateTiradas.classList.add('empateEstilo')
        empateTiradas.textContent = (`Equipo ganador por tirada, en caso de empate: ${desempate}`)
        resultadoTirada.appendChild(empateTiradas)

    contenedorResultado.appendChild(resultadoTirada)
}

botonUno.addEventListener('click', function () {
    PrimeraTirada()

    tiradaUno.push(numeroRandomUno + numeroRandomDos)

    dados(contenedorDadoUno, numeroRandomUno, numeroRandomDos)

    cantidadTiradasUno++

        if (cantidadTiradasUno >= 3) {
            botonUno.disabled = true

            let mostrar = document.createElement('h5')
                mostrar.classList.add('mostrarEstilo')
                mostrar.textContent = 'Resultado Tiradas: '+ tiradaUno
                muestraResultadoUno.appendChild(mostrar)
        } 
    } 
)

botonDos.addEventListener('click', function () {
    PrimeraTirada()

    tiradaDos.push(numeroRandomUno + numeroRandomDos)
    
    dados(contenedorDadoDos, numeroRandomUno, numeroRandomDos)

        cantidadTiradasDos++

        if (cantidadTiradasDos >= 3) {
            botonDos.disabled = true
            botonUno.disabled = true

            let mostrar = document.createElement('h5')
                mostrar.classList.add('mostrarEstilo')
                mostrar.textContent = 'Resultado Tiradas: '+ tiradaDos
                muestraResultadoDos.appendChild(mostrar)
        } 

        if (botonUno.disabled && botonDos.disabled) {
            botonBatalla.disabled = false;
        }
    }
)

botonBatalla.disabled = true

let tiradaMayor

botonBatalla.addEventListener('click', function(){

    let mayorTiradaUno = Math.max(...tiradaUno)
    let mayorTiradaDos = Math.max(...tiradaDos)

    if (mayorTiradaUno > mayorTiradaDos) {
        resultadoDado(tiradaResultado, mayorTiradaUno, mayorTiradaDos, 'EQUIPO A')
    } else {
        resultadoDado(tiradaResultado, mayorTiradaUno, mayorTiradaDos, 'EQUIPO B')
    }


    console.log('mayor uno ', mayorTiradaUno)
    console.log('mayor dos ', mayorTiradaDos)
})



      


