document.addEventListener('DOMContentLoaded', function() {
    const toggleMenu = document.getElementById('toggleMenu');
    const menuDesplegable = document.getElementById('menu__desplegable');
  
    toggleMenu.addEventListener('click', function() {
      menuDesplegable.classList.toggle('show-menu'); // Añade o remueve la clase show-menu
    });
  });