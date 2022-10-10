// Pantalla de carga de la app.
const completarBarra = () => {
    Swal.fire({
        showConfirmButton: false,
        heightAuto: false,
        timer: 1200,
        title: "Stockment",
        html: `<div class="progress">
        <div id="barraProgreso" class="progress-bar progress-bar-striped" role="progressbar" aria-label="Default striped example" style="width: 25%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>`,
        backdrop: `
        #004369
        `,
    });
    sessionStorage.setItem("pantallaDeCarga", false);
    let barraProgreso = document.querySelector("#barraProgreso");
    let progreso = 0;
    const cargarIntervalo = setInterval(() => {
        progreso += 5;
        barraProgreso.style.width = progreso + "%";
        if (progreso >= 100) {
            clearInterval(cargarIntervalo);
        }
    }, 10);
};
sessionStorage.pantallaDeCarga != "false" && completarBarra();

// Declaro arrays vacios y objetos para utilizarlos dentro de las funciones.
let productos = [];
class Producto {
    constructor(numero, id, nombre, marca, cantidad, precio) {
        this.numero = numero;
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}
// inputs del form.
let numero = document.querySelector("#numero");
let numeroId = document.querySelector("#nId");
let producto = document.querySelector("#producto");
let marca = document.querySelector("#marca");
let cantidad = document.querySelector("#cantidad");
let precio = document.querySelector("#precio");
// inputs del form editar.
let editarNumero = document.querySelector("#editarNumero");
let editarNumeroId = document.querySelector("#editarNid");
let editarProducto = document.querySelector("#editarNombre");
let editarMarca = document.querySelector("#editarMarca");
let editarCantidad = document.querySelector("#editarCantidad");
let editarPrecio = document.querySelector("#editarPrecio");
// seccion donde agrego los productos.
const listaProductos = document.querySelector("#lista-productos");

// variable para ordenar el array segun cierta caracteristica, la utilizo como un interruptor.
let ordenProducto = true;



// Estilo y atributos de los botones y funciones de sweetAlert2.
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "boton me-3 botonSweet",
        cancelButton: "btn btn-danger",
    },
    heightAuto: false,
    buttonsStyling: false,
});

// Funcion para mostrar el array despues de ordenar la lista ó modificar/eliminar un producto ó buscar un producto.
const mostrarProductos = (mostrarArray) => {
    listaProductos.innerHTML = "";
    mostrarArray.forEach((producto) => {
        const productoAgregado = document.createElement("div");
        productoAgregado.innerHTML = `<div class="contenedorNumero"><p class="numero">${producto.numero}</p></div>
        <div class="contenedorId"><p class="numero-id">${producto.id}</p></div>
        <div><p class="nombre">${producto.nombre}</p></div>
        <div class="contenedorMarca"><p class="marca">${producto.marca}</p></div>
        <div><p class="cantidad">${producto.cantidad}</p></div>
        <div class="contenedorPrecio">$<p class="precio">${producto.precio}</p></div>
        <div class="contenedorPrecioIva">$<p class="precioIva">${producto.precio * 1.21}</p></div>
        <div class="botones"><button type="button" class="boton boton-editar" data-bs-toggle="modal" data-bs-target="#editarModal">Editar</button><button id="eliminar"><i class="bi bi-x-circle-fill"></i></button></div>`;
        productoAgregado.className = "indice-lista__productos";
        listaProductos.appendChild(productoAgregado);
    });
};

// funcion para recuperar el array de objetos del localStorage y convertirlo en formato js al iniciar la app y guardar en el array productos.
const arrayJs = () => {
    const productosEnStorage = JSON.parse(localStorage.getItem("listaProductos")) || [];
    for (const producto of productosEnStorage) {
        productos.push(
            new Producto(
                producto.numero,
                producto.id,
                producto.nombre,
                producto.marca,
                producto.cantidad,
                producto.precio
            )
        );
    }
    mostrarProductos(productos);
};

// Cargo el array de productos recuperado del localStorage.
arrayJs();

// Funcion para crear un div con la informacion que voy a recibir del formulario.
function agregarProducto(infoProducto) {
    const productoAgregado = document.createElement("div");
    infoProducto.forEach((producto) => {
        productoAgregado.innerHTML = `<div class="contenedorNumero"><p class="numero">${producto.numero}</p></div>
        <div class="contenedorId"><p class="numero-id">${producto.id}</p></div>
        <div><p class="nombre">${producto.nombre}</p></div>
        <div class="contenedorMarca"><p class="marca">${producto.marca}</p></div>
        <div><p class="cantidad">${producto.cantidad}</p></div>
        <div class="contenedorPrecio">$<p class="precio">${producto.precio}</p></div>
        <div class="contenedorPrecioIva">$<p class="precioIva">${producto.precio * 1.21}</p></div>
        <div class="botones"><button type="button" class="boton boton-editar" data-bs-toggle="modal" data-bs-target="#editarModal">Editar</button><button id="eliminar"><i class="bi bi-x-circle-fill"></i></button></div>`;
        productoAgregado.className = "indice-lista__productos";
        listaProductos.appendChild(productoAgregado);
    });
    Toastify({
        text: "Producto Agregado",
        className: "info",
        style: {
            "border-radius": "7px",
            padding: "10px",
            background: "#01949A",
        },
    }).showToast();
}

