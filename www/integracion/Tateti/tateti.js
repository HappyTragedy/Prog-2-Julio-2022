let p1 = "X",
    p2 = "O",
    keepPlaying = true,//Esto me va a servir para ver si puedo seguir jugando, porque si están todas las celdas ocupadas o hay una combinación ganadora, no voy a poder seguir jugando.
    turno = (Math.floor(Math.random() * 2)),//Genero un número random entre 0 y 1. Esto es únicamente para el primer movimiento, lo pongo afuera del if para que se mantenga con un único número y no me genere otro nuevo cada vez que se va a realizar un movimiento.
    contC = 0, //Esto me va a servir para poder ponerle los numeros al id de cada celda (cell-0, cell-1, etc.).
    board = [ //Esto es una matriz en la cual voy a dejar guardados los movimientos realizados al jugar.
        [, ,],
        [, ,],
        [, ,]
    ];

document.getElementsByClassName("fuera")[0].style.display = "none";

function buildTable() {
    jugadores = JSON.parse(window.localStorage.getItem("jugadores"));

    document.getElementsByClassName("jugador1")[0].style.color = jugadores[0].color;
    document.getElementsByClassName("jugador2")[0].style.color = jugadores[1].color;

    document.getElementsByClassName("jugador1")[0].innerHTML = jugadores[0].nick;
    document.getElementsByClassName("jugador2")[0].innerHTML = jugadores[1].nick;
    //Acá uso el [0] porque el "getElementsByTagName" me devuelve un array y yo quiero el primero de todos, aunque sólo sea un array de un único elemento. Por eso tomo la posición 0.
    let body = document.getElementsByTagName("body")[0];
    //Creo la tabla y el tbody
    let tabla = document.createElement("table"),
        tbody = document.createElement("tbody");

    //Creo las filas con un for que vaya de 0 a 2, así a medida que pasa me crea las 3 celdas.
    for (i = 0; i <= 2; i++) {
        let filas = document.createElement("tr");

        //Ahora creo las celdas por cada paso en las filas y "las meto dentro".
        for (j = 0; j <= 2; j++) {
            let celdas = document.createElement("td");
            celdas.setAttribute("id", "cell-" + contC);//Acá le estoy danda a cada celda un id propio por cada vuelta de los for. Id que voy a necesitar para verificar luego si hay empate, alguna combinación ganadora o si hay alguna libre y se puede seguir jugando.
            celdas.setAttribute("onclick", "turn('cell-" + contC + "')");//Le voy a agregar el atributo "onclick" para verificar cada vez que haga click en la celda. La función turn es aquella que va a recibir el Id que tienen las celdas para así, si se puede seguir jugando, verificar en qué celda se hace click para colocar la ficha correspondiente o hacer nada, ya que la celda que se está clickeando está ocupada.
            contC++;//A cont le sumo 1 en cada vuelta para que la próxima celda tenga un id diferente.

            filas.appendChild(celdas);
        }
        //Meto las filas en el tbody.
        tbody.appendChild(filas);
    }
    //Y ahora meto todo en el table y el body.
    tabla.appendChild(tbody);
    body.appendChild(tabla);

    let boton = document.getElementById("reinicio");
    body.appendChild(boton);
}

function turn(cellId) {//Esta función va a alternar los turnos para poner una "X" o una "O".
    if (keepPlaying == true) {//Acá voy a preguntar si puedo seguir jugando, osea si hay una celda vacía o si aun no hay una combinación ganadora.
        if (document.getElementById(cellId).innerHTML == "") {//Acá, ya que se puede seguir jugando, voy a verificar que la celda donde clickeo está vacía. Si lo está paso a los turnos y a que el jugador ponga su ficha. Seguido a esto llamo a la función "clickedCell" para que me ponga la "X" o el "O" en la celda que yo clickee.
            clickedCell(cellId);//Si está vacía la celda donde estoy clickeando voy a llamar a la otra función para colocar la "X" o el "O".
            if (turno === 0) {//Si el número es 0, entonces el primer jugador va a realizar su movimiento yse marcará con una "x" en un div aparte que ese será el jugador que está jugando.
                document.getElementById(cellId).innerHTML = p1;
                document.getElementsByClassName("jugador1")[0].style.fontWeight = "800";
                document.getElementsByClassName("jugador1")[0].style.fontSize = "20px";
                document.getElementsByClassName("jugador2")[0].style.fontWeight = "400";
                winner();
                turno = 1;
            } else {
                document.getElementById(cellId).innerHTML = p2;
                document.getElementsByClassName("jugador1")[0].style.fontWeight = "400";
                document.getElementsByClassName("jugador2")[0].style.fontWeight = "800";
                document.getElementsByClassName("jugador2")[0].style.fontSize = "20px";
                winner();
                turno = 0;
            }
        }
    }
}

