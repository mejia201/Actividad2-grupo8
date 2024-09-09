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
       
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const dataId = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== dataId);
        carritoHtml();
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
        ${curso.titulo}
        </td>
        <td>
        ${curso.precio}
        </td>
        <td>
        ${curso.cantidad}
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