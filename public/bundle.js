'use strict';

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

const obtenerGenero = (id, generos) => {
    let nombre;
    generos.forEach((elemento) => {
        if(id === elemento.id){
            nombre = elemento.name;
        }
    });

    return nombre;
};

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
        console.log(err);
    }
};

const cargarTitulos = (resultados) => {
    const contenedor = document.querySelector('#populares .main__grid');
    //Reiniciamos los resultados antes de cargarlos:
    contenedor.innerHTML = '';

    //Por cada resultado quiero crear una plantilla:
    resultados.forEach((resultado) => {
        //La plantilla nos sirve para cada uno de los elementos que mostramos:
    const plantilla = `	
    <div class="main__media" data-id="${resultado.id}">
        <a href="#" class="main__media-thumb">
        <img class="main__media-img" src="
        https://image.tmdb.org/t/p/w500/${resultado.poster_path}" alt="" />
        </a>
        <p class="main__media-titulo">${resultado.title || resultado.name}</p>
        <p class="main__media-fecha">${resultado.genero}</p>
    </div>`;
    contenedor.insertAdjacentHTML('beforeend', plantilla);
    }); 
};

const contenedorGeneros = document.getElementById('filtro-generos');

const cargarGeneros = async (filtro) => {

    const generos = await fetchGeneros(filtro);
    contenedorGeneros.innerHTML = '';
    
    generos.forEach((genero) => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerText = genero.name;
        btn.setAttribute('data-id', genero.id);
        contenedorGeneros.appendChild(btn);
    });
};

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

const contenedor$1 = document.getElementById('filtro-generos');

contenedor$1.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.closest('button')) {
        //Eliminamos la clase active a cualquier button que la tenga (importante el operador ternario):
        contenedor$1.querySelector('.btn--active')?.classList.remove('btn--active');

        //Agregamos la clase active al button que hacemos click:
        e.target.classList.add('btn--active');

    }
});

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

const btn = document.getElementById('btn-buscar');

btn.addEventListener('click', async (e) => {
    const resultados = await fetchBusqueda();
    cargarTitulos(resultados);
});

const anterior = document.getElementById('pagina-anterior');
const siguiente = document.getElementById('pagina-siguiente');

siguiente.addEventListener('click', async (e) => {
    e.preventDefault();
    const paginaActual = document.getElementById('populares').dataset.pagina;
    
    try{
       const resultados = await fetchBusqueda(paginaActual + 1 );
       document.getElementById('populares').setAttribute('data-pagina', parseInt(paginaActual) + 1);
       cargarTitulos(resultados);
       window.scrollTo(0 ,0);
    }catch(err){
        console.log(err);
    }
});

anterior.addEventListener('click', async (e) => {
    e.preventDefault();
    const paginaActual = document.getElementById('populares').dataset.pagina;
    if(paginaActual > 1){
        try{
            const resultados = await fetchBusqueda(paginaActual - 1 );
            document.getElementById('populares').setAttribute('data-pagina', parseInt(paginaActual) - 1);
            cargarTitulos(resultados);
            window.scrollTo(0 ,0);
         }catch(err){
             console.log(err);
         }
    }
    
});

const fetchItem = async (id) => {
    //Obtenemos el id de los buttons de pelis y series para saber cual contiene la clase active;
    const tipo = document.querySelector('.main__filtros .btn--active').id;
    try{
        const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=20e30bb95771e47e9ff89a8de1e6c470&language=es-ESP`;
        const respuesta =  await fetch(url);
        const datos = await respuesta.json();
        return datos;
    }catch(err){
        console.log(err);
    }
};

const contenedor = document.getElementById('populares');

const popup$1 = document.getElementById('media');

contenedor.addEventListener('click', async (e) => {
    if(e.target.closest('.main__media')){
        //Activamos el popup:
        popup$1.classList.add('media--active');

        const id = e.target.closest('.main__media').dataset.id;
        

        const resultado = await fetchItem(id);

        const plantilla = `
			<div class="media__backdrop">
				<img
					src="https://image.tmdb.org/t/p/w500/${resultado.backdrop_path}"
					class="media__backdrop-image"
				/>
			</div>
			<div class="media__imagen">
				<img
					src="https://image.tmdb.org/t/p/w500/${resultado.poster_path}"
					class="media__poster"
				/>
			</div>
			<div class="media__info">
				<h1 class="media__titulo">${resultado.title || resultado.name}</h1>
				<p class="media__fecha">${resultado.release_date || resultado.first_air_date}</p>
				<p class="media__overview">${resultado.overview}</p>
			</div>
			<button class="media__btn">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
					class="media__btn-icono"
				>
					<path
						d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
					/>
				</svg>
			</button>
		`;

		document.querySelector('.media .media__contenedor').innerHTML = plantilla;
    }
});

const popup = document.getElementById('media');

popup.addEventListener('click', (e) => {
    if(e.target.closest('button')){
        popup.classList.remove('media--active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleMenu = document.getElementById('toggleMenu');
    const menuDesplegable = document.getElementById('menu__desplegable');
  
    toggleMenu.addEventListener('click', function() {
      menuDesplegable.classList.toggle('show-menu'); // Añade o remueve la clase show-menu
    });
  });

const cargar = async () => {
    const resultados = await fetchPopulares();
    cargarTitulos(resultados);
    cargarGeneros('movie');
};
cargar();
//# sourceMappingURL=bundle.js.map
