
const contenedor = document.getElementById('filtro-generos');

contenedor.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.closest('button')) {
        //Eliminamos la clase active a cualquier button que la tenga (importante el operador ternario):
        contenedor.querySelector('.btn--active')?.classList.remove('btn--active');

        //Agregamos la clase active al button que hacemos click:
        e.target.classList.add('btn--active');

    }
});