

const fetchGeneros = async (filtro = 'movie') => {

    const tipo = filtro === 'movie' ? 'movie' : 'tv';
    const url = `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=20e30bb95771e47e9ff89a8de1e6c470&language=es-ESP`;

    try{
        const res = await fetch(url);
        const datos = await res.json();
        return datos.genres;
    } catch(err){
        console.log(err);
    }
};

export default fetchGeneros;