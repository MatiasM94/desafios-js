const recibirJson = async () => {
    const resp = await fetch("https://randomuser.me/api/?results=10&inc=id,name,phone,email")
    const data = await resp.json()
    let listaDom = document.createElement("div");
    data.results.forEach((post) =>{
        const listaDom = document.createElement("div");
        listaDom.innerHTML = `<div class="contenedorNumero"><p class="numero">${post.id.value}</p></div><div class="contenedorId"><p class="numero-id">${post.name.last}</p></div><div><p class="nombre">${post.name.first}</p></div><div class="contenedorMarca"><p class="marca">${post.phone}</p></div><div><p class="cantidad">${post.email}</p></div>`;
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
        mostrarCliente.innerHTML = `<div class="contenedorNumero"><p class="numero">${cliente.id.value}</p></div><div class="contenedorId"><p class="numero-id">${cliente.name.last}</p></div><div><p class="nombre">${cliente.name.first}</p></div><div class="contenedorMarca"><p class="marca">${cliente.phone}</p></div><div><p class="cantidad">${cliente.email}</p></div>`;
        mostrarCliente.className = "indice-lista__clientes";
        document.querySelector("#lista-clientes").appendChild(mostrarCliente);
    })
}
