let dicesContainer = document.getElementById("container"),
    scoreTotal1,
    scoreTotal2,
    ordenar,
    anySelectedDice = false,
    gameState = {
        dices: [],
        rollThisDices: [],
        player: Math.floor(Math.random() * 2) + 1,
        spins: 1,
        scores: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        plays: 0
    };


jugadores = JSON.parse(window.localStorage.getItem("jugadores"));

document.getElementsByClassName("fuera")[0].style.display = "none";


screen.orientation.onchange = function () {
    if (window.innerWidth > window.innerHeight) {
        document.getElementsByTagName("table")[0].style.display = "none";
    } else {
        document.getElementsByTagName("table")[0].style.display = "table";
    }
}


document.getElementsByClassName("Player1")[0].innerHTML = jugadores[0].nick;
document.getElementsByClassName("Player2")[0].innerHTML = jugadores[1].nick;

document.getElementsByClassName("Player1")[0].style.color = jugadores[0].color;
document.getElementsByClassName("Player2")[0].style.color = jugadores[1].color;

document.getElementsByClassName("j1")[0].innerHTML = jugadores[0].nick;
document.getElementsByClassName("j2")[0].innerHTML = jugadores[1].nick;

function quienJuega() {
    if (gameState.player === 1) {
        document.getElementsByClassName("Player1")[0].style.fontWeight = "800";
        document.getElementsByClassName("Player1")[0].style.fontSize = "26px";
        document.getElementsByClassName("Player2")[0].style.fontWeight = "400";
    } else if (gameState.player === 2) {
        document.getElementsByClassName("Player1")[0].style.fontWeight = "400";
        document.getElementsByClassName("Player2")[0].style.fontWeight = "800";
        document.getElementsByClassName("Player2")[0].style.fontSize = "26px";
    }
}

