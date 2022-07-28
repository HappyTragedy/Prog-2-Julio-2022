let jugadores;

function loadPlayers() {
    jugadores = JSON.parse(window.localStorage.getItem("jugadores"));

    let anuncio = document.createElement("h1");
    let j1y2 = document.createElement("span");

    anuncio.setAttribute("class", "anuncioJugadores");
    j1y2.setAttribute("class", "jugadores");

    anuncio.innerHTML = "Los jugadores son: ";
    j1y2.innerHTML = jugadores[0].nick + " y " + jugadores[1].nick;

    document.getElementById("names").appendChild(anuncio);
    document.getElementsByClassName("anuncioJugadores")[0].appendChild(j1y2);

    let elA = document.getElementsByClassName("edPerfil")[0];
    elA.parentNode.insertBefore(anuncio, elA);



    document.getElementsByClassName("p1")[0].innerHTML = jugadores[0].nick;
    document.getElementsByClassName("p2")[0].innerHTML = jugadores[1].nick;

    document.getElementsByClassName("game1T")[0].innerHTML = jugadores[0].scoreTateti;
    document.getElementsByClassName("game1T")[1].innerHTML = jugadores[1].scoreTateti;

    document.getElementsByClassName("game1G")[0].innerHTML = jugadores[0].scoreGenerala;
    document.getElementsByClassName("game1G")[1].innerHTML = jugadores[1].scoreGenerala;

    document.getElementsByClassName("game1P")[0].innerHTML = jugadores[0].scorePong;
    document.getElementsByClassName("game1P")[1].innerHTML = jugadores[1].scorePong;


    jugadores[0].scoreTotal = jugadores[0].scoreTateti + jugadores[0].scoreGenerala + jugadores[0].scorePong;
    jugadores[1].scoreTotal = jugadores[1].scoreTateti + jugadores[1].scoreGenerala + jugadores[1].scorePong;

    document.getElementsByClassName("game1Total")[0].innerHTML = jugadores[0].scoreTotal;
    document.getElementsByClassName("game1Total")[1].innerHTML = jugadores[1].scoreTotal;
}

function tateti() {
    window.location.href = "Tateti/index.html";

}

function generala() {
    window.location.href = "Generala/index.html";

}

function pong() {
    screen.orientation.lock("landscape");
    window.location.href = "Pong/index.html";

}