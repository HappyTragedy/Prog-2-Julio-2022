function editarPerfil() {
    jugadores = JSON.parse(window.localStorage.getItem("jugadores"));

    let cont = document.createElement("div");
    cont.setAttribute("class", "contEditar");

    let btn1 = document.createElement("button");
    let img1 = document.createElement("img");
    let nombre1 = document.createElement("p");
    let art1 = document.createElement("article");
    let figure1 = document.createElement("figure");

    btn1.setAttribute("class", "j1b");
    btn1.setAttribute("onclick", "editJ1()");
    img1.setAttribute("class", "j1i");
    nombre1.setAttribute("class", "j1n");
    art1.setAttribute("class", "art1");
    figure1.setAttribute("class", "fgr1");

    img1.src = jugadores[0].img;
    nombre1.innerHTML = jugadores[0].nick;
    btn1.innerHTML = "Editar";

    /*-------------------------------------------------------*/

    let btn2 = document.createElement("button");
    let img2 = document.createElement("img");
    let nombre2 = document.createElement("p");
    let art2 = document.createElement("article");
    let figure2 = document.createElement("figure");

    btn2.setAttribute("class", "j2b");
    btn2.setAttribute("onclick", "editJ2()");
    img2.setAttribute("class", "j2i");
    nombre2.setAttribute("class", "j2n");
    art2.setAttribute("class", "art2");
    figure2.setAttribute("class", "fgr2");

    img2.src = jugadores[1].img;
    nombre2.innerHTML = jugadores[1].nick;
    btn2.innerHTML = "Editar";

    document.getElementById("perfilE").appendChild(cont);
    document.getElementsByClassName("contEditar")[0].append(art1, art2);
    document.getElementsByClassName("art1")[0].append(figure1, nombre1, btn1);
    document.getElementsByClassName("art2")[0].append(figure2, nombre2, btn2);
    document.getElementsByClassName("fgr1")[0].append(img1);
    document.getElementsByClassName("fgr2")[0].append(img2);

    window.localStorage.setItem("jugadores", JSON.stringify(jugadores));
}

function editJ1() {
    window.location.href = "editarJ1.html";
}

function editJ2() {
    window.location.href = "editarJ2.html";
}

function cancel() {
    window.location.href = "juegos.html";
}

function hecho() {
    let nombreEdit = document.getElementById("usuario").value;//Guardo en la variable "nombreEdit" el valor del input donde va el nombre en "editar perfil".

    if (nombreEdit === "") {
        alert("El campo no puede estar en blanco.");
    } else {
        players[0].name = nombreEdit;
        alert("Sus datos han sido guardados con éxito.");
        window.location.href = "perfil.html";
    }
    localStorage.setItem("nuevoNombre", JSON.stringify(players));//voy a guardar el array entero con las modificaciones que hice.
}

function exit() {
    window.location.href = "../index.html";
    localStorage.clear();
}