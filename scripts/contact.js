function obtenerElementos() {
    submit = document.getElementById("btnEnviar");
    nombre = document.getElementById("txtNombre");
    email = document.getElementById("txtEmail");
    mensaje = document.getElementById("txtMensaje");
    inputs = document.querySelectorAll("input[type=text]");
    btnInicio = document.getElementsByClassName("btnNav")[0];
    btnGanadores = document.getElementsByClassName("btnNav")[1];
    btnContacto = document.getElementsByClassName("btnNav")[2];
    btnCodigo = document.getElementsByClassName("btnNav")[3];
}

window.onload = () => {
    sessionStorage.clear();
    obtenerElementos();
    ocultarLabels();
    submit.onclick = (e) => {
        e.preventDefault();
        if (validarCampos()) {
            location.href = `mailto:beberfabricio@gmail.com?subject=Mensaje de ${nombre.value}&body=${mensaje.value}`;
        }
    }
    btnInicio.onclick = () => location = "./index.html";
    btnGanadores.onclick = () => location = "./winners.html";
    btnContacto.onclick = () => location = "./contact.html";
    btnCodigo.onclick = () => location.href = "https://github.com/beberfabricio/Beber_Fabricio-Wordle";
}

function validarCampos() {
    validate = true;
    if (nombre.value.length < 3) {
        nombre.labels[1].classList.remove("hidden");
        validate = false;
    }
    if (!email.value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
        email.labels[1].classList.remove("hidden");
        validate = false;
    }
    if (mensaje.value.length < 6) {
        mensaje.labels[1].classList.remove("hidden");
        validate = false;
    }
    return validate;
}

function ocultarLabels(){
    inputs.forEach((x) => {
        x.onfocus = () => x.labels[1].classList.add("hidden");
    });

    mensaje.onfocus = () => mensaje.labels[1].classList.add("hidden");
}