//-------------- ACLARACION ---------------

// GrupoUno = GrupoA
// GrupoDos = GrupoB

// ----------------------------------------

let grupoUno = document.getElementById('tarjetaUno')
let grupoDos = document.getElementById('tarjetaDos')
let grupoGanador = document.getElementById('tarjetaGanadora')
let totalUno = document.getElementById('totalUno')
let totalDos = document.getElementById('totalDos')
let totalGanador = document.getElementById('totalGanador')
let tituloGanador = document.getElementById('tituloEquipoGanador')

let pokemones = []
let total = {equipoUno: 0, equipoDos:0}
let sumaUno = {ataque: 0, defensa: 0}
let sumaDos = {ataque: 0, defensa: 0}

async function obtenerPokemon() {
    for (let index = 0; index < 6; index++) {

        let numeroAleatorio = Math.floor(Math.random() * 500) + 1

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`)
        const data = await response.json()

        pokemones.push(data)
    }
}

function mostrarPokemon(pokemon, contenedor, suma) {

    let tarjeta = document.createElement('div')
    tarjeta.classList.add('tarjetaPokemon')

    let nombrePokemon = document.createElement('h2')
    nombrePokemon.textContent = pokemon.name

    
    let imagenPokemon = document.createElement('img')
    imagenPokemon.src = pokemon.sprites.front_default

    let ataquePokemon = document.createElement('h3')
    let defensaPokemon = document.createElement('h3')

    for (let i = 0; i < pokemon.stats.length; i++) {
        if (pokemon.stats[i].stat.name === 'attack') {
            ataquePokemon.textContent = `ataque: ${pokemon.stats[i].base_stat}` 
            suma.ataque = suma.ataque + pokemon.stats[i].base_stat
        }   
    }

    for (let i = 0; i < pokemon.stats.length; i++) {
        if (pokemon.stats[i].stat.name === 'defense') {
            defensaPokemon.textContent = ` defensa: ${pokemon.stats[i].base_stat}` 
            suma.defensa = suma.defensa + pokemon.stats[i].base_stat
        }   
    }

    tarjeta.appendChild(nombrePokemon)
    tarjeta.appendChild(imagenPokemon)
    tarjeta.appendChild(ataquePokemon)
    tarjeta.appendChild(defensaPokemon)

    contenedor.appendChild(tarjeta)
}

function mostrarTotal (contenedor, suma) {
    let totalAtaque = document.createElement('h4')
    totalAtaque.textContent = (`Total Ataque:  ${suma.ataque}`)

    let totalDefensa = document.createElement('h4')
    totalDefensa.textContent = (`Total Defensa:  ${suma.defensa}`)

    contenedor.appendChild(totalAtaque)
    contenedor.appendChild(totalDefensa)
}

function pokemonGrupoUno() {
    grupoUnoArray = pokemones.slice(0 ,3)

    grupoUnoArray.forEach(
        function(pokemon) {
            mostrarPokemon(pokemon, grupoUno, sumaUno)
        }
    )

    mostrarTotal(totalUno, sumaUno)  
}

function pokemonGrupoDos() {
    grupoDosArray = pokemones.slice(3 ,6)

    grupoDosArray.forEach(
        function(pokemon) {
            mostrarPokemon(pokemon, grupoDos, sumaDos)
        }
    )

    mostrarTotal(totalDos, sumaDos)
}

function mostrarGanador(contenedorGanador, mensaje) {
    let equipoGanador = document.createElement('h2')
        equipoGanador.classList.add('tituloGanadorEstilo')
        equipoGanador.textContent = (mensaje)

        contenedorGanador.appendChild(equipoGanador)
}

function mostrarDiferencia(contenedorDiferencia, mensajeUno, mensajeDos) {
    let diferenciaEquipoUno = document.createElement('h4')
        diferenciaEquipoUno.textContent = (mensajeUno)

    let diferenciaEquipoDos = document.createElement('h4')
        diferenciaEquipoDos.textContent = (mensajeDos)

    contenedorDiferencia.appendChild(diferenciaEquipoUno)
    contenedorDiferencia.appendChild(diferenciaEquipoDos)
}



document.getElementById('botonPelea').addEventListener('click', 
    
    function(){
        total.equipoUno = sumaUno.ataque - sumaDos.defensa
        total.equipoDos = sumaDos.ataque - sumaUno.defensa

            if ((total.equipoUno) > (total.equipoDos)){
                mostrarGanador(tituloGanador, 'EQUIPO A')
                    grupoUnoArray.forEach( 
                        function(pokemon) {
                            mostrarPokemon(pokemon, grupoGanador, sumaUno)
                    }
            )

            } else {
                mostrarGanador(tituloGanador, 'EQUIPO B')
                    grupoDosArray.forEach( 
                        function(pokemon) {
                            mostrarPokemon(pokemon, grupoGanador, sumaDos)
                    }
            )
        } 

        mostrarDiferencia(totalGanador, `Puntos Equipo A: ${total.equipoUno}`, `Puntos Equipo B: ${total.equipoDos}`)

        console.log (total.equipoUno)
        console.log(total.equipoDos)
    }
)

async function iniciar() {
    await obtenerPokemon()
    pokemonGrupoUno()
    pokemonGrupoDos()
}

iniciar()