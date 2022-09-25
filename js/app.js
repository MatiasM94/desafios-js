// La idea principal es crear una app para el control de stock y clientes.
// Declaro arrays vacios y objetos para utilizarlos dentro de las funciones.
let productos = [];
class Producto {
    constructor(numero, id, nombre, marca, cantidad, precio){
        this.numero = numero;
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.cantidad = cantidad;
        this.precio = precio;
    }    
}
const clientes = [];
class Cliente {
    constructor(numero, nombre){
        this.numero = numero;
        this.nombre = nombre;
    }
}

// variable para ordenar el array segun cierta caracteristica, la utilizo como un interruptor.
let ordenProducto = true;

// Le agrego estilo y atributos a los botones y funciones de sweetAlert2.
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'boton me-3 botonSweet',
        cancelButton: 'btn btn-danger',
    },
    heightAuto: false,
    buttonsStyling: false,
})

// funcion para recuperar el array de objetos del localStorage y convertirlo en formato js al iniciar la app y guardar en el array productos.
const arrayJs = () => {
    const productosEnStorage = JSON.parse(localStorage.getItem("listaProductos")) || []
    for(const producto of productosEnStorage){
        productos.push(new Producto(producto.numero, producto.id, producto.nombre, producto.marca, producto.cantidad, producto.precio));
        agregarProducto(productos)
    }
}

// Inicio la app con el array de productos recuperado del localStorage.
arrayJs()

// Funcion para crear un div con la informacion que voy a recibir del formulario y lo agrego en el html como hijo de un section.
function agregarProducto(infoProducto){
    const productoAgregado = document.createElement("div");
    infoProducto.forEach(producto => {
        productoAgregado.innerHTML = `<div><p class="numero">${producto.numero}</p></div><div><p class="numero-id">${producto.id}</p></div><div><p class="nombre">${producto.nombre}</p></div><div><p class="marca">${producto.marca}</p></div><div><p class="cantidad">${producto.cantidad}</p></div><div><p class="precio">${producto.precio}</p></div><div><p class="precioIva">${producto.precio*1.21}</p></div><div class="botones"><button type="button" class="boton boton-editar" data-bs-toggle="modal" data-bs-target="#editarModal">Editar Producto</button><button id="eliminar"><i class="bi bi-x-circle-fill"></i></button></div>`;
        productoAgregado.className = "indice-lista__productos";
        document.querySelector("#lista-productos").appendChild(productoAgregado);
    })
    Toastify({
        text: "Producto Agregado",
        className: "info",
        style: {
            "border-radius": "7px",
            padding: "10px",
            background: "#01949A",
        }
    }).showToast();
}

// Funcion para seleccionar los inputs del formulario y devolverles un value vacio(despues de agregar un producto) para seguir agregando productos.
function limpiarInput() {
    numero = document.querySelector("#numero").value;
    numero = document.querySelector("#numero").value = (Number(numero) + 1);
    numeroId = document.querySelector("#nId").value = "";
    producto = document.querySelector("#producto").value = "";
    marca = document.querySelector("#marca").value = "";
    cantidad = document.querySelector("#cantidad").value = "";
    precio = document.querySelector("#precio").value = "";
}

// Funcion para convertir el array de objetos en formato json y guardarlo en localStorage.
function aJson(guardarArray) {
    const productosJson = JSON.stringify(guardarArray);
    localStorage.setItem("listaProductos", productosJson);
}

// Funcion para agregar opcion de cerrar la ventana despues de agregar un producto.
const cerrarForm = (e) => {
    let checkBox = document.querySelector("#check")
    let addProducto = document.querySelector("#btnAgregarProducto")
    if(e.target.type == "checkbox"){
        if(checkBox.value == "on"){
            addProducto.removeAttribute("data-bs-dismiss");
            checkBox.setAttribute("value", "check");
        }
        else {
            addProducto.setAttribute("data-bs-dismiss", "modal");
            checkBox.removeAttribute("value");
        }
    }
}

// Accedo al formulario para capturar los datos despues del submit.
const formularioProductos = document.querySelector(".modal");

formularioProductos.addEventListener("click", formulario);

