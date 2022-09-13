// La idea principal es crear una app para el control de stock y clientes.
// Accedo al formulario para capturar los datos despues del submit.
const formularioProductos = document.querySelector("#agregarProducto");

formularioProductos.addEventListener("submit", formulario);

function formulario(e) {
    e.preventDefault();
    let numero = document.querySelector("#numero").value;
    let numeroId = document.querySelector("#nId").value;
    let producto = document.querySelector("#producto").value;
    let marca = document.querySelector("#marca").value;
    let cantidad = document.querySelector("#cantidad").value;
    let precio = document.querySelector("#precio").value;
    productos.push(new Producto(numero, numeroId, producto, marca, cantidad, precio));
    totalProductos()
    limpiarInput()
}
// Creo un div con la informacion recibida del formulario y lo agrego en el html como hijo de un section.
function totalProductos(){
    const productoAgregado = document.createElement("div");
    productos.forEach(producto => {
        productoAgregado.innerHTML = `<div><p>${producto.numero}</p></div><div><p class="numero-id">${producto.id}</p></div><div><p>${producto.nombre}</p></div><div><p>${producto.marca}</p></div><div><p>${producto.cantidad}</p></div><div><p>${producto.precio}</p></div><div><p>${producto.precio*1.21}</p></div><div class="botones"><button id="eliminar"><i class="bi bi-x-circle-fill"></i></button></div>`;
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
// Selecciono un section del html y le agrego un evento "click" con un condicional para ejecutar la funcion con click en boton.
//Elimino del dom y del array el producto con evento "click".
const botonEliminar = document.querySelector("#lista-productos")
botonEliminar.addEventListener("click", event => {
    if(event.target && event.target.tagName === "I"){
        let encontrarEnDom = event.target.parentNode.parentNode.parentNode
        let valorEnDom = encontrarEnDom.querySelector(".numero-id").innerHTML

        const resultado = productos.find((producto) => producto.id == valorEnDom)

        let indice = productos.indexOf(resultado)

        productos.splice(indice, 1)
        event.target.parentNode.parentNode.parentNode.remove()
    }
})
// Declaro arrays vacios y objetos para utilizarlos dentro de las funciones.
const productos = [];
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








