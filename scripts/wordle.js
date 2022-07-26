if (sessionStorage.nombre == null) {
    location = "./index.html";
}

function obtenerElementos(){
    inputs = document.querySelectorAll("input");
    filas = document.querySelectorAll("fieldset");
    modal = document.getElementById("sctModal");
    modalClose = document.getElementsByClassName("modal-close")[0];
    modalTitle = document.getElementsByClassName("modal-title")[0];
    modalText = document.getElementsByClassName("modal-text")[0];
    modalImage = document.getElementsByClassName("modal-img")[0];
    btnGuardar = document.getElementsByClassName("btnGuardar")[0];
    gifLoad = document.getElementsByClassName("gifLoad")[0];
    pNombre = document.getElementsByClassName("nombre-cronometro")[0];
    pCronometro = document.getElementsByClassName("nombre-cronometro")[1];
}

let palabra = "holas";

var matriz = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]

var respuestas = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]

var colorTablero = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]

var color = {
    VERDE: 1,
    AMARILLO: 2,
    GRIS: 3
}

var cronometro;

window.onload = () => {
    obtenerElementos();
    for (let i = 0; i < filas.length; i++) {
        if (i != 0) {
            filas[i].disabled = true;
        }
    }
    pNombre.innerHTML = `Hola ${sessionStorage.nombre}`;
    var mins = 0;
    var segs = 0;
    iniciarCronometro(mins,segs);
    inputs[0].focus();
    inputs.forEach(x => x.onkeyup = saltarInput);
    inicio();
    btnGuardar.onclick = (e) => {
        gifLoad.classList.toggle("hidden",false);
        setTimeout(guardarPartida,500);
    }
}

function cargarPartidaGuardada(){
    matriz = JSON.parse(localStorage.partidasGanadas)[0].tablero;
    colorTablero = JSON.parse(localStorage.partidasGanadas)[0].color;
    for (let f = 0; f < matriz.length; f++) {
        for (let c = 0; c < matriz[f].length; c++) {
            let input = document.getElementById(`f${f}c${c}`);
            if(matriz[f][c] != 0){
                input.value = matriz[f][c];
            }
        }
    }
    pintarTablero();
    mins = JSON.parse(localStorage.partidasGanadas)[0].minutos;
    segs = JSON.parse(localStorage.partidasGanadas)[0].segundos;
    iniciarCronometro(mins,segs);
    inicio();
}

function saltarInput(e){
    if (e.keyCode === 32) { //SPACE
        if (e.target.value.length === 1) {
            e.target.value = "";
        }
        return;
    }
    if (e.keyCode === 8) { //BACKSPACE
        if (e.target.value.length === 1) {
            return;
        }
        let prev = e.target.previousElementSibling;
        if (!prev) {
            return;
        }
        if (prev.tagName.toLowerCase() === "input") {
            prev.value = "";
            prev.focus();
        }
    }
    if (e.target.value.length == 1) {
        let next = e.target.nextElementSibling;
        if (!next) {
            return;
        }
        if (next.tagName.toLowerCase() === "input") {
            next.focus();
        }
    }
}

function pintarTablero(){
    for (let f = 0; f < matriz.length; f++) {
        for (let c = 0; c < matriz[f].length; c++) {
            let input = document.getElementById(`f${f}c${c}`);
            switch (colorTablero[f][c]) {
                case color.VERDE: 
                input.classList.add("verde");
                    break;
                case color.AMARILLO: 
                input.classList.add("amarillo");
                    break;
                case color.GRIS: 
                input.classList.add("gris");
                    break;
            }
        }
    }
}

function inicio(){
    for (let f = 0; f < matriz.length; f++) {
        document.getElementById(`row${f}`).onkeydown = function fn(e){
            if (e.keyCode === 13) { //ENTER
                guardarRespuesta(f);
            }
        }
    }
}

function guardarRespuesta(f){
    respuestas[f] = [];
    for (let c = 0; c < matriz[c].length; c++) {
        let input = document.getElementById(`f${f}c${c}`);
        respuestas[f].push(input.value);
    }
    revisarResultado(respuestas[f],f);
}

function revisarResultado(respuesta,f){
    let palabraArray = Array.from(palabra);
    var letrasCorrectas = 0;
    palabraArray.forEach(function(x,i){
        if (x === respuesta[i]) {
            colorTablero[f][i] = 1;
            letrasCorrectas++;
        }else
        {
            if (palabraArray.includes(respuesta[i])) {
                colorTablero[f][i] = 2;
            }else{
                colorTablero[f][i] = 3;
            }
        }
    })
    pintarTablero();
    siguienteFila(f,letrasCorrectas);
    console.log(f);
}

