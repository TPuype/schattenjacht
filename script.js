'use strict';

/* ++++++++++++++++++ GLOBALE VAZRIABELEN ++++++++++++++++++ */

let map = document.getElementById("map");
let amountOfRows;
let amountOfCollumns;
let enemyArray = [];
let end = new Boolean(false);
let points = document.getElementById("points");
points.innerHTML = 0;


/* ++++++++++++++++++ SPEL OPZETTEN ++++++++++++++++++ */

let mapSlider = document.getElementById("mapSize")
let mapSize = mapSlider.value;

let outputMap = document.getElementById("mapSizeCurrent");
outputMap.innerHTML = mapSize;

mapSlider.oninput = function () {
    outputMap.innerHTML = this.value;
}

let game = new Map(mapSize, mapSize);
game.createMap();

let wallSlider = document.getElementById("wallSlider")
let amountOfWalls = wallSlider.value;

let outputWalls = document.getElementById("wallsCurrent");
outputWalls.innerHTML = amountOfWalls;

wallSlider.oninput = function () {
    outputWalls.innerHTML = this.value;
}

let walls = new Walls(amountOfWalls);
walls.randomizeWalls();

let treasureSlider = document.getElementById("treasureSlider")
let amountOfTreasure = treasureSlider.value;

let outputTreasure = document.getElementById("treasuresCurrent");
outputTreasure.innerHTML = amountOfTreasure;

treasureSlider.oninput = function () {
    outputTreasure.innerHTML = this.value;
}

let treasures = new Treasure(amountOfTreasure);
treasures.randomizeTreasure();

let hearts = document.getElementById("hearts");


let livesSlider = document.getElementById("livesSlider");


livesSlider.addEventListener('input', function () {

    /* ++++++++++++++++++ AANTAL LEVENS VISUEEL VOORSTELLEN ++++++++++++++++++ */

    let lives = livesSlider.value;

    while (hearts.firstChild) {
        hearts.firstChild.remove();
    }

    for (let i = 0; i < lives; i++) {
        const newHeart = document.createElement("img");
        newHeart.src = "../img/life.png";
        hearts.appendChild(newHeart);
    }
}, false);

let lives = livesSlider.value;

let player = new Player(lives);

player.start();

/* ++++++++++++++++++++ AANTAL LEVENS VOORSTELLEN ALS HARTEN ++++++++++++++++++++++++ */

for (let i = 1; i < player.lives; i++) {
    const newHeart = document.createElement("img");
    newHeart.src = "../img/life.png";
    hearts.appendChild(newHeart);
}

/* ++++++++++++++++++ SPAWN VIJAND ++++++++++++++++++++++++++ */

let enemy = new Enemy();
enemy.spawn();

var startEnemy = window.setInterval(function () {
    enemy.move();
    if (enemy.target) {
        player.currentLives--;
        livesController();
        enemy.target = false;
    }
}, 400)

/* ++++++++++++++++++ TELKENS BIJ HET VINDEN VAN EEN SCHAT EEN NIEUWE VIJAND SPAWNEN ++++++++++++++++++ */

var moveNewEnemies = window.setInterval(function () {
    for (let i = 0; i < enemyArray.length; i++) {
        enemyArray[i].move();
        if (enemyArray[i].target) {
            player.currentLives--;
            livesController();
            enemyArray[i].target = false;
        }
        
    }
}, 400);


/* ++++++++++++++++++ CONTROLS SPELER ++++++++++++++++++ */

window.addEventListener("keydown", function (event) {
    if (event.code == "ArrowUp") {
        player.move(1, player.lives);
    }
    if (event.code == "ArrowRight") {
        player.move(2, player.lives);
    }
    if (event.code == "ArrowDown") {
        player.move(3, player.lives);
    }
    if (event.code == "ArrowLeft") {
        player.move(4, player.lives);
    }

    if (player.target) {
        livesController();
        player.target = false;
    }

    statsController();
})


/* ++++++++++++++++++++++++++ FUNCTIE OM HET HUIDIG AANTAL LEVENS VAN DE SPELER BIJ TE HOUDEN EN TE VERGELIJKEN MET HET TOAAL AANTAL LEVENS ++++++++++++++++++++ */

function livesController() {
    if (player.currentLives < player.lives) {
        alert("Je bent gevangen. Je hebt nog " + player.currentLives + " leven(s).");
        let newLives = player.currentLives;
        let currentStats = player.stats;
        player.start();
        player.lives = newLives;
        player.stats = currentStats;
    }

    if (player.lives === 0) {
        clearInterval(window.startEnemy);
        clearInterval(window.moveNewEnemies);
        if (confirm("Je levens zijn op! Behaalde score: " + player.stats)) {
            window.location.reload();
        }
    }
}

/* +++++++++++++++++++++++++++ FUNCTIE DIE HET AANTAL GEVONDEN SCHATTEN VERGELIJKT MET HET TOTAAL TE VINDEN SCHATTEN ++++++++++++++++++++++++++++++++ */

function statsController(){
    if(player.stats == amountOfTreasure){
        clearInterval(window.startEnemy);
        clearInterval(window.moveNewEnemies);
        if (confirm("Proficiat je hebt alle schatten gevonden!! Opnieuw?")){
            window.location.reload()
        }
    }
}
