function obtenerElementos(){
    btnJugar = document.getElementById("btnJugar");
    nombre = document.getElementById("txtNombre");
    gifLoad = document.getElementsByClassName("form-img")[0];
}

window.onload = () =>{
    obtenerElementos();
    ocultarLabels();
    btnJugar.onclick = (e) => {
        e.preventDefault();
        if (validarCampos()) {
            gifLoad.classList.toggle("hidden",false);
            setTimeout(jugar,500);
        }
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