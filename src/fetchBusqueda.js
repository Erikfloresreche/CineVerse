import fetchGeneros from "./fetchGeneros";
import obtenerGenero from "./obtenerGenero";

const fetchBusqueda = async (pagina = 1) => {
    const tipo = document.querySelector('.main__filtros .btn--active')?.id;
    const idGenero = document.querySelector('#filtro-generos .btn--active')?.dataset.id || 28;
    const añoInicial = document.getElementById('años-min')?.value || 1950;
    const añoFinal = document.getElementById('años-max')?.value || 2024;
    
    let url;
    if(tipo === 'movie'){
        url = `https://api.themoviedb.org/3/discover/movie?api_key=20e30bb95771e47e9ff89a8de1e6c470&language=es-ESP&region=EU&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pagina}&release_date.gte=${añoInicial}&release_date.lte=${añoFinal}&with_genres=${idGenero}&with_watch_monetization_types=flatrate`;
    } else if (tipo === 'tv') {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=20e30bb95771e47e9ff89a8de1e6c470&language=es-ESP&sort_by=popularity.desc&first_air_date.gte=${añoInicial}&first_air_date.lte=${añoFinal}&page=${pagina}&timezone=America%2FNew_York&with_genres=${idGenero}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;
    }


    try{
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const resultados = datos.results;


        const generos = await fetchGeneros();
        resultados.forEach((resultado) => {
            resultado.genero = obtenerGenero(resultado.genre_ids[0], generos);
        });
        return resultados;

    }catch(err) {
        console.log(err);
    }

};

export default fetchBusqueda;