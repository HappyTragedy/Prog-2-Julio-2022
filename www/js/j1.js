document.addEventListener('deviceready', onDeviceReady, false);

let photo;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
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
    photo = document.getElementById("foto");
    photo.src = "data:image/jpeg;base64," + imgData;
}

function onFail(msg) {
    alert("No se pudo tomar la foto. Motivo: " + msg);
}

function getItemEdit1() {
    jugadores = JSON.parse(window.localStorage.getItem("jugadores"));
}

function hecho() {
    let nombre = document.getElementsByClassName("nombre")[0],
        apodo = document.getElementsByClassName("nick")[0];

    jugadores[0].name = nombre.value.trim();
    jugadores[0].nick = apodo.value.trim();
    jugadores[0].img = photo.src;

    window.localStorage.setItem("jugadores", JSON.stringify(jugadores));

    window.location.href = "juegos.html";
}

function cancel() {
    window.location.href = "editar.html";
}