function obtenerElementos(){
    btnJugar = document.getElementById("btnJugar");
    nombre = document.getElementById("txtNombre");
    gifLoad = document.getElementsByClassName("form-img")[0];
    modal = document.getElementById("sctModal");
    btnCargarP = document.getElementsByClassName("modal-btn")[0];
    btnNuevaP = document.getElementsByClassName("modal-btn")[1];
    btnCancelar = document.getElementsByClassName("modal-btn")[2];
    modalTitle = document.getElementsByClassName("modal-title")[0];
    modalText = document.getElementsByClassName("modal-text")[0];
    btnInicio = document.getElementsByClassName("btnNav")[0];
    btnGanadores = document.getElementsByClassName("btnNav")[1];
    btnContacto = document.getElementsByClassName("btnNav")[2];
    if (localStorage.partidasGuardadas != null) {
        guardadasLS = JSON.parse(localStorage.partidasGuardadas);
    } else {
        guardadasLS = [];
    }
}

var partidaCargada;

window.onload = () =>{
    obtenerElementos();
    ocultarLabels();
    btnJugar.onclick = (e) => {
        e.preventDefault();
        if (validarCampos()) {
            gifLoad.classList.remove("hidden");
            setTimeout(verificarPartida,500);
        }
    }
    btnInicio.onclick = () => location = "./index.html";
    btnGanadores.onclick = () => location = "./winners.html";
    btnContacto.onclick = () => location = "./contact.html";
}

function verificarPartida() {
    let nroPartida;
    partidaCargada = null;

    for (let i = 0; i < guardadasLS.length; i++) {
        if (guardadasLS[i].jugador.toLowerCase() == nombre.value.toLowerCase()) {
            partidaCargada = guardadasLS[i];
            nroPartida = i;
        }
    }

    if (partidaCargada != null) {
        mostrarModal();
        gifLoad.classList.add("hidden");
        btnCargarP.onclick = () => {
            sessionStorage.partida = JSON.stringify(partidaCargada);
            sessionStorage.nroPartida = nroPartida;
            jugar();
        }
        btnNuevaP.onclick = () => {
            guardadasLS.splice(nroPartida,1);
            localStorage.partidasGuardadas = JSON.stringify(guardadasLS);
            jugar();
        }
        btnCancelar.onclick = () => {
            sessionStorage.removeItem("nombre");
            nombre.value = "";
            modal.classList.remove("modal-show");
        }
    } else {
        jugar();
    }
}

function jugar(){
    sessionStorage.nombre = nombre.value;
    location = "./wordle.html";
}

function validarCampos() {
    validate = true;
    if (nombre.value.length < 3) {
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
    modalTitle.innerHTML = "¡Partida encontrada!"
    modalTitle.style.color = "green";
    modalText.style.fontWeight = 400;
    document.getElementById("nombre").innerHTML = partidaCargada.jugador;
    document.getElementById("fecha").innerHTML = partidaCargada.fecha;
    document.getElementById("hora").innerHTML = partidaCargada.hora;
    modal.classList.add("modal-show");
}