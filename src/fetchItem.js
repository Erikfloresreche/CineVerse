

const fetchItem = async (id) => {
    //Obtenemos el id de los buttons de pelis y series para saber cual contiene la clase active;
    const tipo = document.querySelector('.main__filtros .btn--active').id;
    try{
        const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=20e30bb95771e47e9ff89a8de1e6c470&language=es-ESP`;
        const respuesta =  await fetch(url);
        const datos = await respuesta.json();
        return datos;
    }catch(err){
        console.log(err)
    }
};  

export default fetchItem;