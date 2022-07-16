function obtenerElementos(){
    inputs = document.querySelectorAll("input");
    filas = document.querySelectorAll("fieldset");
    modal = document.getElementById("sctModal");
    modalClose = document.getElementsByClassName("modal-close")[0];
    modalTitle = document.getElementsByClassName("modal-title")[0];
    modalText = document.getElementsByClassName("modal-text")[0];
    modalImage = document.getElementsByClassName("modal-img")[0];
}
let palabra = "holas";
var matriz = [
    [1,2,3,4,5],
    [2,5,6,7,8],
    [5,6,4,3,2],
    [9,4,7,9,7],
    [2,6,3,8,9],
    [7,3,8,2,5]
]
var colorTablero = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]
var respuestas = [
    [],
    [],
    [],
    [],
    [],
    []
];
var color = {
    VERDE: 1,
    AMARILLO: 2,
    GRIS: 3
}


window.onload = () => {
    obtenerElementos();
    for (let i = 0; i < filas.length; i++) {
        if (i != 0) {
            filas[i].disabled = true;
        }
    }
    inputs[0].focus();
    inputs.forEach(x => x.onkeyup = saltarInput);
    pintarTablero();
    inicio();
}

function saltarInput(e){
    if (e.keyCode === 32) {
        if (e.target.value.length === 1) {
            e.target.value = "";
        }
        return;
    }
    if (e.keyCode === 8) {
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
        let fila = document.getElementById(`row${f}`);
        fila.onkeydown = function fn(e){
            if (e.keyCode === 13) {
                guardarRespuesta(f);
            }
        }
    }
}

function guardarRespuesta(f){
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
        modalTitle.style.color="blue";
        modalText.innerHTML = "Acertaste! La palabra era " + palabra.toUpperCase();
        modal.classList.add("modal-show");
    }else{
        modalImage.src = "images/error_icon.png";
        modalTitle.innerHTML = "¡Perdiste!"
        modalTitle.style.color="red";
        modalText.innerHTML = "La palabra era " + palabra.toUpperCase();
        modal.classList.add("modal-show");
    }
    modalClose.onclick = function(){
        modal.classList.remove("modal-show");
    }
    window.onclick = function(e) {
        if (e.target == modal) {
            modal.classList.remove("modal-show");
        }
    }
    return;
}