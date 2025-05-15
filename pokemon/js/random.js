let GrupoUno = document.getElementById('tarjetaUno')
let GrupoDos = document.getElementById('tarjetaDos')
let GrupoGanador = document.getElementById('tarjetaGanadora')
let TotalUno = document.getElementById('totalUno')
let TotalDos = document.getElementById('totalDos')
let TotalGanador = document.getElementById('totalGanador')

let pokemones = []
let SumaUno = {ataque: 0, defensa: 0}
let SumaDos = {ataque: 0, defensa: 0}

async function ObtenerPokemon() {
    for (let index = 0; index < 6; index++) {

        let numeroAleatorio = Math.floor(Math.random() * 500) + 1

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`)
        const data = await response.json()

        pokemones.push(data)
    }
}

function MostrarPokemon(pokemon, contenedor, suma) {

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

function MostrarTotal (contenedor, suma) {
    let totalAtaque = document.createElement('h4')
    totalAtaque.textContent = (`Total Ataque:  ${suma.ataque}`)

    let totalDefensa = document.createElement('h4')
    totalDefensa.textContent = (`Total Defensa:  ${suma.defensa}`)

    contenedor.appendChild(totalAtaque)
    contenedor.appendChild(totalDefensa)
}

function PokemonGrupoUno() {
    GrupoUnoArray = pokemones.slice(0 ,3)

    GrupoUnoArray.forEach(pokemon => {
        MostrarPokemon(pokemon, GrupoUno, SumaUno)
    })

    MostrarTotal(TotalUno, SumaUno)  
}

function PokemonGrupoDos() {
    GrupoDosArray = pokemones.slice(3 ,6)

    GrupoDosArray.forEach(pokemon => {
        MostrarPokemon(pokemon, GrupoDos, SumaDos)
    })

    MostrarTotal(TotalDos, SumaDos)
}

function Comparacion() {
    console.log(SumaUno.ataque - SumaDos.defensa)
    console.log(SumaDos.ataque - SumaUno.defensa)

    if ((SumaUno.ataque - SumaDos.defensa) > (SumaDos.ataque - SumaUno.defensa)){
        GrupoUnoArray.forEach(pokemon => {
            MostrarPokemon(pokemon, GrupoGanador, SumaUno)
        })

    } else {
        GrupoDosArray.forEach(pokemon => {
            MostrarPokemon(pokemon, GrupoGanador, SumaDos)
        })
    } 
}

async function Iniciar() {
    await ObtenerPokemon()
    PokemonGrupoUno()
    PokemonGrupoDos()
    Comparacion()
}

Iniciar()