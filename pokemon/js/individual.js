let nombreUno, nombreDos
let imagenUno, imagenDos
let ataqueUno = 0
let ataqueDos = 0
let defensaUno = 0
let defensaDos = 0


document.getElementById('IngresoPokemon').addEventListener('click', 

async function() {
    let pokemonUno = document.getElementById('PokemonUno').value.toLowerCase();
    let pokemonDos = document.getElementById('PokemonDos').value.toLowerCase();

    console.log(pokemonUno)

    await primerPokemon(pokemonUno)
    await segundoPokemon(pokemonDos)
    pokemonGanador(ataqueUno, ataqueDos, defensaUno, defensaDos)
})

let listaUno = document.getElementById('listaPokemonUno')

async function primerPokemon(idPokemonUno) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemonUno}`)
    const data = await response.json()

    nombreUno = document.getElementById('TituloPokemonUno').innerHTML = (data.name)
    imagenUno = document.getElementById('ImagenPokemonUno').src = data.sprites.front_default

    let ataqueLista = document.createElement('li')
    let defensaLista = document.createElement('li')
    
    for (let i = 0; i < data.stats.length; i++) {

        if (data.stats[i].stat.name === 'attack') { 
            listaUno.innerHTML = ''

            ataqueLista.textContent = (' Daño: '+ data.stats[i].base_stat)
            listaUno.appendChild(ataqueLista)
            
            ataqueUno = data.stats[i].base_stat;
        }
    }

    for (let i = 0; i < data.stats.length; i++) {

        if (data.stats[i].stat.name === 'defense') { 
            defensaLista.textContent = (' Defensa: '+ data.stats[i].base_stat)
            listaUno.appendChild(defensaLista)

            defensaUno = data.stats[i].base_stat;
        }        
    }
}

let listaDos = document.getElementById('listaPokemonDos')

async function segundoPokemon(idPokemonDos) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemonDos}`)
    const data = await response.json()

    nombreDos = document.getElementById('TituloPokemonDos').innerHTML = (data.name)
    imagenDos = document.getElementById('ImagenPokemonDos').src = data.sprites.front_default

    let ataqueLista = document.createElement('li')
    let defensaLista = document.createElement('li')
 
    for (let i = 0; i < data.stats.length; i++) {

        if (data.stats[i].stat.name === 'attack') { 
            listaDos.innerHTML = ''

            ataqueLista.textContent = (' Daño: '+ data.stats[i].base_stat)
            listaDos.appendChild(ataqueLista)
            
            ataqueDos = data.stats[i].base_stat;
        }
    }

    for (let i = 0; i < data.stats.length; i++) {
        
        if (data.stats[i].stat.name === 'defense') {
            defensaLista.textContent = (' Defensa: '+ data.stats[i].base_stat)
            listaDos.appendChild(defensaLista)

            defensaDos = data.stats[i].base_stat;
        }        
    }
}

let listaGanadora = document.getElementById('listaPokemonGanador')

function pokemonGanador(datoAtaqueUno, datoAtaqueDos, datoDefensaUno, datoDefensaDos) {

    let mayorUno = datoAtaqueUno - datoDefensaDos
    let mayorDos = datoAtaqueDos - datoDefensaUno

    let ataqueLista = document.createElement('li')
    let defensaLista = document.createElement('li')

    if (mayorUno > mayorDos) {
        listaGanadora.innerHTML = ''

        document.getElementById('TituloPokemonGanador').innerHTML = (nombreUno)
        document.getElementById('ImagenPokemonGanador').src = (imagenUno)
       
        ataqueLista.textContent = (' Daño: '+ datoAtaqueUno)
        listaGanadora.appendChild(ataqueLista)

        defensaLista.textContent = (' Defensa: '+ datoDefensaUno)
        listaGanadora.appendChild(defensaLista)

    } else if (mayorDos > mayorUno) {
        listaGanadora.innerHTML = ''

        document.getElementById('TituloPokemonGanador').innerHTML = (nombreDos)
        document.getElementById('ImagenPokemonGanador').src = (imagenDos)
       
        ataqueLista.textContent = (' Daño: '+ datoAtaqueDos)
        listaGanadora.appendChild(ataqueLista)
        
        defensaLista.textContent = (' Defensa: '+ datoDefensaDos)
        listaGanadora.appendChild(defensaLista)
    } else {
        document.getElementById('TituloPokemonGanador').innerHTML = ('EMPATE')
        document.getElementById('listaPokemonGanador').innerHTML = ('Elige otro pokemon')
        //POKEMON PARA EMPATE: 300 y 299
    }
}
