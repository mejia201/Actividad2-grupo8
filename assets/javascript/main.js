//Agregar categorias y listarlas en un a
  
  const formAgregarCategoria = document.getElementById('formAgregarCategoria');
  const nombreInput = document.getElementById('nombreCategoria');
  const dropdownMenu = document.getElementById('categoriasDropdown');

 
  formAgregarCategoria.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreCategoria = nombreInput.value;

   
    if (nombreCategoria.trim() !== '') {
     
      const nuevaCategoria = document.createElement('li');
      nuevaCategoria.innerHTML = `<a class="dropdown-item" href="#">${nombreCategoria}</a>`;
  
      dropdownMenu.appendChild(nuevaCategoria);

      nombreInput.value = ''; 
      document.getElementById('descripcionCategoria').value = '';
      const modal = bootstrap.Modal.getInstance(document.getElementById('CategoriasModal'));
      modal.hide(); 

        AlertMessage('La categoría se ha agregado con éxito', 'success');

    } else {
    
      modal.hide(); 
      AlertMessage('Por favor, ingresa un nombre para la categoría.', 'error');
    }
  });



// Buscar dinamicamente cursos por el nombre


const buscarInput = document.getElementById('buscarCurso');
const cursos = document.querySelectorAll('.caja');

buscarInput.addEventListener('input', function() {
    const textoBusqueda = buscarInput.value.toLowerCase();

    cursos.forEach(function(curso) {
        const nombreCurso = curso.querySelector('.info__titulo').textContent.toLowerCase();
        if (nombreCurso.includes(textoBusqueda)) {
            curso.style.display = '';
        } else {
            curso.style.display = 'none';
        }
    });
});
