const botones = document.querySelectorAll('.pregunta');

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const respuesta = boton.nextElementSibling;

        if (respuesta.classList.contains('hidden')) {
            respuesta.classList.remove('hidden');
            respuesta.classList.add('visible');
        } else {
            respuesta.classList.remove('visible');
            respuesta.classList.add('hidden');
        }
    });
});