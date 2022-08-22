let numero = Number(prompt("ingrese un número para elevar hasta su potencia 10"));
for (let i = 0; i <= 10; i++) {
    if(numero >= 0 ){
    let elevado = numero ** i;
    alert(`La potencia ${i} de ${numero} es = ${elevado}` );
    }
    else {
        alert("Valor incorrecto, ingrese un número");
        break;
    }
}