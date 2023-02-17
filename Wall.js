/* ++++++++++++++++++ MUREN ++++++++++++++++++ */

class Walls {
    constructor(amount) {
        this.amount = amount;
    }

    randomizeWalls() {
        let amount = this.amount;
        let counter = 0;

        while (counter != amount) {
            let randomRow = Math.floor(Math.random() * (amountOfRows));
            let randomCollumn = Math.floor(Math.random() * (amountOfCollumns));
            let cel = map.rows[randomRow].cells[randomCollumn];

            if (!cel.classList.contains("wall")) {
                cel.setAttribute("class", "wall");
                counter++;
            }
        }
    }
}