// Funcion para seleccionar los inputs del formulario y devolverles un value vacio(despues de agregar un producto) para seguir agregando productos.
function limpiarInput() {
    numero.value = Number(numero.value) + 1;
    numeroId.value = "";
    producto.value = "";
    marca.value = "";
    cantidad.value = "";
    precio.value = "";
}

// Funcion para convertir el array de objetos en formato json y guardarlo en localStorage.
function aJson(guardarArray) {
    const productosJson = JSON.stringify(guardarArray);
    localStorage.setItem("listaProductos", productosJson);
}

// Funcion para agregar opcion de cerrar modal despues de agregar un producto.
const cerrarForm = (e) => {
    let checkBox = document.querySelector("#check");
    let addProducto = document.querySelector("#btnAgregarProducto");
    if (e.target.type == "checkbox") {
        if (checkBox.value == "on") {
            addProducto.removeAttribute("data-bs-dismiss");
            checkBox.setAttribute("value", "check");
        } else {
            addProducto.setAttribute("data-bs-dismiss", "modal");
            checkBox.removeAttribute("value");
        }
    }
};

// Funciones para validar form.
const existeNumero = (comparar) => {
    const resultado = productos.some((producto) => producto.numero == comparar.value);
    return resultado;
};
const existeId = (comparar) => {
    const resultado = productos.some((producto) => producto.id == comparar.value);
    return resultado;
};
function validarForm(e) {
    if (numero.value == "") {
        numero.setCustomValidity("¡Ingrese un número!");
    } else if (existeNumero(numero)) {
        numero.setCustomValidity("¡El Número ya existe!");
    } else {
        numero.setCustomValidity("");
    }
    if (numeroId.value == "") {
        numeroId.setCustomValidity("¡Ingrese un ID!");
    } else if (existeId(numeroId)) {
        numeroId.setCustomValidity("¡El ID ya existe!");
    } else {
        numeroId.setCustomValidity("");
    }
    cerrarForm(e);
}
function formulario(e) {
    e.preventDefault();
    productos.push(
        new Producto(
            numero.value,
            numeroId.value,
            producto.value.toLowerCase(),
            marca.value.toLowerCase(),
            cantidad.value,
            precio.value
        )
    );
    agregarProducto(productos);
    limpiarInput();
    aJson(productos);
}
const form = document.querySelector("#agregarProducto");
form.addEventListener("input", validarForm);
// Accedo al formulario para capturar los datos despues del submit.
const formularioProductos = document.querySelector(".modal-add");
formularioProductos.addEventListener("submit", formulario);

//Funciones para eliminar del dom y del array el producto y actualizar el localStorage.
const eliminarProducto = (enDom, enDomId) => {
    const resultado = productos.find((producto) => producto.id == enDomId);
    let indice = productos.indexOf(resultado);
    productos.splice(indice, 1);
    enDom.remove();
    aJson(productos);
};
const eliminarSweet = (enDom, enDomId) => {
    swalWithBootstrapButtons
        .fire({
            title: "¿Quieres eliminar este producto?",
            text: "No podras restaurarlo si te arrepientes!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            color: "white",
            background: "#2b2d2f",
        })
        .then((result) => {
            if (result.isConfirmed) {
                eliminarProducto(enDom, enDomId);
                Toastify({
                    text: "Producto eliminado",
                    className: "info",
                    style: {
                        "border-radius": "7px",
                        padding: "10px",
                        background: "#01949A",
                    },
                }).showToast();
            }
        });
};
function eliminarDom(e) {
    if (e.target.tagName === "I") {
        let encontrarEnDom = e.target.parentNode.parentNode.parentNode;
        let valorEnDom = encontrarEnDom.querySelector(".numero-id").innerHTML;
        eliminarSweet(encontrarEnDom, valorEnDom);
    }
}

