let gibPlayers,
    photo,
    usuario,
    players = [
        {
            name: "",
            nick: "",
            img: "",
            color: "#547cff",
            scoreTateti: 0,
            scoreGenerala: 0,
            scorePong: 0,
            scoreTotal: 0
        },

        {
            name: "",
            nick: "",
            img: "",
            color: "#ff5681",
            scoreTateti: 0,
            scoreGenerala: 0,
            scorePong: 0,
            scoreTotal: 0
        }
    ];

photo = document.getElementById("foto");
usuario = document.getElementsByClassName("fa-user")[0];


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
}

function takePicture() {
    let cameraOptions = {
        quality: 30,
        mediaType: Camera.MediaType.PICTURE,
        destinationType: Camera.DestinationType.DATA_URL,
        correctOrientation: true
    };
    navigator.camera.getPicture(onSuccess, onFail, cameraOptions);
}

function onSuccess(imgData) {
    usuario.style.display = "none";
    photo.style.display = "block";
    photo.src = "data:image/jpeg;base64," + imgData;
}

function onFail(msg) {
    alert("No se pudo tomar la foto. Motivo: " + msg);
}



function checkPlayers() {
    if (window.localStorage.getItem("jugadores") === null) {
        inicio();
    } else {
        window.location.href = "integracion/juegos.html";
    }
}

function inicio() {
    let label = document.createElement("label");
    label.setAttribute("class", "dato");

    let ingrese = document.createElement("input");
    ingrese.setAttribute("type", "text");
    ingrese.setAttribute("class", "namePlayer");
    ingrese.setAttribute("value", "");

    label.innerHTML = "Nombre del jugador ";

    document.getElementsByClassName("players")[0].appendChild(label);
    document.getElementsByClassName("players")[0].appendChild(ingrese);


    let label2 = document.createElement("label");
    label2.setAttribute("class", "dato");

    let ingrese2 = document.createElement("input");
    ingrese2.setAttribute("type", "text");
    ingrese2.setAttribute("class", "nickPlayer");
    ingrese2.setAttribute("value", "");

    label2.innerHTML = "Apodo del jugador ";

    document.getElementsByClassName("players")[0].appendChild(label2);
    document.getElementsByClassName("players")[0].appendChild(ingrese2);
}

function done() {
    let nombre = document.getElementsByClassName("namePlayer")[0],
        apodo = document.getElementsByClassName("nickPlayer")[0],
        pfp = document.getElementById("foto");

    usuario.style.display = "block";
    photo.style.display = "none";

    if (players[0].name != "" && players[0].nick != "" && players[0].img != "") {//Si ya hay un primer jugador creado, va a ocuparse el nombre del segundo jugador.
        if (nombre.value === "" || apodo.value === "" || pfp.src === "") {
            alert("El campo no puede estar en blanco.");
        } else {
            players[1].name = nombre.value.trim();
            players[1].nick = apodo.value.trim();
            players[1].img = pfp.src;
            window.localStorage.setItem("jugadores", JSON.stringify(players));
            window.location.href = "integracion/juegos.html";
        }
    } else {
        if (nombre.value === "" || apodo.value === "" || pfp.src === "") {//Si está vacío que me tire el alert, sino que guarde el valor del input del primer jugador con el localStorage y después me limpia el input para que pueda poner el segundo jugador y se guarde tambien con el localStorage.
            alert("El campo no puede estar en blanco.");
        } else {
            players[0].name = nombre.value.trim();
            players[0].nick = apodo.value.trim();
            players[0].img = pfp.src;
        }
    }
    document.getElementsByClassName("namePlayer")[0].value = "";
    document.getElementsByClassName("nickPlayer")[0].value = "";
    document.getElementById("foto").src = "";
}