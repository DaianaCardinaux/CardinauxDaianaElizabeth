// animacion de las tarjetas

let animacionElementos = document.querySelectorAll(".Tarjeta, .TituloPokemon, .listaPokemon");

document.getElementById('IngresoPokemon').addEventListener('click', 
    function() {     
        zoomTarjetas()
    }
)

document.getElementById('botonPelea').addEventListener('click', 
    function(){
        zoomTarjetas()
    }
)

function zoomTarjetas() {
    animacionElementos.forEach(
        function animacionTermporal(elemento) {
            elemento.classList.remove("animarZoom");
            void elemento.offsetWidth; //reiniciar la animacion
            elemento.classList.add("animarZoom"); 
        }
    )
}