function siguienteFila(f,letrasCorrectas){
    filas[f].disabled = true;
    if (letrasCorrectas === palabra.length) {
        mostrarModal("win");
        return;
    }
    fSig = f + 1;
    if (fSig == 6) {
        mostrarModal("lose");
        return;
    }
    filas[fSig].disabled = false;
    document.getElementById(`f${fSig}c0`).focus();
}

function mostrarModal(resultado){
    if (resultado == "win") {
        modalImage.src = "images/success_icon.png";
        modalTitle.innerHTML = "¡Ganaste!"
        modalTitle.style.color = "blue";
        modalText.innerHTML = "Acertaste! La palabra era " + palabra.toUpperCase() + ", tu partida ha quedado registrada.";
        modal.classList.add("modal-show");
        guardarPartidaGanada();
    }else if(resultado == "lose"){
        modalImage.src = "images/error_icon.png";
        modalTitle.innerHTML = "¡Perdiste!"
        modalTitle.style.color = "red";
        modalText.innerHTML = "La palabra era " + palabra.toUpperCase();
        modal.classList.add("modal-show");
    }else if(resultado == "save"){
        modalImage.src = "images/saved_icon.png";
        modalTitle.innerHTML = "¡Partida guardada!"
        modalTitle.style.color = "green";
        modalText.innerHTML = sessionStorage.nombre + ", tu partida ha sido guardada. Puedes cargarla ingresando tu nombre nuevamente.";
        modal.classList.add("modal-show");
    }else {
        clearInterval(cronometro);
        modalImage.src = "images/error_icon.png";
        modalTitle.innerHTML = "¡Error!"
        modalTitle.style.color = "red";
        modalText.innerHTML = "Aún no hay nada para guardar! Por favor, comienza a jugar para poder guardar la partida.";
        modal.classList.add("modal-show");
    }

    if (resultado != "error") {
        modalClose.onclick = function(){
            modal.classList.remove("modal-show");
        }
        window.onclick = function(e) {
            if (e.target == modal) {
                modal.classList.remove("modal-show");
            }
        }
    }else {
        modalClose.onclick = function(){
            modal.classList.remove("modal-show");
            iniciarCronometro(mins,segs);
        }
        window.onclick = function(e) {
            if (e.target == modal) {
                modal.classList.remove("modal-show");
                iniciarCronometro(mins,segs);
            }
        }
    }

    return;
}

function iniciarCronometro(m,s){
    cronometro = setInterval(function(){
        if (s >= 60) {
            s = 0;
            m++;
        }        
        pCronometro.innerHTML = `Tu tiempo es ${m}:${s}`;
        s++;
        mins = m;
        segs = s;
        console.log(segs, s);
    },1000)
}

function detenerJuego(){
    clearInterval(cronometro);
    filas.forEach(x => {
        x.disabled = true;
    });
    btnGuardar.disabled = true;
}

function guardarPartida(){
    gifLoad.classList.toggle("hidden",true);
    if (JSON.stringify(respuestas) === JSON.stringify(matriz)) {
        mostrarModal("error");
        return;
    }
    detenerJuego();
    let partida = {
        jugador: sessionStorage.nombre,
        palabra: palabra,
        tablero: respuestas,
        minutos: mins,
        segundos: segs,
        intentos: 3
    }
    if (localStorage.partidasGuardadas == null) {
        var partidasGuardadas = [];
    }else {
        var partidasGuardadas = JSON.parse(localStorage.partidasGuardadas);
    }
    partidasGuardadas.push(partida);
    localStorage.partidasGuardadas = JSON.stringify(partidasGuardadas);
    mostrarModal("save");
}

function guardarPartidaGanada(){
    detenerJuego();
    let fechaActual = new Date();
    let ganada = {
        jugador: sessionStorage.nombre,
        palabra: palabra,
        tablero: respuestas,
        color: colorTablero,
        minutos: mins,
        segundos: segs,
        intentos: 3,
        fecha: fechaActual.toLocaleDateString()
    }
    if (localStorage.partidasGanadas == null) {
        var partidasGanadas = [];
    }else {
        var partidasGanadas = JSON.parse(localStorage.partidasGanadas);
    }
    partidasGanadas.push(ganada);
    console.log(partidasGanadas);
    localStorage.partidasGanadas = JSON.stringify(partidasGanadas);
}