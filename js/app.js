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
// Inicio la app con el array de productos del localStorage.

arrayJs()

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
}
// Creo un div con la informacion recibida del formulario y lo agrego en el html como hijo de un section.
function agregarProducto(infoProducto){
    const productoAgregado = document.createElement("div");
    infoProducto.forEach(producto => {
        productoAgregado.innerHTML = `<div><p class="numero">${producto.numero}</p></div><div><p class="numero-id">${producto.id}</p></div><div><p class="nombre">${producto.nombre}</p></div><div><p class="marca">${producto.marca}</p></div><div><p class="cantidad">${producto.cantidad}</p></div><div><p class="precio">${producto.precio}</p></div><div><p class="precioIva">${producto.precio*1.21}</p></div><div class="botones"><button type="button" class="boton boton-editar" data-bs-toggle="modal" data-bs-target="#editarModal">Editar Producto</button><button id="eliminar"><i class="bi bi-x-circle-fill"></i></button></div>`;
        productoAgregado.className = "indice-lista__productos";
        document.querySelector("#lista-productos").appendChild(productoAgregado);
    })
}
// selecciono los imputs y les devuelvo un value vacio.
function limpiarInput() {
    numero = document.querySelector("#numero").value;
    numero = document.querySelector("#numero").value = (Number(numero) + 1);
    numeroId = document.querySelector("#nId").value = "";
    producto = document.querySelector("#producto").value = "";
    marca = document.querySelector("#marca").value = "";
    cantidad = document.querySelector("#cantidad").value = "";
    precio = document.querySelector("#precio").value = "";
}
// Convierto el array de objetos en formato json y lo guardo en localStorage.
function aJson(guardarArray) {
    const productosJson = JSON.stringify(guardarArray);
    localStorage.setItem("listaProductos", productosJson);
}
// Recupero el array de objetos en formato js al iniciar la app y lo guardo en el array productos.
function arrayJs(){
    const productosEnStorage = JSON.parse(localStorage.getItem("listaProductos"));
    if (productosEnStorage){
        for(const producto of productosEnStorage){
            productos.push(new Producto(producto.numero, producto.id, producto.nombre, producto.marca, producto.cantidad, producto.precio));
            agregarProducto(productos)
        }
    }
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

// Selecciono un section del html y le agrego un evento "click" con un condicional para ejecutar la funcion con click en boton.
//Elimino del dom y del array el producto con evento "click" y actualizo el localStorage.
const botonEliminar = document.querySelector("#lista-productos");
botonEliminar.addEventListener("click", event => {
    if(event.target && event.target.tagName === "I"){
        let encontrarEnDom = event.target.parentNode.parentNode.parentNode;
        let valorEnDom = encontrarEnDom.querySelector(".numero-id").innerHTML;

        const resultado = productos.find((producto) => producto.id == valorEnDom);

        let indice = productos.indexOf(resultado);

        productos.splice(indice, 1)
        event.target.parentNode.parentNode.parentNode.remove();
        aJson(productos)
    }
})

// funcion para ordenar la lista de productos segun conveniencia.
const botonesOrdenar = document.querySelector("#ordenarLista")
botonesOrdenar.addEventListener("click", event => {
    switch(event.target && event.target.innerHTML){
        case "Número":
            if(ordenProducto == true){
                ordenProducto = false;
                productos.sort((a, b) => a.numero - b.numero);
            }
            else{
                ordenProducto = true;
                productos.sort((a, b) => b.numero - a.numero);
            }
            mostrarProductos(productos)
            break;
        case "ID":
            if(ordenProducto == true){
                ordenProducto = false;
                productos.sort((a, b) => a.id - b.id);
            }
            else{
                ordenProducto = true;
                productos.sort((a, b) => b.id - a.id);
            }
            mostrarProductos(productos)
            break;
        case "Producto":
            if(ordenProducto == true){
                ordenProducto = false;
                productos.sort((a, b) => {
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
            }
            else{
                ordenProducto = true;
                productos.sort((a, b) => {
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
            }
            mostrarProductos(productos)
            break;
        case "Marca":
            if(ordenProducto == true){
                ordenProducto = false;
                productos.sort((a, b) => {
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
            }
            else{
                ordenProducto = true;
                productos.sort((a, b) => {
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
            }
            mostrarProductos(productos)
            break;
        case "Cantidad":
            if(ordenProducto == true){
                ordenProducto = false;
                productos.sort((a, b) => a.cantidad - b.cantidad);
            }
            else{
                ordenProducto = true;
                productos.sort((a, b) => b.cantidad - a.cantidad);
            }
            mostrarProductos(productos)
            break;
        case "Precio":
            if(ordenProducto == true){
                ordenProducto = false;
                productos.sort((a, b) => a.precio - b.precio);
            }
            else{
                ordenProducto = true;
                productos.sort((a, b) => b.precio - a.precio);
            }
            mostrarProductos(productos)
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

// Actualizar/editar objeto dentro del array.
const indice = () => {
    let buscarIndice = productos.findIndex((producto => producto.id == numeroId));
    return buscarIndice
}
const editarProducto = document.querySelector("#lista-productos");

editarProducto.addEventListener("click", editarArray);

function editarArray(event) {
    if(event.target && event.target.innerHTML === "Editar Producto"){
        let encontrarEnDom = event.target.parentNode.parentNode
        let valorEnDom = encontrarEnDom
        numero = document.querySelector("#editarNumero").value = valorEnDom.querySelector(".numero").innerHTML;
        numeroId = document.querySelector("#editarNid").value = valorEnDom.querySelector(".numero-id").innerHTML;
        producto = document.querySelector("#editarNombre").value = valorEnDom.querySelector(".nombre").innerHTML;
        marca = document.querySelector("#editarMarca").value = valorEnDom.querySelector(".marca").innerHTML;
        cantidad = document.querySelector("#editarCantidad").value = valorEnDom.querySelector(".cantidad").innerHTML;
        precio = document.querySelector("#editarPrecio").value = valorEnDom.querySelector(".precio").innerHTML;
    }

    let formularioEditar = document.querySelector("#editarModal");
    formularioEditar.addEventListener("click", event => {
        if(event.target && event.target.innerHTML === "Aceptar"){
            productos[indice()] = {numero: document.querySelector("#editarNumero").value, id: document.querySelector("#editarNid").value, nombre: document.querySelector("#editarNombre").value.toLowerCase(), marca: document.querySelector("#editarMarca").value.toLowerCase(), cantidad: document.querySelector("#editarCantidad").value, precio: document.querySelector("#editarPrecio").value};
        }
        mostrarProductos(productos)
        aJson(productos)
    })
}