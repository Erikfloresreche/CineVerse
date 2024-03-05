import cargarGeneros from "./cargarGeneros";
import cargarTitulos from "./cargarTitulos";
import fetchPopulares from "./fetchPopulares";


const filtroPelicula = document.getElementById('movie');
const filtroSerie = document.getElementById('tv');

filtroPelicula.addEventListener('click', async (e) => {
    e.preventDefault();
    //Cargamos los generos en la barra lateral.
    cargarGeneros('movie');

    //Obtenemos los resultados:
    const resultados = await fetchPopulares('movie');
    //Los cargamos en el DOM:
    cargarTitulos(resultados);
    //Eliminamos la clase activa del button series y se la damos al de peliculas al hacer click:
    filtroSerie.classList.remove('btn--active');
    filtroPelicula.classList.add('btn--active');
    //Accedemos dentro del div donde se encuentra el titulo de series populares y lo modificamos por peliculas populares al hacer click:
    document.querySelector('#populares .main__titulo').innerText = 'Peliculas Populares';

});

filtroSerie.addEventListener('click', async (e) => {
    e.preventDefault();
    //Cargamos los generos en la barra lateral.
    cargarGeneros('tv');

    //Obtenemos los resultados:
    const resultados = await fetchPopulares('tv');
    //Los cargamos en el DOM:
    cargarTitulos(resultados);
    //Eliminamos la clase activa del button peliculas y se la damos al de series al hacer click:
    filtroPelicula.classList.remove('btn--active');
    filtroSerie.classList.add('btn--active');
    //Accedemos dentro del div donde se encuentra el titulo de peliculas populares y lo modificamos por series populares al hacer click:
    document.querySelector('#populares .main__titulo').innerText = 'Series Populares';
});