function formulario(e) {
    if(e.target && e.target.innerHTML === "Agregar Producto"){
    let numero = document.querySelector("#numero").value.toLowerCase();
    let numeroId = document.querySelector("#nId").value.toLowerCase();
    let producto = document.querySelector("#producto").value.toLowerCase();
    let marca = document.querySelector("#marca").value.toLowerCase();
    let cantidad = document.querySelector("#cantidad").value.toLowerCase();
    let precio = document.querySelector("#precio").value.toLowerCase();
    productos.push(new Producto(numero, numeroId, producto, marca, cantidad, precio));
    agregarProducto(productos)
    limpiarInput()
    aJson(productos)
    }
    cerrarForm(e)
}

// Funcion para mostrar el array despues de ordenar la lista ó modificar/eliminar un producto ó buscar un producto.
const mostrarProductos = (mostrarArray) => {
    let listaDom = document.querySelector("#lista-productos").innerHTML = "";
    mostrarArray.forEach(producto => {
        const productoAgregado = document.createElement("div");
        productoAgregado.innerHTML = `<div><p class="numero">${producto.numero}</p></div><div><p class="numero-id">${producto.id}</p></div><div><p class="nombre">${producto.nombre}</p></div><div><p class="marca">${producto.marca}</p></div><div><p class="cantidad">${producto.cantidad}</p></div><div><p class="precio">${producto.precio}</p></div><div><p class="precioIva">${producto.precio*1.21}</p></div><div class="botones"><button type="button" class="boton boton-editar" data-bs-toggle="modal" data-bs-target="#editarModal">Editar Producto</button><button id="eliminar"><i class="bi bi-x-circle-fill"></i></button></div>`;
        productoAgregado.className = "indice-lista__productos";
        document.querySelector("#lista-productos").appendChild(productoAgregado);
    })
}

//Funcion para eliminar del dom y del array el producto y actualizar el localStorage.
const eliminarProducto = (enDom, enDomId) => {
    const resultado = productos.find((producto) => producto.id == enDomId);
    let indice = productos.indexOf(resultado);

    productos.splice(indice, 1)
    enDom.remove();
    aJson(productos)
}

// Agrego SweetAlert + Toastify para eliminar producto.
const eliminarSweet = (enDom, enDomId) =>{
    swalWithBootstrapButtons.fire({
        title: '¿Quieres elimar este producto?',
        text: "No podras restaurarlo si te arrepientes!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
})
    .then((result) => {
        if (result.isConfirmed) {
            eliminarProducto(enDom, enDomId)
            Toastify({
                text: "Producto Eliminado",
                className: "info",
                style: {
                    "border-radius": "7px",
                    padding: "10px",
                    background: "#01949A",
                }
            }).showToast();
        }
    })
}

// Selecciono un section del html y le agrego un evento "click" para eliminar el producto del dom y del array.
const botonEliminar = document.querySelector("#lista-productos");
botonEliminar.addEventListener("click", event => {
    if (event.target.tagName === "I"){
        let encontrarEnDom = event.target.parentNode.parentNode.parentNode;
        let valorEnDom = encontrarEnDom.querySelector(".numero-id").innerHTML;
        eliminarSweet(encontrarEnDom, valorEnDom)
    }
})

