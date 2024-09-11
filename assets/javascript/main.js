
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

//Carrito
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#listaCursos");
let articulosCarrito = [];

//registrando todos los event listener
cargarEventListener();
function cargarEventListener() {
    //al tocar agregar al carrito un curso
    listaCursos.addEventListener("click", agregarCurso);
    carrito.addEventListener("click", eliminarCurso);
    vaciarCarrito.addEventListener("click", () =>{
        articulosCarrito = [];
        carritoHtml();
    })
}


//funciones
function agregarCurso(e) {
    if (e.target.classList.contains("boton")) {
        const cursoSelect = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelect);
        actualizarCantidadCarrito();
       
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const dataId = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== dataId);
        carritoHtml();
        actualizarCantidadCarrito();

    }
}
//lee el contenido html del curso y extrae la informcion
function leerDatosCurso(curso) {
    //objeto para elementos del html
    const info = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h3").textContent,
        precio: curso.querySelector(".precio__now").textContent,
        id: curso.querySelector(".boton").getAttribute("data-id"),
        cantidad: 1

    }
    // ver si ya esta elemento en el carrito
    const existe = articulosCarrito.some( curso => curso.id === info.id);
    if(existe){
        const cursos = articulosCarrito.map(curso =>{
            if (curso.id === info.id){
                curso.cantidad++;
                return curso;
            } else{
                return curso;
            }
        })
            articulosCarrito = [...cursos];
        }
        else {
            articulosCarrito = [...articulosCarrito, info];
            
        }
        carritoHtml();
 } 


//mostrar elementos al carrito
function carritoHtml(){
    limpiarHtml();
    articulosCarrito.forEach( curso =>{
        //crea una fila
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>
        <img src = '${curso.imagen}' width = 80>
        </td>
        <td>
        <p class = "fontSizeChikita">${curso.titulo}</p>
        </td>
        <td>
        <p class = "fontSizeChikita"> ${curso.precio}</p>
        </td>
        <td>
         <p class = "fontSizeChikita">${curso.cantidad}</p> 
        </td>
        <td>
        <a href = "#" class = "borrar-curso" data-id = "${curso.id}">X</a>
        </td>
        `
        //agrega el html al tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//numero carrito
const CantCarrito = document.querySelector("#cantidad");
function actualizarCantidadCarrito() {
    CantCarrito.textContent = articulosCarrito.length;
}




//Activar Modo Oscuro con el btn darkModeButton
function changeColor(){

    let bg = document.getElementById("container").style.background = "#1d1d1d";
    let title =document.getElementById("titulo").style.color = "#dedede"
    
}

