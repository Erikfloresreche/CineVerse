import fetchGeneros from "./fetchGeneros";
import obtenerGenero from "./obtenerGenero";


const fetchPopulares = async (filtro = 'movie', pagina = '1') => {
    const tipo = filtro === 'movie' ? 'movie' : 'tv';
    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=20e30bb95771e47e9ff89a8de1e6c470&language=es-ESP&page=${pagina}&region=EU`;
   
    try{
        const res = await fetch(url);
        const datos = await res.json();
        const resultados = datos.results;

        const generos = await fetchGeneros();
        resultados.forEach((resultado) => {
            resultado.genero = obtenerGenero(resultado.genre_ids[0], generos);
        });


        return resultados;
    } catch(err){
        console.log(err)
    }
};

export default fetchPopulares;