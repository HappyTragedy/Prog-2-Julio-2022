jugadores = JSON.parse(window.localStorage.getItem("jugadores"));



let canvas = document.getElementById("pong"), //llamo al canvas del html así no tengo que volver a escribir todo de nuevo
    quien = document.getElementById("quien"),
    ganador = document.getElementsByClassName("ganador")[0],
    h1 = document.getElementsByTagName('h1')[1],
    start = false;

let contexto = canvas.getContext("2d"); //esto me va a permitir dibujar en el canvas. Me va a dar acceso a propiedades 2D.

canvas.style.display = "none";

canvas.width = window.innerWidth
canvas.height = window.innerHeight


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    contexto = canvas.getContext("2d");
    juego();
})


contexto.fillStyle = "#0b0518"; //Con esto estoy pintando el canvas. El getContext fue el que me dejó hacer esto, por ejemplo.

//para dibujar algo en el canvas se usa el "drawRect" y está compuesto así: drawRect(el texto que puede ser los puntajes, nombre de los jugadores o cualquier cosa así, la posición en el eye "x", la posición en el eje "y", y después de eso otras cosas que necesites o tengas que mostrar que estén como datos en el objeto).


//Pantalla para seleccionar quién jugará contra la IA.

let esteJuega,
    btn1 = document.createElement("button"),
    btn2 = document.createElement("button");

btn1.setAttribute("class", "jugador1");
btn2.setAttribute("class", "jugador2");

btn1.innerHTML = jugadores[0].nick;
btn2.innerHTML = jugadores[1].nick;

quien.append(btn1, btn2);


btn1.onclick = function () {
    esteJuega = 0;
    start = true;
    empezar();
}

btn2.onclick = function () {
    esteJuega = 1;
    start = true;
    empezar();
}



//Oculto el cuadro de inicio del juego cuando le doy al botón para el jugador no tenga que empezar a jugar a penas abro el juego.
function empezar() {
    quien.style.display = "none";
    ganador.style.display = "none";
    canvas.style.display = "block";
    if (start) {
        juego();
        setTimeout(empezar, 3000);
    }
}

function revisarPuntaje() {
    //Acá digo que si la pelota es mayor al tamaño el canvas, o sea pasó de la paleta de la pc, y el puntaje del jugador es igual a 3, entonces gana el jugador la partida; sino gana la pc.
    if (pelota.x + pelota.radio > canvas.width && jugador.score === 3) {
        quien.style.display = "none";
        ganador.style.display = "block";
        canvas.style.display = "none";
        start = false;

        if (esteJuega === 0) {
            h1.innerHTML = "Ganó " + jugadores[esteJuega].nick;
            jugadores[esteJuega].scorePong = jugadores[esteJuega].scorePong + 100;
            resetPuntaje()
        } else if (esteJuega === 1) {
            h1.innerHTML = "Ganó " + jugadores[esteJuega].nick;
            jugadores[esteJuega].scorePong = jugadores[esteJuega].scorePong + 100;
            resetPuntaje()
        }


    } else if (pelota.x + pelota.radio < 0 && pc.score === 3) {
        quien.style.display = "none";
        ganador.style.display = "block";
        canvas.style.display = "none";
        start = false;

        h1.innerHTML = "Ganó la IA";
        resetPuntaje()
    }

    window.localStorage.setItem("jugadores", JSON.stringify(jugadores));

}


//---------------------------- PALETAS

//voy a crear dos objetos para crear las paletas del jugador y de la computadora
const jugador = {
    x: 10, //la posición x de la paleta del jugador es 0 porque está pegada al borde izquierdo del canvas
    y: canvas.height / 2 - 100 / 2, //para obtener cuál es la posición Y de la paleta del jugador tenemos que obtener el alto del canvas y dividirlo por 2, ya que la paleta va a empezar hubicada en el medio. Después le restamos el alto de la paleta dividido 2, ya que sino lo que va a estar en el medio del canvas va a ser la punta superior izquierda de la paleta.
    width: 10,
    height: 100,
    color: "#5d4e70",
    score: 0
}


const pc = {
    x: canvas.width - 20, //para obtener cuál es la posición x de la paleta de la computadora tenemos que obtener el ancho del canvas, pero además la paleta tiene un ancho de 10. Por esto obtenemos primero el ancho del canvas y después le restamos 10.
    y: canvas.height / 2 - 100 / 2, //idem explicación que la del otro objeto.
    width: 10,
    height: 100,
    color: "#5d4e70",
    score: 0
}




//---------------------------- LINEA SEPARADORA