function selectDices() {//Acá voy a obtener un numero al azar entre 1 y 6 para los dados.
    return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {//Acá lo que va a pasar es que cuando se clickee la img va a desaparecer y va a mostrar los 5 dados al azar.
    quienJuega();

    document.querySelector("img.cup").style.display = "none";
    document.getElementsByTagName("table")[0].style.display = "table";
    document.querySelector("button.rollAgain").style.display = "block";
    document.getElementsByClassName("turn")[0].style.display = "block";

    if (gameState.spins != 3) {//Mientras la cantidad de tiros no llegue a 3, va a permitir que siga el código.
        //Obtengo las 5 imágenes del dado
        let rollThisDices = document.querySelectorAll("div.dices img");

        if (rollThisDices.length != 0) {//Si el largo es superior a 0 significa que se "metieron" dados por haber sido seleccionados.
            //la i empieza desde 0 porque el array empieza en 0
            for (i = 0; i < 5; i++) {
                if (rollThisDices[i].classList.contains("selectedDice")) {
                    anySelectedDice = true;
                    let dicePosition = i;
                    gameState.dices[dicePosition] = selectDices();
                    rollThisDices[i].setAttribute("src", gameState.dices[dicePosition] + ".png");
                    rollThisDices[i].setAttribute("class", "");//Así le saco la clase de selección para que no siga quedando como marcado.
                }
            }
            //Si anySelectedDice da false, significa que ningun dado se seleccionó, por lo tanto cambiar a todos.
            if (anySelectedDice == false) {
                for (i = 0; i < 5; i++) {
                    gameState.dices[i] = selectDices();
                    rollThisDices[i].setAttribute("src", gameState.dices[i] + ".png");
                }
            }

            gameState.spins++;//Va a sumar tiros mientras siga siendo menor a 3.
            refresh();
            if (gameState.spins === 3) {
                forceTickScore();
            }
        } else {
            document.getElementById("container").innerHTML = " ";
            for (i = 0; i < 5; i++) {
                //Borro lo que está en el contenedor para que no permanezcan los dados viejos cuando se presiona el boton para volver a tirar.
                let img = document.createElement("img");//Acá voy a crear un "img" por cada vuelta.
                let divDices = document.createElement("div");//Acá la variable va a tener el div donde se van a guardar los dados.
                gameState.dices[i] = selectDices();
                img.setAttribute("src", gameState.dices[i] + ".png");//Acá a cada "img" que creo le voy a poner de atributo el numero + .jpg que va aconincidir con alguna de las img de los dados.
                img.setAttribute("aDice", i);//Acá le voy a poner un id a cada dado.
                divDices.setAttribute("class", "dices");//Le doy el id "dices".
                divDices.appendChild(img);//Acá voy a poner dentro del div todos los dados.
                document.getElementById("container").appendChild(divDices);//Acá estoy metiendo los div con las img adentro del div contenedor del HTML.

                img.onclick = function () {//Acá digo que si hice click en alguna de las img le agregué la clase "selectDice".
                    img.classList.toggle("selectedDice");
                }
                if (img.classList.contains("selectedDice") === true) {//Acá digo que si tiene la clase de seleccionado, voy a ir metiendolo en el array de los dados seleccionados para después poder cambiarlos.
                    rollThisDices.push(img);
                }
            }
        }
    } else {//Acá llega a 3 y cambia el player.
        changePlayer();
        quienJuega();
    }

    document.getElementsByClassName("turn")[0].innerHTML = "Es la tirada: " + gameState.spins;

}

function forceTickScore() {//Esto, una vez que se hicieron las 3 tiradas y no se anotó nada, bloquea los dados y el botón para que no puedan cliquearse y el jugador deba anotarse algo sí o sí.
    enableButton(false);
    document.querySelectorAll("#container div img").forEach(img => {
        img.onclick = null;
    });
}

function tickScore(game) {

    //gameState.dices = [undefined, 2, 3, 3, 3, 2]; para forzar cualquier jugada y ver si funca.


    let cell = document.querySelector("#score tr:nth-of-type(" + (game + 1) + ") td:nth-of-type(" + (gameState.player) + ")");
    if (!cell.classList.contains("clicked")) {
        let generalaForzadaPorDoble = false;
        let dobleForzadaPorGenerala = false;
        switch (game) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                gameState.scores[gameState.player - 1][game] = score(game + 1);
                break;
            case 6:
                gameState.scores[gameState.player - 1][game] = escalera() ? specialGame(20) : 0;
                break;
            case 7:
                gameState.scores[gameState.player - 1][game] = full() ? specialGame(30) : 0;
                break;
            case 8:
                gameState.scores[gameState.player - 1][game] = poker() ? specialGame(40) : 0;
                break;
            case 9:
                if (generala()) {
                    if (gameState.spins === 1) {
                        gameState.scores[(gameState.player - 1)][game] = 400;
                        endGame();
                    } else {
                        gameState.scores[gameState.player - 1][game] = specialGame(50);
                    }
                } else {
                    if (document.querySelector("#score tr:nth-of-type(11) td:nth-of-type(" + (gameState.player) + ")").classList.contains("clicked")) {
                        gameState.scores[gameState.player - 1][game] = 0;
                    } else {
                        gameState.scores[gameState.player - 1][10] = 0;
                        dobleForzadaPorGenerala = true;
                    }
                }
                break;
            case 10:
                if (!generala()) {
                    gameState.scores[gameState.player - 1][game] = 0;
                } else {
                    if (gameState.spins === 1) {
                        gameState.scores[(gameState.player - 1)][game] = 400;
                        endGame();
                    } else {
                        if (gameState.scores[gameState.player - 1][9] > 0) {
                            gameState.scores[gameState.player - 1][game] = specialGame(100);
                        } else {
                            gameState.scores[gameState.player - 1][9] = specialGame(50);
                            generalaForzadaPorDoble = true;
                        }
                    }
                }
                break;
        }

        if (!generalaForzadaPorDoble && !dobleForzadaPorGenerala) {
            cell.innerHTML = gameState.scores[gameState.player - 1][game] === 0 ? "X" : gameState.scores[gameState.player - 1][game];
            cell.classList.add("clicked");

        } else if (generalaForzadaPorDoble) {
            let cellG = document.querySelector("#score tr:nth-of-type(10) td:nth-of-type(" + (gameState.player) + ")");
            cellG.innerHTML = gameState.scores[gameState.player - 1][9] === 0 ? "X" : gameState.scores[gameState.player - 1][9];
            cellG.classList.add("clicked");

        } else if (dobleForzadaPorGenerala) {
            let cellDG = document.querySelector("#score tr:nth-of-type(11) td:nth-of-type(" + (gameState.player) + ")");
            cellDG.innerHTML = "X";
            cellDG.classList.add("clicked");
        }

        let Totalcell = document.querySelector("#score tr:nth-of-type(12) td:nth-of-type(" + (gameState.player) + ")");
        Totalcell.innerHTML = totalScore();
        changePlayer();
    }

}

function refresh() {
    gameState.rollThisDices = [];

    document.querySelectorAll("#score td").forEach(cell => cell.classList.remove("playing"));
    document.querySelectorAll("#score td:nth-of-type(" + gameState.player + ")").forEach(cell => cell.classList.add("playing"));
    document.querySelectorAll("#score th").forEach(cell => cell.classList.remove("playing"));
    document.querySelectorAll("#score th:nth-of-type(" + (gameState.player + 1) + ")").forEach(cell => cell.classList.add("playing"));
}

function specialGame(scoreGame) {//Acá voy a decir que si tengo el game en el primer tiro, que me sume 5 puntos más, y sino nada pasa.
    return gameState.spins === 1 ? scoreGame + 5 : scoreGame;
}

function totalScore() {
    return gameState.scores[gameState.player - 1].reduce((total, score) => {
        return total + score;
    }, 0);
}

