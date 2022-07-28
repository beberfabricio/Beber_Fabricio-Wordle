function obtenerElementos(){
    btnJugar = document.getElementById("btnJugar");
    nombre = document.getElementById("txtNombre");
    gifLoad = document.getElementsByClassName("form-img")[0];
    modal = document.getElementById("sctModal");
    modalTable = document.getElementById("table");
    modalCancelar = document.getElementsByClassName("modal-btn")[0];
    modalTitle = document.getElementsByClassName("modal-title")[0];
    modalText = document.getElementsByClassName("modal-text")[0];
    modalLoading = document.getElementsByClassName("gif")[0];
    modalLoadingT = document.getElementsByClassName("text")[0];
    btnInicio = document.getElementsByClassName("btnNav")[0];
    btnGanadores = document.getElementsByClassName("btnNav")[1];
    btnContacto = document.getElementsByClassName("btnNav")[2];
    btnCodigo = document.getElementsByClassName("btnNav")[3];
    if (localStorage.partidasGuardadas != null) {
        guardadasLS = JSON.parse(localStorage.partidasGuardadas);
    } else {
        guardadasLS = [];
    }
}

var partidaCargada;

window.onload = () => {
    sessionStorage.clear();
    obtenerElementos();
    ocultarLabels();
    btnJugar.onclick = (e) => {
        e.preventDefault();
        if (nombre.value == "") {
            mostrarModal();
            modalTable.classList.add("hidden");
            modalTitle.classList.add("hidden");
            modalCancelar.classList.add("hidden");
            modalLoading.classList.remove("hidden");
            modalLoadingT.classList.remove("hidden");
            setTimeout(mostrarPartidasGuardadas,500);
        } else if (validarCampos()) {
            gifLoad.classList.remove("hidden");
            setTimeout(jugar,500);
        }
    }
    btnInicio.onclick = () => location = "./index.html";
    btnGanadores.onclick = () => location = "./winners.html";
    btnContacto.onclick = () => location = "./contact.html";
    btnCodigo.onclick = () => location.href = "https://github.com/beberfabricio/Beber_Fabricio-Wordle";
}

function jugar(){
    sessionStorage.nombre = nombre.value;
    location = "./wordle.html";
}

function validarCampos() {
    validate = true;
    if (nombre.value.length < 3 && nombre.value != "") {
        nombre.labels[1].classList.toggle("hidden",false);
        validate = false;
    }
    return validate;
}

function ocultarLabels(){
    nombre.onfocus = () => {
        nombre.labels[1].classList.toggle("hidden",true);
    }
}

function mostrarModal(){
    modal.classList.add("modal-show");
    modalCancelar.onclick = () => {        
        modal.classList.remove("modal-show");
    }
    window.onclick = function(e) {
        if (e.target == modal) {
            modal.classList.remove("modal-show");
        }
    }
}

function llenarTabla(){
    let head = `
    <tr><th>ID</th>
    <th>Jugador</th>
    <th>Tiempo</th>
    <th>Fecha</th></tr>`;
    let body = "";
    for (let i = 0; i < guardadasLS.length; i++) {
        body += `
        <tr name="partida"><td>${i}</td>
        <td>${guardadasLS[i].jugador}</td>
        <td>${guardadasLS[i].minutos.toString().padStart(2,"0")}:${guardadasLS[i].segundos.toString().padStart(2,"0")}</td>
        <td>${guardadasLS[i].fecha} - ${guardadasLS[i].hora}</td></tr>`;
    }
    document.getElementById("encabezado").innerHTML = head;
    document.getElementById("contenido").innerHTML = body;
}

function mostrarPartidasGuardadas(){
    if (guardadasLS == null || guardadasLS.length == 0) {
        noExistenPartidas();
        return;
    }
    llenarTabla();
    let tr = document.getElementsByName("partida");
    tr.forEach(x => {
        x.onclick = (e) => {
            let id = e.path[1].innerHTML.split(">")[1];
            id = id.toString().split("<")[0];
            partidaCargada = guardadasLS[id];
            sessionStorage.partida = JSON.stringify(partidaCargada);
            sessionStorage.nroPartida = id;
            jugar();
        }
    });
    existenPartidas();
}

function noExistenPartidas(){
    modalLoading.classList.add("hidden");
    modalLoadingT.classList.add("hidden");
    modalTitle.innerHTML = "No existe ninguna partida guardada :/";
    modalTitle.style.fontSize = "35px";
    modalTitle.style.marginTop = "70px";
    modalTitle.classList.remove("hidden");
    modalCancelar.classList.remove("hidden");
}

function existenPartidas(){
    modalLoading.classList.add("hidden");
    modalLoadingT.classList.add("hidden");
    modalTitle.innerHTML = "Partidas guardadas";
    modalTitle.classList.remove("hidden");
    modalCancelar.classList.remove("hidden");
    modalTable.classList.remove("hidden");
}