//Voy a crear el objeto línea que va a hacer referencia a cada línea que compone la linea separadora, no TODA la linea en general
const linea = {
    x: canvas.width / 2 - 1, //Acá vamos a obtener el ancho del canvas y lo dividimos por 2 para centrarlo, pero como el punto 0 de la línea va a ser el extremo superior izquierdo no va a quedar 100% centrado, entonces restamos 1 para que así se centre.
    y: 0, //Ponemos 0 porque la línea va a empezar desde el borde superior del canvas.
    width: 2,
    height: 10,
    color: "#5d4e70"
}




//---------------------------- PELOTA Y SU MOVIMIENTO

//Al inicio del juego la pelota tiene que estar en el centro del canvas, así que voy a crear al objeto pelota para asignarle esos parámetros iniciales.
const pelota = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radio: 10,
    velocidad: 5, //velocidad general
    velocidadX: 5, //esto indica la velocidad horizontal
    velocidadY: 5, //esto indica la velocidad vertical
    color: "#feab3e"
}




//---------------------------- DIBUJAMOS PUNTAJES, PALETAS, LÍNEA SEPARADORA Y PELOTA

//Acá dibujo las paletas
function drawRect(x, y, width, height, color) {
    contexto.fillStyle = color;
    contexto.fillRect(x, y, width, height)
};


//Voy a hacer esta función para dibujar la línea.
function dibujarLinea() {
    for (let i = 0; i <= canvas.height; i = i + 15) {
        drawRect(linea.x, linea.y + i, linea.width, linea.height, linea.color); //Acá lo que va a pasar es que con la "x" y la "y" se va a posicionar la línea y después va a dibujarse una de 10px de alto y 2px de ancho. La segunda vuelta la "i" va a valer 15, entonces sería "0 + 15" lo que va a dibujar un espacio en negro.
    }
}


//Dibujo la pelota
function drawArc(x, y, radio, color) {
    contexto.fillStyle = color;
    contexto.beginPath();//Inicia un "camino"
    contexto.arc(x, y, radio, 0, Math.PI * 2, true);
    contexto.closePath();//Une el path actual con el primer punto del path creado por el beginPath
    contexto.fill();
};


//Dibujo el puntaje
function drawText(texto, x, y, color) {
    contexto.fillStyle = color;
    contexto.font = "45px fantasy";
    contexto.fillText(texto, x, y);
}



//--------------------------- MOVER LA PALETA CON EL DEDO

function moveTouch(evt) {
    evt.preventDefault();
    let rect = canvas.getBoundingClientRect();//regresa el tamaño y la posición de un elemento.
    let relativeY = evt.touches[0].clientY - rect.top;//guarda los cambios en las coordenadas en Y.
    //Toma el objeto desde el centro para que, no importa donde toques la pantalla, siempre va a ser desde el centro de la paleta.
    if (relativeY > 0 && relativeY < canvas.height) {
        jugador.y = relativeY - jugador.height / 2;
    }
}


//---------------------------- COLISIONES CON LAS PALETAS

//Voy a hacer una función que va a tener como parámetros a la pelota y al usuario.
function colision(p, u) {
    u.top = u.y; //Acá digo que la parte superior de la paleta del jugador es el eje "y"
    u.bottom = u.y + u.height; //Y acá digo que la parte inferior de la paleta es la suma entre el eje "y" y la altura de la paleta.
    u.left = u.x;//Tanto acá como en el de abajo decimos lo mismo que los otros dos, pero trabajando con los laterales de la paleta.
    u.right = u.x + u.width;


    p.top = p.y - p.radio; //Ahora hacemos lo mismo con la pelota. Para obtener la parte superior de la pelota tenemos que restarle al punto medio de la misma su radio.
    p.bottom = p.y + p.radio;
    p.left = p.x - p.radio;
    p.right = p.x + p.radio;

    return u.left < p.right && u.top < p.bottom && u.right > p.left && u.bottom > p.top; //Esto me va a servir para saber si hay o no colisión entre la pelota y las paletas, según quién juegue (la pc o el jugador)
}



//---------------------------- RESETEO LA PELOTA CUANDO ALGUNO DE LOS DOS ANOTA

function resetPelota() {
    pelota.x = canvas.width / 2;
    pelota.y = canvas.height / 2;
    pelota.velocidadX = -pelota.velocidadX;
    pelota.velocidad = 5;
}


//---------------------------- RESETEO LOS PUNTAJES CADA VEZ QUE UNO GANA

function resetPuntaje() {
    jugador.score = 0;
    pc.score = 0;
}


//---------------------------- ACTUALIZACIÓN DEL JUEGO