function winner() {
    document.getElementsByClassName("change")[0].style.display = "none";
    document.getElementsByTagName("table")[0].style.display = "none";
    document.getElementsByClassName("cup")[0].style.display = "none";
    document.getElementsByClassName("player")[0].style.display = "none";
    document.getElementsByClassName("winner")[0].style.display = "block";

    gameState.scores[0].reduce((total, score) => {
        scoreTotal1 = total + score;
        return total + score;
    }, 0);
    gameState.scores[1].reduce((total, score) => {
        scoreTotal2 = total + score;
        return total + score;
    }, 0);

    if (scoreTotal1 < scoreTotal2) {
        document.getElementById("showWinner").style.display = "inline-block";
        document.getElementById("showWinner").innerHTML = "Ganó " + jugadores[1].nick;
        document.getElementsByClassName("rollAgain")[0].style.display = "none";
        jugadores[1].scoreGenerala = jugadores[1].scoreGenerala + 250;
        document.getElementsByClassName("fuera")[0].style.display = "inline";

    } else if (scoreTotal2 < scoreTotal1) {
        document.getElementById("showWinner").style.display = "inline-block";
        document.getElementById("showWinner").innerHTML = "Ganó " + jugadores[0].nick;
        document.getElementsByClassName("rollAgain")[0].style.display = "none";
        jugadores[0].scoreGenerala = jugadores[0].scoreGenerala + 250;
        document.getElementsByClassName("fuera")[0].style.display = "inline";

    } else {
        document.getElementById("showWinner").style.display = "inline-block";
        document.getElementById("showWinner").innerHTML = "Empate!";
        document.getElementsByClassName("rollAgain")[0].style.display = "none";
        jugadores[0].scoreGenerala = jugadores[0].scoreGenerala + 100;
        jugadores[1].scoreGenerala = jugadores[1].scoreGenerala + 100;
        document.getElementsByClassName("fuera")[0].style.display = "inline";
    }

    window.localStorage.setItem("jugadores", JSON.stringify(jugadores));
}

function changePlayer() {
    gameState.plays++;
    quienJuega();
    gameState.spins = 1;//Reseteo los tiros.
    gameState.dices = [];//Limpio el array de los dados.
    anySelectedDice = false;//Vuelvo a setear en false los dados seleccionados para que al cambiar de jugador no permanezca en true.
    gameState.player = gameState.player === 2 ? 1 : 2;//Cambio de player. Si jugaba el 1 ahora juega el 2 o al reves.
    refresh();
    document.querySelector("img.cup").style.display = "block";//Hago que vuelva a aparecer el vacito.

    if (gameState.plays === 11 * gameState.scores.length) {//Cuando ya se completa la tabla se termina el game.
        endGame();
    }

    enableButton(true);
    
    if (window.innerHeight > window.innerWidth) {
        document.getElementsByTagName("table")[0].style.display = "table";
    } else {
        document.getElementsByTagName("table")[0].style.display = "none";
    }

    document.querySelector("button.rollAgain").style.display = "none";
    document.getElementsByClassName("turn")[0].style.display = "none";
    document.getElementById("container").innerHTML = "";//Vacío el contenedor para que no se me muestren los dados de nuevo cuando va a jugar el próximo player.
}

function enableButton(enable) {
    let button = document.getElementsByClassName("rollAgain")[0];
    if (enable) {
        button.setAttribute("onclick", "rollDice()");
        button.classList.remove("disabled");
    } else {
        button.setAttribute("onclick", "");
        button.classList.add("disabled");
    }
}

function endGame() {
    winner();
}

function escalera() {
    return (/12345|13456|23456/).test(stringDices());
}

function full() {
    return (/1{3}(22|33|44|55|66)|2{3}(33|44|55|66)|3{3}(44|55|66)|4{3}(55|66)|5{3}(66)|1{2}(222|333|444|555|666)|2{2}(333|444|555|666)|3{2}(444|555|666)|4{2}(555|666)|5{2}(666)/).test(stringDices());
}

function poker() {
    return (/1{4}|2{4}|3{4}|4{4}|5{4}|6{4}/).test(stringDices());
}

function generala() {
    return (/1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/).test(stringDices());
}

function score(theDice) {
    let addedPoints = 0;
    gameState.dices.forEach(dice => {
        addedPoints += (theDice === dice) ? theDice : 0;
    });
    return addedPoints;
}

function stringDices() {
    ordenar = [...gameState.dices]
    ordenar.sort((a, b) => {//Copiando el sort de arriba para intentar arreglar un bug.
        return a - b;
    });
    return ordenar.join("");
}

function restart() {//Oculto y hago aparecer todo lo que corresponde, además de resetear los dados, los tiros y las jugadas.
    document.getElementsByClassName("winner")[0].style.display = "none";

    document.getElementsByTagName("table")[0].style.display = "table";
    document.querySelectorAll("#score td").forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove("clicked");
    });

    document.getElementsByClassName("player")[0].style.display = "grid";
    document.querySelector("img.cup").style.display = "block";
    document.getElementsByClassName("change")[0].style.display = "block";
    document.getElementById("container").innerHTML = "";
    document.getElementsByClassName("fuera")[0].style.display = "none";

    gameState.plays = 0;
    gameState.spins = 1;//Reseteo los tiros.
    gameState.dices = [];//Limpio el array de los dados.
    anySelectedDice = false;//Vuelvo a setear en false los dados seleccionados para que al cambiar de jugador no permanezca en true.
    gameState.player = gameState.player === 2 ? 1 : 2;//Cambio de player. Si jugaba el 1 ahora juega el 2 o al reves.
    quienJuega();
}

function salir() {
    window.location.href = "../juegos.html";
}