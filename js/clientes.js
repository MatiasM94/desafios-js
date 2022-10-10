const recibirJson = async () => {
    const resp = await fetch("https://randomuser.me/api/?results=10&inc=id,name,phone,email")
    const data = await resp.json()
    let listaDom = document.createElement("div");
    data.results.forEach((post) =>{
        const listaDom = document.createElement("div");
        listaDom.innerHTML = `<div class="contenedorId"><p class="id">${post.id.value}</p></div><div><p class="apellido">${post.name.last}</p></div><div><p class="nombre">${post.name.first}</p></div><div><p class="tel">${post.phone}</p></div><div class="contenedor-email"><p class="email">${post.email}</p></div><div class="botones"><button type="button" class="boton boton-ver" data-bs-toggle="modal" data-bs-target="#editarModal">Ver</button></div>`;
        listaDom.className = "indice-lista__clientes";
        document.querySelector("#lista-clientes").appendChild(listaDom)
    })
    const buscarEnDom = () => {
        let buscador = document.querySelector("#buscar");
        buscador.addEventListener("input", () => {
            const buscar = data.results.filter((contenido) => contenido.name.last.includes(buscador.value));
            mostrarProductos(buscar)
        })
    }
    buscarEnDom()
}

recibirJson()

const mostrarProductos = (mostrarArray) => {
    let listaDom = document.querySelector("#lista-clientes").innerHTML = "";
    mostrarArray.forEach(cliente => {
        const mostrarCliente = document.createElement("div");
        mostrarCliente.innerHTML = `<div class="contenedorId"><p class="id">${cliente.id.value}</p></div><div><p class="apellido">${cliente.name.last}</p></div><div><p class="nombre">${cliente.name.first}</p></div><div><p class="tel">${cliente.phone}</p></div><div class="contenedor-email"><p class="email">${cliente.email}</p></div><div class="botones"><button type="button" class="boton boton-ver" data-bs-toggle="modal" data-bs-target="#editarModal">Ver</button></div>`;
        mostrarCliente.className = "indice-lista__clientes";
        document.querySelector("#lista-clientes").appendChild(mostrarCliente);
    })
}

// Selecciono el seccion de los productos y le agrego un evento para ejecutar las funciones que editan el producto
const verCliente = document.querySelector("#lista-clientes");

verCliente.addEventListener("click", verArray);

function verArray(event) {
    if(event.target && event.target.innerHTML === "Ver"){
        let encontrarEnDom = event.target.parentNode.parentNode
        let valorEnDom = encontrarEnDom
        // Tomo los datos del producto seleccionado y los imprimo en los input del modal.
        numero = document.querySelector("#verId").value = valorEnDom.querySelector(".id").innerHTML;
        numeroId = document.querySelector("#verApellidos").value = valorEnDom.querySelector(".apellido").innerHTML;
        producto = document.querySelector("#verNombres").value = valorEnDom.querySelector(".nombre").innerHTML;
        marca = document.querySelector("#verTel").value = valorEnDom.querySelector(".tel").innerHTML;
        cantidad = document.querySelector("#verEmail").value = valorEnDom.querySelector(".email").innerHTML;
    }
}