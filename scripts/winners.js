function obtenerElementos(){
    btnInicio = document.getElementsByClassName("btnNav")[0];
    btnGanadores = document.getElementsByClassName("btnNav")[1];
    btnContacto = document.getElementsByClassName("btnNav")[2];
    btnCodigo = document.getElementsByClassName("btnNav")[3];
    loading = document.getElementsByClassName("gif")[0];
    texto = document.getElementsByClassName("text")[0];
    titulo = document.querySelector("h2");
    if (localStorage.partidasGanadas == null) {
        partidasGanadas = null;
    } else {
    partidasGanadas = JSON.parse(localStorage.partidasGanadas);
    }
}

window.onload = () => {
    obtenerElementos();
    loading.classList.remove("hidden");
    texto.classList.remove("hidden");
    sessionStorage.clear();
    btnInicio.onclick = () => location = "./index.html";
    btnGanadores.onclick = () => location = "./winners.html";
    btnContacto.onclick = () => location = "./contact.html";
    btnCodigo.onclick = () => location.href = "https://github.com/beberfabricio/Beber_Fabricio-Wordle";
    setTimeout(llenarTabla, 1000);
}

function llenarTabla(){
    if (partidasGanadas == null) {
        titulo.innerHTML = "Aún no se han registrado ganadores :/";
        loading.classList.add("hidden");
        texto.classList.add("hidden");
        titulo.classList.remove("hidden");
        return;
    }
    loading.classList.add("hidden");
    texto.classList.add("hidden");
    titulo.classList.remove("hidden");
    let head = `
    <tr><th>Jugador</th>
    <th>Palabra</th>
    <th>Tiempo</th>
    <th>Fecha</th></tr>`;
    let body = "";
    for (let i = 0; i < partidasGanadas.length; i++) {
        body += `
        <tr><td>${partidasGanadas[i].jugador}</td>
        <td>${partidasGanadas[i].palabra.toUpperCase()}</td>
        <td>${partidasGanadas[i].minutos.toString().padStart(2,"0")}:${partidasGanadas[i].segundos.toString().padStart(2,"0")}</td>
        <td>${partidasGanadas[i].fecha} - ${partidasGanadas[i].hora}</td></tr>`;
    }
    document.getElementById("encabezado").innerHTML = head;
    document.getElementById("contenido").innerHTML = body;
}