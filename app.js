// La idea principal es crear una app para el control de stock y clientes.
function bienvenida(saludo){
    alert("Bienvenido " + saludo)
}
function menu (){
    opciones = prompt(`${saludo}, ¿Qué desea hacer?: \n 1: Agregar un producto. \n 2: Agregar un cliente. \n 3: Ver inventario \n 4: Ver clientes. \n 5 Cerrar app.`);
}
function opcionesMenu(){
    while(opciones != 5){
        switch(opciones){
            case "1":
                productos();
                opciones = prompt(`${saludo}, Producto agregado, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Agregar un cliente. \n 3: Ver inventario. \n 4: Ver clientes. \n 5: Cerrar app.`);
                break;
            case "2":
                clientes()
                opciones = prompt(`${saludo}, Cliente agregado, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Agregar un cliente. \n 3: Ver inventario. \n 4: Ver clientes. \n 5: Cerrar app.`);
                break;
            case "3":
                totalProductos()
                opciones = prompt(`${saludo}, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Agregar un cliente. \n 3: Ver inventario. \n 4: Ver clientes. \n 5: Cerrar app.`);
                break;
            case "4":
                totalClientes()
                opciones = prompt(`${saludo}, elige una opcion para continuar: \n 1: Agregar un producto. \n 2: Agregar un cliente. \n 3: Ver inventario. \n 4: Ver clientes. \n 5: Cerrar app.`);
                break;
            case "5":
                alert("Gracias por utilizar nuestra app");
                break;
            default:
                opciones = prompt("opcion incorrecta, Qué desea hacer?: \n 1: Agregar un producto. \n 2: Agregar un cliente. \n 3: Ver inventario. \n 4: Ver clientes. \n 5: Cerrar app.");
                break;
        }
    }
}
function productos(){
    producto = prompt("Ingrese el producto");
    stock = prompt(`Ingrese cantidad en stock de ${producto}`);
    precio = Number(prompt(`ingrese el precio de ${producto}`));
    productosAgregados += "Producto: " + producto + " Cantidad: " + stock + " Su precio es de: $" + precio + " ";
}
function clientes(){
    cliente = prompt("Ingrese el nombre del cliente");
    clientesAgregados += "Cliente: " + cliente + " ";
}
function totalProductos(){
    alert(`Tus productos son: ${productosAgregados}`)
}
function totalClientes(){
    alert(`Tus clientes son: ${clientesAgregados}`)
}

// Aca empieza a ejecutarse la app
let saludo = prompt("Ingrese su nombre de usuario");
bienvenida(saludo);
let opciones;
let productosAgregados = "";
let clientesAgregados = "";
let producto;
let stock;
let precio;
let cliente;
menu();
opcionesMenu();