function actualizar() {

    //Acá sólo me estoy fijando quién es el que anotó. Si la pelota fue hacia la izquierda, anotó la computadora y si fue hacia la derecha, anotó el usuario.
    if (pelota.x + pelota.radio < 0) {
        pc.score++;
        revisarPuntaje();
        resetPelota();

    } else if (pelota.x + pelota.radio > canvas.width) {
        jugador.score++;
        revisarPuntaje();
        resetPelota();
    }

    //Al hacer esto estamos diciendo que la pelota va a ir en diagonal hacia abajo a la derecha, pero si restamos la velocidadY, la pelota va a ir en diagonal para arriba a la derecha.
    pelota.x = pelota.x + pelota.velocidadX;
    pelota.y = pelota.y + pelota.velocidadY;

    //IA para la otra paleta
    let nivelPC = 0.1;

    pc.y += (pelota.y - (pc.y + pc.height / 2)) * nivelPC; //Acá primero hago la diferencia entre el centro de la pelota y el centro de la paleta de la pc. Incremento la paleta de la pc para que siempre siga a la pelota; pero necesito agregar una variable más para que se pueda vencer a la computadora, para eso está el "nivelPC".


    //Acá vamos a poner un if para hacer los cambios necesarios para cuando la pelota golpee alguno de los bordes del canvas (ya sea el superior o el inferior). Entonces decimos que si el punto medio de la pelota + el radio es mayor a la altura del canvas o si el punto medio de la pelota - el radio es menor a 0, la velocidad vertical (es decir la velocidad en Y) pase a ser negativa. Eso quiere decir que la pelota en vez de ir para abajo va a ir para arriba o viceversa.
    if (pelota.y + pelota.radio > canvas.height || pelota.y - pelota.radio < 0) {
        pelota.velocidadY = -pelota.velocidadY;
    }


    //Ahora, dependiendo de en qué mitad del canvas esté la pelota va a determinar quién va a ser el que esté jugando. Si la persona o la pc. Acá verificamos dónde está la pelota y, por ende, si va a ser el jugador o la pc con quién se esté probando la colision.
    let usuario = (pelota.x < canvas.width / 2) ? jugador : pc;


    if (colision(pelota, usuario)) {
        let puntoDeColision = pelota.y - (usuario.y + usuario.height / 2); //Acá vamos a checkear dónde la pelota golpea en la paleta, es decir en el medio, abajo o arriba.
        puntoDeColision = puntoDeColision / (usuario.height / 2);

        //Con esto lo que hago es que según dónde golpee la pelota va a ir no sólo en dirección contraria, sino que va a ir en un ángulo de 45º.
        let anguloDelRadio = (Math.PI / 4) * puntoDeColision;

        let direccion = (pelota.x < canvas.width / 2) ? 1 : -1 //Acá digo que si la pelota en su eje X es menor al ancho del canvas dividido por 2, entonces la velocidadX de la pelota sigue positiva por la golpeó el jugador. Sino cambia a ser negativa por la golpeó la pc.

        //Esto me va a servir para obtener la velocidadX y la velocidadY de la pelota. Una vez que tengo la dirección puedo multiplicarlo por la velocidad y el coseno o el seno del angulo.
        pelota.velocidadX = direccion * pelota.velocidad * Math.cos(anguloDelRadio);
        pelota.velocidadY = direccion * pelota.velocidad * Math.sin(anguloDelRadio);

        pelota.velocidad += 0.2;//Esto va a hacer que cada vez que la pelota golpee alguna de las paletas va a aumentar su velocidad, así se va haciendo más complicado el juego.
    }
}


//---------------------------- RENDER DEL JUEGO - 1

//Para hacer el render del juego hay que, primero, limpiar el canvas y después ir trayendo todo lo que dibujamos hasta ahora.
function render() {
    //Acá limpio el canvas
    drawRect(0, 0, canvas.width, canvas.height, "black");

    //Acá vuelvo a dibujar todo. Los puntajes
    drawText(jugador.score, canvas.width / 4, canvas.height / 5, "white");
    drawText(pc.score, 3 * canvas.width / 4, canvas.height / 5, "white");
    //La línea
    dibujarLinea();
    //Las paletas
    drawRect(jugador.x, jugador.y, jugador.width, jugador.height, jugador.color);
    drawRect(pc.x, pc.y, pc.width, pc.height, pc.color);
    //La pelota
    drawArc(pelota.x, pelota.y, pelota.radio, pelota.color);
}




//---------------------------- RENDER DEL JUEGO - 2

//Acá voy a llamar a dos funciones dentro de la función que va a llamar al juego en sí.
function juego() {
    actualizar(); //Esta función va a hacer los movimientos, va a actualizar el puntaje y va a detectar las colisiones (por ejemplo de la pelota contra las paletas).
    render();
}




//---------------------------- RENDER DEL JUEGO - 3

//Acá voy a hacer una constante donde voy a hacer la animación.
const fps = 60;

setInterval(juego, 1000 / fps); //Osea, esto lo que va a hacer es llamar a la función "juego", que a su vez va a llamar al render, 60 veces por segundo.

canvas.addEventListener('touchmove', moveTouch);

function salir() {
    screen.orientation.lock("portrait-primary");
    window.location.href = "../juegos.html"
}