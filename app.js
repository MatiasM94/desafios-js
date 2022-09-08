// La idea principal es crear una app para el control de stock y clientes.

function bienvenida(saludo){
    alert("Bienvenido " + saludo)
}
function menu (){
    opciones = prompt(`${saludo}, ¿Qué desea hacer?: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver clientes. \n 5: Cerrar app.`);
}
function opcionesMenu(){
    while(opciones != 5){
        switch(opciones){
            case "1":
                ingresarProductos();
                totalProductos()
                opciones = prompt(`${saludo}, Producto agregado, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver clientes. \n 5: Cerrar app.`);
                break;
            case "2":
                buscarProducto();
                opciones = prompt(`${saludo}, Producto encontrado, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver clientes. \n 5: Cerrar app.`);
                break;
            case "3":
                ingresarClientes()
                opciones = prompt(`${saludo}, Cliente agregado, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver clientes. \n 5: Cerrar app.`);
                break;
            case "4":
                totalClientes()
                opciones = prompt(`${saludo}, Tus clientes se mostraron por consola, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver clientes. \n 5: Cerrar app.`);
                break;
            case "5":
                alert("Gracias por utilizar nuestra app");
                break;
            default:
                opciones = prompt("opcion incorrecta, Qué desea hacer?: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver clientes. \n 5: Cerrar app.");
        }
    }
}
function ingresarProductos(){
    productos.push(new Producto(prompt("ingrese el numero de orden de lista del producto(ej: 01, 02, 03, etc.):"), prompt("ingrese el ID del producto(id del proveedor)"), prompt("ingrese el nombre del producto"), prompt("ingrese el nombre de la marca del producto"), parseInt(prompt("ingrese la cantidad en stock")), Number(prompt("ingrese el precio del producto"))))
}
function buscarProducto(){
    let buscar = prompt("ingrese el nombre del producto que desea buscar");
    const resultado = productos.find((producto) => producto.nombre == buscar)
        if (resultado != undefined) {
            console.log(resultado)
            alert("Tu busqueda a sido mostrada en la consola")
        }else{
            alert("Producto no encontrado")
        }
}
function ingresarClientes(){
    clientes.push(new Cliente(prompt("Ingrese el numero de cliente"), prompt("ingrese el nombre del cliente")));
}
function totalProductos(){
    const productoAgregado = document.createElement("div")
    for (const producto of productos) {
        productoAgregado.innerHTML = `<div><p>${producto.numero}</p></div><div><p>${producto.id}</p></div><div><p>${producto.nombre}</p></div><div><p>${producto.marca}</p></div><div><p>${producto.cantidad}</p></div><div><p>${producto.precio}</p></div><div>${producto.precio*1.21}</div><div><button class="eliminar"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg></i></button></div>`
        productoAgregado.className = "indice-lista__productos"
        document.querySelector("#lista-productos").appendChild(productoAgregado);
    }
}
function totalClientes(){
    clientes.forEach( (cliente) => {
        console.log("Cliente", cliente.nombre)
    })
}

// Aca empieza a ejecutarse la app
let saludo = prompt("Ingrese su nombre de usuario");
bienvenida(saludo);
let opciones;
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
menu();
opcionesMenu();