// Funciones para actualizar/editar objeto dentro del array.
const indice = () => {
    let buscarIndice = productos.findIndex((producto) => (producto.id == editarNumeroId));
    return buscarIndice;
};
const editar = () => {
    productos[indice()] = {
        numero: document.querySelector("#editarNumero").value,
        id: document.querySelector("#editarNid").value,
        nombre: document.querySelector("#editarNombre").value.toLowerCase(),
        marca: document.querySelector("#editarMarca").value.toLowerCase(),
        cantidad: document.querySelector("#editarCantidad").value,
        precio: document.querySelector("#editarPrecio").value,
    };
    mostrarProductos(productos);
    aJson(productos);
};
const editarSweet = () => {
    swalWithBootstrapButtons
        .fire({
            title: "¿Quieres guardar los cambios?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            background: "#2b2d2f",
            color: "white",
        })
        .then((result) => {
            if (result.isConfirmed) {
                editar();
                swalWithBootstrapButtons.fire({
                    title: "Producto Actualizado",
                    icon: "success",
                    background: "#2b2d2f",
                    color: "white",
                });
            }
        });
};
function editarArray(e) {
    if (e.target.innerHTML === "Editar") {
        let encontrarEnDom = e.target.parentNode.parentNode;
        let valorEnDom = encontrarEnDom;
        // Tomo los datos del producto seleccionado y los imprimo en los input del modal.
        editarNumero = document.querySelector("#editarNumero").value = valorEnDom.querySelector(".numero").innerHTML;
        editarNumeroId = document.querySelector("#editarNid").value = valorEnDom.querySelector(".numero-id").innerHTML;
        editarProducto = document.querySelector("#editarNombre").value = valorEnDom.querySelector(".nombre").innerHTML;
        editarMarca = document.querySelector("#editarMarca").value = valorEnDom.querySelector(".marca").innerHTML;
        editarCantidad = document.querySelector("#editarCantidad").value = valorEnDom.querySelector(".cantidad").innerHTML;
        editarPrecio = document.querySelector("#editarPrecio").value = valorEnDom.querySelector(".precio").innerHTML;
    }
    // Tómo el formulario del modal y ejecuto la funcion editar.
    let formularioEditar = document.querySelector("#editarModal");
    formularioEditar.addEventListener("click", (e) => {
        e.target.innerHTML === "Aceptar" && editarSweet();
    });
}

// agrego eventos con las funciones eliminar y editar.
listaProductos.addEventListener("click", eliminarDom);
listaProductos.addEventListener("click", editarArray);


// funciones para ordenar la lista de productos segun conveniencia.
const ordenAlfabeticoNombreA = (arrayProductos) => {
    arrayProductos.sort((a, b) => {
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
            return 1;
        } else if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    });
    ordenProducto = false;
};
const ordenAlfabeticoNombreZ = (arrayProductos) => {
    arrayProductos.sort((a, b) => {
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            return 1;
        } else if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    });
    ordenProducto = true;
};
const ordenAlfabeticoMarcaA = (arrayProductos) => {
    arrayProductos.sort((a, b) => {
        if (a.marca.toLowerCase() > b.marca.toLowerCase()) {
            return 1;
        } else if (a.marca.toLowerCase() < b.marca.toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    });
    ordenProducto = false;
};
const ordenAlfabeticoMarcaZ = (arrayProductos) => {
    arrayProductos.sort((a, b) => {
        if (a.marca.toLowerCase() < b.marca.toLowerCase()) {
            return 1;
        } else if (a.marca.toLowerCase() > b.marca.toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    });
    ordenProducto = true;
};
// Casos para ordenar la lista.
const botonesOrdenar = document.querySelector("#ordenarLista");
botonesOrdenar.addEventListener("click", (e) => {
    switch (e.target.innerHTML) {
        case "Número":
            ordenProducto == true ? productos.sort((a, b) => a.numero - b.numero) && (ordenProducto = false) : productos.sort((a, b) => b.numero - a.numero) && (ordenProducto = true);
            mostrarProductos(productos);
            break;
        case "ID":
            ordenProducto == true ? productos.sort((a, b) => a.id - b.id) && (ordenProducto = false) : productos.sort((a, b) => b.id - a.id) && (ordenProducto = true);
            mostrarProductos(productos);
            break;
        case "Producto":
            ordenProducto == true ? ordenAlfabeticoNombreA(productos) : ordenAlfabeticoNombreZ(productos);
            mostrarProductos(productos);
            break;
        case "Marca":
            ordenProducto == true ? ordenAlfabeticoMarcaA(productos) : ordenAlfabeticoMarcaZ(productos);
            mostrarProductos(productos);
            break;
        case "Cantidad":
            ordenProducto == true ? productos.sort((a, b) => a.cantidad - b.cantidad) && (ordenProducto = false) : productos.sort((a, b) => b.cantidad - a.cantidad) && (ordenProducto = true);
            mostrarProductos(productos);
            break;
        case "Precio":
            ordenProducto == true ? productos.sort((a, b) => a.precio - b.precio) && (ordenProducto = false) : productos.sort((a, b) => b.precio - a.precio) && (ordenProducto = true);
            mostrarProductos(productos);
            break;
    }
});

// Funcion para buscar un elemento en el dom y mostrarlo.
const buscarEnDom = () => {
    let buscador = document.querySelector("#buscar");
    buscador.addEventListener("input", () => {
        const buscar = productos.filter((contenido) => contenido.nombre.includes(buscador.value.toLowerCase()));
        mostrarProductos(buscar);
    });
};
buscarEnDom();