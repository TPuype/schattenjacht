/* ++++++++++++++++++ SPELER ++++++++++++++++++ */

class Player {
    currentRow;
    currentCollumn;
    position;
    stats;
    lives;
    currentLives;
    target = false;


    constructor(lives) {
        this.lives = lives;
    }

    get lives() {
        return this.lives;
    }

    get currentLives() {
        return this.lives;
    }

    get stats(){
        return this.stats;
    }

    get target(){
        return this.target;
    }

    set lives(currentLives){
        this.lives = currentLives;
    }

    set stats(stats){
        this.stats = stats;
    }

    start() {
        let startCheck = false;
        this.stats = 0;
        this.currentLives = this.lives;

        while (!startCheck) {
            let randomRow = Math.floor(Math.random() * (amountOfRows));
            let randomCollumn = Math.floor(Math.random() * (amountOfCollumns));
            let cel = map.rows[randomRow].cells[randomCollumn];

            if (!cel.classList.contains("wall") && !cel.classList.contains("treasure")) {
                cel.setAttribute("class", "player");
                this.currentRow = randomRow;
                this.currentCollumn = randomCollumn;
                this.position = cel;
                startCheck = true;
            }
        }
    }

    move(direction, currentLives) {
        let newPos;
        switch (direction) {
            case 1:
                //Arrow Up
                if (this.currentRow > 0) {
                    this.currentRow--;
                    newPos = map.rows[(this.currentRow)].cells[this.currentCollumn];
                } else {
                    newPos = this.position;
                }

                if (newPos.classList.contains("wall")) {
                    this.currentRow++;
                    newPos = this.position;
                }

                if (newPos.classList.contains("treasure")) {
                    let newEnemy = new Enemy;
                    newEnemy.spawn();
                    enemyArray.push(newEnemy);
                }

                break;

            case 2:
                //Arrow Right
                if (this.currentCollumn < amountOfCollumns - 1) {
                    this.currentCollumn++;
                    newPos = map.rows[(this.currentRow)].cells[this.currentCollumn];
                } else {
                    newPos = this.position;
                }

                if (newPos.classList.contains("wall")) {
                    this.currentCollumn--;
                    newPos = this.position;
                }

                if (newPos.classList.contains("treasure")) {
                    let newEnemy = new Enemy;
                    newEnemy.spawn();
                    enemyArray.push(newEnemy);
                }

                break;

            case 3:
                //Arrow down
                if (this.currentRow < amountOfRows - 1) {
                    this.currentRow++;
                    newPos = map.rows[(this.currentRow)].cells[this.currentCollumn];
                } else {
                    newPos = this.position;
                }
                if (newPos.classList.contains("wall")) {
                    this.currentRow--;
                    newPos = this.position;
                }

                if (newPos.classList.contains("treasure")) {
                    let newEnemy = new Enemy;
                    newEnemy.spawn();
                    enemyArray.push(newEnemy);
                }

                break;

            case 4:
                //Arrow Left
                if (this.currentCollumn > 0) {
                    this.currentCollumn--;
                    newPos = map.rows[(this.currentRow)].cells[this.currentCollumn];
                } else {
                    newPos = this.position;
                }

                if (newPos.classList.contains("wall")) {
                    this.currentCollumn++;
                    newPos = this.position;
                }

                if (newPos.classList.contains("treasure")) {
                    let newEnemy = new Enemy;
                    newEnemy.spawn();
                    enemyArray.push(newEnemy);
                }

                break;

            default:

                break;
        }

        /* ++++++++++++++++++ CHECK OF SPELER GEVANGEN IS ++++++++++++++++++ */

        if (newPos.classList.contains("enemy")) {
            currentLives--;
            this.currentLives = currentLives;
            this.target = true;
        }

        /* ++++++++++++++++++ CHECK OF SPELER EEN SCHAT HEEFT GEVONDEN ++++++++++++++++++ */

        if (newPos.classList.contains("treasure")) {
            this.stats++;
            points.innerHTML = this.stats;
        }

        /* ++++++++++++++++++ NIEUWE POSITIE TOEWIJZEN ++++++++++++++++++ */

        this.position.removeAttribute("class", "player");
        this.position = newPos;
        newPos.setAttribute("class", "player");


    }
}