// funciones para ordenar la lista de productos segun conveniencia.
const ordenAlfabeticoNombreA = (arrayProductos) =>{
    arrayProductos.sort((a, b) => {
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
            return 1;
        }
        else if (a.nombre.toLowerCase() < b.nombre.toLowerCase()){
            return -1;
        }
        else{
            return 0;
        }
    })
    ordenProducto = false
}
const ordenAlfabeticoNombreZ = (arrayProductos) =>{
    arrayProductos.sort((a, b) => {
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            return 1;
        }
        else if (a.nombre.toLowerCase() > b.nombre.toLowerCase()){
            return -1;
        }
        else{
            return 0;
        }
    })
    ordenProducto = true
}
const ordenAlfabeticoMarcaA = (arrayProductos) =>{
    arrayProductos.sort((a, b) => {
        if (a.marca.toLowerCase() > b.marca.toLowerCase()) {
            return 1;
        }
        else if (a.marca.toLowerCase() < b.marca.toLowerCase()){
            return -1;
        }
        else{
            return 0;
        }
    })
    ordenProducto = false
}
const ordenAlfabeticoMarcaZ = (arrayProductos) =>{
    arrayProductos.sort((a, b) => {
        if (a.marca.toLowerCase() < b.marca.toLowerCase()) {
            return 1;
        }
        else if (a.marca.toLowerCase() > b.marca.toLowerCase()){
            return -1;
        }
        else{
            return 0;
        }
    })
    ordenProducto = true
}
// Casos para ordenar la lista.
const botonesOrdenar = document.querySelector("#ordenarLista")
botonesOrdenar.addEventListener("click", event => {
    switch(event.target.innerHTML){
        case "Número":
            ordenProducto == true ? productos.sort((a, b) => a.numero - b.numero) && (ordenProducto = false) : productos.sort((a, b) => b.numero - a.numero) && (ordenProducto = true)
            mostrarProductos(productos);
            break;
        case "ID":
            ordenProducto == true ? productos.sort((a, b) => a.id - b.id) && (ordenProducto = false) : productos.sort((a, b) => b.id - a.id) && (ordenProducto = true)
            mostrarProductos(productos);
            break;
        case "Producto":
            ordenProducto == true ? ordenAlfabeticoNombreA(productos) : ordenAlfabeticoNombreZ(productos)
            mostrarProductos(productos);
            break;
        case "Marca":
            ordenProducto == true ? ordenAlfabeticoMarcaA(productos) : ordenAlfabeticoMarcaZ(productos)
            mostrarProductos(productos);
            break;
        case "Cantidad":
            ordenProducto == true ? productos.sort((a, b) => a.cantidad - b.cantidad) && (ordenProducto = false) : productos.sort((a, b) => b.cantidad - a.cantidad) && (ordenProducto = true)
            mostrarProductos(productos);
            break;
        case "Precio":
            ordenProducto == true ? productos.sort((a, b) => a.precio - b.precio) && (ordenProducto = false) : productos.sort((a, b) => b.precio - a.precio) && (ordenProducto = true)
            mostrarProductos(productos);
            break;
    }
})

// Funcion para buscar un elemento en el dom y mostrarlo.
const buscarEnDom = () => {
    let buscador = document.querySelector("#buscar");
    buscador.addEventListener("input", () => {
        const buscar = productos.filter((contenido) => contenido.nombre.includes(buscador.value));
        mostrarProductos(buscar)
    })
}
buscarEnDom()

// Funciones para actualizar/editar objeto dentro del array.
const indice = () => {
    let buscarIndice = productos.findIndex((producto => producto.id == numeroId));
    return buscarIndice
}
const editar = () => {
    (productos[indice()] = {numero: document.querySelector("#editarNumero").value,
                            id: document.querySelector("#editarNid").value,
                            nombre: document.querySelector("#editarNombre").value.toLowerCase(),
                            marca: document.querySelector("#editarMarca").value.toLowerCase(),
                            cantidad: document.querySelector("#editarCantidad").value,
                            precio: document.querySelector("#editarPrecio").value});
    mostrarProductos(productos)
    aJson(productos)
}
// Agrego un sweetAlert para confirmar edicion.
const editarSweet = () => {
    swalWithBootstrapButtons.fire({
        title: '¿Quieres guardar los cambios?',
        icon: "question",
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            editar()
            swalWithBootstrapButtons.fire('Producto Actualizado', '', 'success')
        }
    })
}

// Selecciono el seccion de los productos y le agrego un evento para ejecutar las funciones que editan el producto
const editarProducto = document.querySelector("#lista-productos");

editarProducto.addEventListener("click", editarArray);

function editarArray(event) {
    if(event.target && event.target.innerHTML === "Editar Producto"){
        let encontrarEnDom = event.target.parentNode.parentNode
        let valorEnDom = encontrarEnDom
        // Tomo los datos del producto seleccionado y los imprimo en los input del modal.
        numero = document.querySelector("#editarNumero").value = valorEnDom.querySelector(".numero").innerHTML;
        numeroId = document.querySelector("#editarNid").value = valorEnDom.querySelector(".numero-id").innerHTML;
        producto = document.querySelector("#editarNombre").value = valorEnDom.querySelector(".nombre").innerHTML;
        marca = document.querySelector("#editarMarca").value = valorEnDom.querySelector(".marca").innerHTML;
        cantidad = document.querySelector("#editarCantidad").value = valorEnDom.querySelector(".cantidad").innerHTML;
        precio = document.querySelector("#editarPrecio").value = valorEnDom.querySelector(".precio").innerHTML;
    }
    // Tómo el formulario del modal y ejecuto la funcion editar.
    let formularioEditar = document.querySelector("#editarModal");
    formularioEditar.addEventListener("click", event => {
        event.target && event.target.innerHTML === "Aceptar" && editarSweet()
    })
}