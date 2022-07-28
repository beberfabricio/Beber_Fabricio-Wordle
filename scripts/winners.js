function obtenerElementos(){
    btnInicio = document.getElementsByClassName("btnNav")[0];
    btnGanadores = document.getElementsByClassName("btnNav")[1];
    btnContacto = document.getElementsByClassName("btnNav")[2];
    btnCodigo = document.getElementsByClassName("btnNav")[3];
    loading = document.getElementsByClassName("gif")[0];
    texto = document.getElementsByClassName("text")[0];
    modal = document.getElementById("sctModal");
    modalClose = document.getElementsByClassName("modal-btn")[0];
    modalTitle = document.getElementsByClassName("modal-title")[0];
    titulo = document.querySelectorAll("h2")[1];
    if (localStorage.partidasGanadas == null) {
        ganadasLS = null;
    } else {
        ganadasLS = JSON.parse(localStorage.partidasGanadas);
    }
    
}

var color = {
    BLANCO: 0,
    VERDE: 1,
    AMARILLO: 2,
    GRIS: 3
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
    if (ganadasLS == null) {
        titulo.innerHTML = "Aún no se han registrado ganadores :/";
        loading.classList.add("hidden");
        texto.classList.add("hidden");
        titulo.classList.remove("hidden");
        return;
    }
    titulo.innerHTML = "Ganadores";
    loading.classList.add("hidden");
    texto.classList.add("hidden");
    titulo.classList.remove("hidden");
    let head = `
    <tr><th>ID</th>
    <th>Jugador</th>
    <th>Palabra</th>
    <th>Tiempo</th>
    <th>Fecha</th></tr>`;
    let body = "";
    for (let i = 0; i < ganadasLS.length; i++) {
        body += `
        <tr name="partida"><td>${i}</td>
        <td>${ganadasLS[i].jugador}</td>
        <td>${ganadasLS[i].palabra.toUpperCase()}</td>
        <td>${ganadasLS[i].minutos.toString().padStart(2,"0")}:${ganadasLS[i].segundos.toString().padStart(2,"0")}</td>
        <td>${ganadasLS[i].fecha} - ${ganadasLS[i].hora}</td></tr>`;
    }
    document.getElementById("encabezado").innerHTML = head;
    document.getElementById("contenido").innerHTML = body;
    let tr = document.getElementsByName("partida");
    tr.forEach(x => {
        x.onclick = (e) => {
            let id = e.path[1].innerHTML.split(">")[1];
            id = id.toString().split("<")[0];
            mostrarModal(id);
        }
    });
}

function mostrarModal(id){
    llenarTablero(id);
    modalTitle.innerHTML = `Tablero de ${ganadasLS[id].jugador}`;
    modal.classList.add("modal-show");
    modalClose.onclick = function(){
        modal.classList.remove("modal-show");
    }
    window.onclick = function(e) {
        if (e.target == modal) {
            modal.classList.remove("modal-show");
        }
    }
}

function llenarTablero(id){
    let colorTablero = ganadasLS[id].color;
    let tablero = ganadasLS[id].tablero;
    for (let f = 0; f < 6; f++) {
        for (let c = 0; c < 5; c++) {
            let div = document.getElementById(`f${f}c${c}`);
            if (tablero[f][c] == "0") {
                div.innerHTML = "";
            } else {
                div.innerHTML = tablero[f][c].toString().toUpperCase();
            }
            switch (colorTablero[f][c]) {
                case color.VERDE: 
                div.classList.add("verde");
                div.classList.remove("amarillo");
                div.classList.remove("gris");
                div.classList.remove("blanco");
                break;
                case color.AMARILLO: 
                div.classList.add("amarillo");
                div.classList.remove("verde");
                div.classList.remove("gris");
                div.classList.remove("blanco");
                break;
                case color.GRIS: 
                div.classList.add("gris");
                div.classList.remove("amarillo");
                div.classList.remove("verde");
                div.classList.remove("blanco");
                break;
                case color.BLANCO:
                div.classList.add("blanco");
                div.classList.remove("amarillo");
                div.classList.remove("gris");
                div.classList.remove("verde");
                break;
            }
        }
    }
}