function clickedCell(cellId) {
    if (cellId == "cell-0") {
        document.getElementById("cell-0").innerHTML = turno;
        board[0][0] = turno;
    } else if (cellId == "cell-1") {
        document.getElementById("cell-1").innerHTML = turno;
        board[0][1] = turno;
    } else if (cellId == "cell-2") {
        document.getElementById("cell-2").innerHTML = turno;
        board[0][2] = turno;
    } else if (cellId == "cell-3") {
        document.getElementById("cell-3").innerHTML = turno;
        board[1][0] = turno;
    } else if (cellId == "cell-4") {
        document.getElementById("cell-4").innerHTML = turno;
        board[1][1] = turno;
    } else if (cellId == "cell-5") {
        document.getElementById("cell-5").innerHTML = turno;
        board[1][2] = turno;
    } else if (cellId == "cell-6") {
        document.getElementById("cell-6").innerHTML = turno;
        board[2][0] = turno;
    } else if (cellId == "cell-7") {
        document.getElementById("cell-7").innerHTML = turno;
        board[2][1] = turno;
    } else if (cellId == "cell-8") {
        document.getElementById("cell-8").innerHTML = turno;
        board[2][2] = turno;
    }
}

function winner() {
    //El if va a verificar cada una de las combinaciones ganadoras que hay. Si encuentro al menos una de ellas, ya no se podrá continuar jugando y se declarará al ganador.

    if (board[0][0] === turno && board[0][1] === turno && board[0][2] === turno) {

        document.getElementById("cell-0").style.color = "tomato";
        document.getElementById("cell-1").style.color = "tomato";
        document.getElementById("cell-2").style.color = "tomato";

        document.getElementById("cell-0").style.fontWeight = "bold";
        document.getElementById("cell-1").style.fontWeight = "bold";
        document.getElementById("cell-2").style.fontWeight = "bold";
        keepPlaying = false;
        jugadores[turno].scoreTateti = jugadores[turno].scoreTateti + 100;
        alert("Ganó el turno " + turno);
        document.getElementsByClassName("fuera")[0].style.display = "inline";

    } else if (board[1][0] === turno && board[1][1] === turno && board[1][2] === turno) {

        document.getElementById("cell-3").style.color = "tomato";
        document.getElementById("cell-4").style.color = "tomato";
        document.getElementById("cell-5").style.color = "tomato";

        document.getElementById("cell-3").style.fontWeight = "bold";
        document.getElementById("cell-4").style.fontWeight = "bold";
        document.getElementById("cell-5").style.fontWeight = "bold";
        keepPlaying = false;
        jugadores[turno].scoreTateti = jugadores[turno].scoreTateti + 100;
        alert("Ganó el turno " + turno);
        document.getElementsByClassName("fuera")[0].style.display = "inline";

    } else if (board[2][0] === turno && board[2][1] === turno && board[2][2] === turno) {

        document.getElementById("cell-6").style.color = "tomato";
        document.getElementById("cell-7").style.color = "tomato";
        document.getElementById("cell-8").style.color = "tomato";

        document.getElementById("cell-6").style.fontWeight = "bold";
        document.getElementById("cell-7").style.fontWeight = "bold";
        document.getElementById("cell-8").style.fontWeight = "bold";
        keepPlaying = false;
        jugadores[turno].scoreTateti = jugadores[turno].scoreTateti + 100;
        alert("Ganó el turno " + turno);
        document.getElementsByClassName("fuera")[0].style.display = "inline";

    } else if (board[0][0] === turno && board[1][0] === turno && board[2][0] === turno) {

        document.getElementById("cell-0").style.color = "tomato";
        document.getElementById("cell-3").style.color = "tomato";
        document.getElementById("cell-6").style.color = "tomato";

        document.getElementById("cell-0").style.fontWeight = "bold";
        document.getElementById("cell-3").style.fontWeight = "bold";
        document.getElementById("cell-6").style.fontWeight = "bold";
        keepPlaying = false;
        jugadores[turno].scoreTateti = jugadores[turno].scoreTateti + 100;
        alert("Ganó el turno " + turno);
        document.getElementsByClassName("fuera")[0].style.display = "inline";

    } else if (board[0][1] === turno && board[1][1] === turno && board[2][1] === turno) {

        document.getElementById("cell-1").style.color = "tomato";
        document.getElementById("cell-4").style.color = "tomato";
        document.getElementById("cell-7").style.color = "tomato";

        document.getElementById("cell-1").style.fontWeight = "bold";
        document.getElementById("cell-4").style.fontWeight = "bold";
        document.getElementById("cell-7").style.fontWeight = "bold";
        keepPlaying = false;
        jugadores[turno].scoreTateti = jugadores[turno].scoreTateti + 100;
        alert("Ganó el turno " + turno);
        document.getElementsByClassName("fuera")[0].style.display = "inline";

    } else if (board[0][2] === turno && board[1][2] === turno && board[2][2] === turno) {

        document.getElementById("cell-2").style.color = "tomato";
        document.getElementById("cell-5").style.color = "tomato";
        document.getElementById("cell-8").style.color = "tomato";

        document.getElementById("cell-2").style.fontWeight = "bold";
        document.getElementById("cell-5").style.fontWeight = "bold";
        document.getElementById("cell-8").style.fontWeight = "bold";
        keepPlaying = false;
        jugadores[turno].scoreTateti = jugadores[turno].scoreTateti + 100;
        alert("Ganó el turno " + turno);
        document.getElementsByClassName("fuera")[0].style.display = "inline";

    } else if (board[0][0] === turno && board[1][1] === turno && board[2][2] === turno) {

        document.getElementById("cell-0").style.color = "tomato";
        document.getElementById("cell-4").style.color = "tomato";
        document.getElementById("cell-8").style.color = "tomato";

        document.getElementById("cell-0").style.fontWeight = "bold";
        document.getElementById("cell-4").style.fontWeight = "bold";
        document.getElementById("cell-8").style.fontWeight = "bold";
        keepPlaying = false;
        jugadores[turno].scoreTateti = jugadores[turno].scoreTateti + 100;
        alert("Ganó el turno " + turno);
        document.getElementsByClassName("fuera")[0].style.display = "inline";

    } else if (board[0][2] === turno && board[1][1] === turno && board[2][0] === turno) {

        document.getElementById("cell-2").style.color = "tomato";
        document.getElementById("cell-4").style.color = "tomato";
        document.getElementById("cell-6").style.color = "tomato";

        document.getElementById("cell-2").style.fontWeight = "bold";
        document.getElementById("cell-4").style.fontWeight = "bold";
        document.getElementById("cell-6").style.fontWeight = "bold";
        keepPlaying = false;
        jugadores[turno].scoreTateti = jugadores[turno].scoreTateti + 100;
        alert("Ganó el turno " + turno);
        document.getElementsByClassName("fuera")[0].style.display = "inline";

    } else {
        tie();
    }
    window.localStorage.setItem("jugadores", JSON.stringify(jugadores));
}

