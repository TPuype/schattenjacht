/* ++++++++++++++++++ VIJAND ++++++++++++++++++ */

class Enemy {

    currentRow;
    currentCollumn;
    position;
    target = false;

    constructor() {
    }

    get target(){
        return this.target;
    }

    set target(target){
        this.target = target;
    }

    spawn() {

        let startCheck = false;

        while (!startCheck) {
            let randomRow = Math.floor(Math.random() * (amountOfRows));
            let randomCollumn = Math.floor(Math.random() * (amountOfCollumns));
            let cel = map.rows[randomRow].cells[randomCollumn];

            if (!cel.classList.contains("wall") || !cel.classList.contains("treasure") || !cel.classList.contains("treasure")) {
                cel.setAttribute("class", "enemy");
                this.currentRow = randomRow;
                this.currentCollumn = randomCollumn;
                this.position = cel;
                startCheck = true;
            }
        }
    }

    move() {
        let newPos;


        /* ++++++++++++++++++  WILLEKEURIGE POSITIE BEREKENEN ++++++++++++++++++ */

        let direction = Math.floor(Math.random() * 4) + 1;

        switch (direction) {
            case 1:
                if (this.currentRow > 0) {
                    this.currentRow--;
                    newPos = map.rows[(this.currentRow)].cells[this.currentCollumn];
                } else {
                    newPos = this.position;
                }

                if (newPos.classList.contains("wall") || newPos.classList.contains("treasure")) {
                    this.currentRow++;
                    newPos = this.position;
                }

                break;

            case 2:
                if (this.currentCollumn < amountOfCollumns - 1) {
                    this.currentCollumn++;
                    newPos = map.rows[(this.currentRow)].cells[this.currentCollumn];
                } else {
                    newPos = this.position;
                }

                if (newPos.classList.contains("wall") || newPos.classList.contains("treasure")) {
                    this.currentCollumn--;
                    newPos = this.position;
                }

                break;

            case 3:
                if (this.currentRow < amountOfRows - 1) {
                    this.currentRow++;
                    newPos = map.rows[(this.currentRow)].cells[this.currentCollumn];
                } else {
                    newPos = this.position;
                }
                if (newPos.classList.contains("wall") || newPos.classList.contains("treasure")) {
                    this.currentRow--;
                    newPos = this.position;
                }

                break;

            case 4:
                if (this.currentCollumn > 0) {
                    this.currentCollumn--;
                    newPos = map.rows[(this.currentRow)].cells[this.currentCollumn];
                } else {
                    newPos = this.position;
                }

                if (newPos.classList.contains("wall") || newPos.classList.contains("treasure")) {
                    newPos = this.position;
                }

                break;

            default:

                break;
        }

        /* ++++++++++++++++++ CHECK OF VIJAND DE SPELER HEEFT GEVANGEN ++++++++++++++++++ */

        if (newPos.classList.contains("player")) {
            this.target = true;
        } 

        /* ++++++++++++++++++ NIEUWE POSITIE TOEWIJZEN ++++++++++++++++++ */

        this.position.removeAttribute("class", "enemy");
        this.position = newPos;
        newPos.setAttribute("class", "enemy");
    }

}