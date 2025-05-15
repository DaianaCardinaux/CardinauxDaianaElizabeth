let NombreUno, NombreDos
let ImagenUno, ImagenDos
let AtaqueUno = 0
let AtaqueDos = 0
let DefensaUno = 0
let DefensaDos = 0

document.getElementById('IngresoPokemon').addEventListener('click', 

async function() {
    let PokemonUno = document.getElementById('PokemonUno').value.toLowerCase();
    let PokemonDos = document.getElementById('PokemonDos').value.toLowerCase();

    console.log(PokemonUno)

    await PrimerPokemon(PokemonUno)
    await SegundoPokemon(PokemonDos)
    PokemonGanador(AtaqueUno, AtaqueDos, DefensaUno, DefensaDos)
})

let listaUno = document.getElementById('listaPokemonUno')

async function PrimerPokemon(IdPokemonUno) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${IdPokemonUno}`)
    const data = await response.json()

    NombreUno = document.getElementById('TituloPokemonUno').innerHTML = (data.name)
    ImagenUno = document.getElementById('ImagenPokemonUno').src = data.sprites.front_default

    let AtaqueLi = document.createElement('li')
    let DefensaLi = document.createElement('li')
    
    for (let i = 0; i < data.stats.length; i++) {

        if (data.stats[i].stat.name === 'attack') { 
            AtaqueLi.textContent = (' Daño: '+ data.stats[i].base_stat)
            listaUno.appendChild(AtaqueLi)
            
            AtaqueUno = data.stats[i].base_stat;
        }
    }

    for (let i = 0; i < data.stats.length; i++) {

        if (data.stats[i].stat.name === 'defense') { 
            DefensaLi.textContent = (' Defensa: '+ data.stats[i].base_stat)
            listaUno.appendChild(DefensaLi)

            DefensaUno = data.stats[i].base_stat;
        }        
    }
}

let listaDos = document.getElementById('listaPokemonDos')

async function SegundoPokemon(IdPokemonDos) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${IdPokemonDos}`)
    const data = await response.json()

    NombreDos = document.getElementById('TituloPokemonDos').innerHTML = (data.name)
    ImagenDos = document.getElementById('ImagenPokemonDos').src = data.sprites.front_default

    let AtaqueLi = document.createElement('li')
    let DefensaLi = document.createElement('li')
 
    for (let i = 0; i < data.stats.length; i++) {

        if (data.stats[i].stat.name === 'attack') { 
            AtaqueLi.textContent = (' Daño: '+ data.stats[i].base_stat)
            listaDos.appendChild(AtaqueLi)
            
            AtaqueDos = data.stats[i].base_stat;
        }
    }

    for (let i = 0; i < data.stats.length; i++) {
        
        if (data.stats[i].stat.name === 'defense') { 
            DefensaLi.textContent = (' Defensa: '+ data.stats[i].base_stat)
            listaDos.appendChild(DefensaLi)

            DefensaDos = data.stats[i].base_stat;
        }        
    }
}

let listaGanadora = document.getElementById('listaPokemonGanador')

function PokemonGanador(AtakUno, AtakDos, DefUno, DefDos) {

    let MayorUno = AtakUno - DefDos
    let MayorDos = AtakDos - DefUno

    let AtaqueLi = document.createElement('li')
    let DefensaLi = document.createElement('li')

    if (MayorUno > MayorDos) {
        document.getElementById('TituloPokemonGanador').innerHTML = (NombreUno)
        document.getElementById('ImagenPokemonGanador').src = (ImagenUno)
       
        AtaqueLi.textContent = (' Daño: '+ AtakUno)
        listaGanadora.appendChild(AtaqueLi)

        DefensaLi.textContent = (' Defensa: '+ DefUno)
        listaGanadora.appendChild(DefensaLi)

    } else if (MayorDos > MayorUno) {
        document.getElementById('TituloPokemonGanador').innerHTML = (NombreDos)
        document.getElementById('ImagenPokemonGanador').src = (ImagenDos)
       
        AtaqueLi.textContent = (' Daño: '+ AtakDos)
        listaGanadora.appendChild(AtaqueLi)
        
        DefensaLi.textContent = (' Defensa: '+ DefDos)
        listaGanadora.appendChild(DefensaLi)
    } else {
        document.getElementById('TituloPokemonGanador').innerHTML = ('EMPATE')
        document.getElementById('listaPokemonGanador').innerHTML = ('Elige otro pokemon')
        //POKEMON PARA EMPATE: 300 y 299
    }
}