function tie() {//Aquí recorro el tablero verificando que no haya lugares libres. Si los hay, se puede seguir jugando. Si no hay lugares libres, se declara empate.
    for (i = 0; i <= 8; i++) {
        if (document.getElementById("cell-" + i).innerHTML == "") {
            keepPlaying = true;
            return;
        }
    }
    keepPlaying = false;
    jugadores[0].scoreTateti = jugadores[0].scoreTateti + 50;
    jugadores[1].scoreTateti = jugadores[1].scoreTateti + 50;
    alert("empate");
    document.getElementsByClassName("fuera")[0].style.display = "inline";
}

function restart() {//Acá voy a reiniciar el tablero borrando las casillas, regresando al color y peso normal de las X y los O, volviendo a generar un nuevo al azar para el turno y borrando lo que está en la matriz para que no "quede en la memoria" y no se gane la partida sin llegar a colocar las 3 piezas de forma que generen una combinación ganadora.
    for (i = 0; i <= 8; i++) {
        document.getElementsByClassName("jugador1")[0].style.color = jugadores[0].color;
        document.getElementsByClassName("jugador2")[0].style.color = jugadores[1].color;
        document.getElementsByClassName("jugador1")[0].style.fontWeight = "400";
        document.getElementsByClassName("jugador2")[0].style.fontWeight = "400";
        document.getElementById("cell-" + i).innerHTML = "";
        document.getElementById("cell-" + i).style.backgroundcolor = "#382f44";
        document.getElementById("cell-" + i).style.color = "white";
        document.getElementById("cell-" + i).style.fontWeight = "normal";
    }
    document.getElementsByClassName("fuera")[0].style.display = "none";
    keepPlaying = true;
    turno = (Math.floor(Math.random() * 2));
    board = [
        [, ,],
        [, ,],
        [, ,]
    ];
}