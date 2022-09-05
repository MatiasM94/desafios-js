// La idea principal es crear una app para el control de stock y clientes.

function bienvenida(saludo){
    alert("Bienvenido " + saludo)
}
function menu (){
    opciones = prompt(`${saludo}, ¿Qué desea hacer?: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver inventario. \n 5: Ver clientes. \n 6: Ver precios con iva \n 7: Cerrar app.`);
}
function opcionesMenu(){
    while(opciones != 7){
        switch(opciones){
            case "1":
                ingresarProductos();
                opciones = prompt(`${saludo}, Producto agregado, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver inventario. \n 5: Ver clientes. \n 6: Ver precios con iva \n 7: Cerrar app.`);
                break;
            case "2":
                buscarProducto();
                opciones = prompt(`${saludo}, Producto encontrado, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver inventario. \n 5: Ver clientes. \n 6: Ver precios con iva \n 7: Cerrar app.`);
                break;
            case "3":
                ingresarClientes()
                opciones = prompt(`${saludo}, Cliente agregado, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver inventario. \n 5: Ver clientes. \n 6: Ver precios con iva \n 7: Cerrar app.`);
                break;
            case "4":
                totalProductos()
                opciones = prompt(`${saludo}, Tus productos se mostraron por consola, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver inventario. \n 5: Ver clientes. \n 6: Ver precios con iva \n 7: Cerrar app.`);
                break;
            case "5":
                totalClientes()
                opciones = prompt(`${saludo}, Tus clientes se mostraron por consola, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver inventario. \n 5: Ver clientes. \n 6: Ver precios con iva \n 7: Cerrar app.`);
                break;
            case "6":
                preciosConIva()
                opciones = prompt(`${saludo}, Los precios se mostraron por consola, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver inventario. \n 5: Ver clientes. \n 6: Ver precios con iva \n 7: Cerrar app.`);
                break;
            case "7":
                alert("Gracias por utilizar nuestra app");
                break;
            default:
                opciones = prompt("opcion incorrecta, Qué desea hacer?: \n 1: Agregar un producto. \n 2: Buscar un producto \n 3: Agregar un cliente. \n 4: Ver inventario. \n 5: Ver clientes. \n 6: Ver precios con iva \n 7: Cerrar app.");
        }
    }
}
function ingresarProductos(){
    productos.push(new Producto(prompt("ingrese el ID del producto"), prompt("ingrese el nombre del producto"), parseInt(prompt("ingrese la cantidad en stock")), Number(prompt("ingrese el precio del producto"))))
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
    productos.forEach( (producto) => {
        console.log("Producto:", producto.nombre, "Cantidad", producto.cantidad)
    })
}
function totalClientes(){
    clientes.forEach( (cliente) => {
        console.log("Cliente", cliente.nombre)
    })
}
function preciosConIva(){
    const ivaIncluido = productos.map((iva) => {
        return {
        nombre: iva.nombre,
        precio: iva.precio * 1.21
        }
    })
    console.table(ivaIncluido)
}

// Aca empieza a ejecutarse la app
let saludo = prompt("Ingrese su nombre de usuario");
bienvenida(saludo);
let opciones;
const productos = [];
class Producto {
    constructor(id, nombre, cantidad, precio){
    this.id = id;
    this.nombre = nombre;
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






