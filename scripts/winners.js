function obtenerElementos(){
    btnInicio = document.getElementsByClassName("btnNav")[0];
    btnGanadores = document.getElementsByClassName("btnNav")[1];
    btnContacto = document.getElementsByClassName("btnNav")[2];
    btnCodigo = document.getElementsByClassName("btnNav")[3];
}

window.onload = () => {
    sessionStorage.clear();
    obtenerElementos();
    btnInicio.onclick = () => location = "./index.html";
    btnGanadores.onclick = () => location = "./winners.html";
    btnContacto.onclick = () => location = "./contact.html";
    btnCodigo.onclick = () => location.href = "https://github.com/beberfabricio/Beber_Fabricio-Wordle";
}