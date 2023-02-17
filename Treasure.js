/* ++++++++++++++++++ SCHATTEN ++++++++++++++++++ */

class Treasure {
    constructor(amount) {
        this.amount = amount;
    }

    randomizeTreasure() {
        let amount = this.amount;
        let counter = 0;

        while (counter != amount) {
            let randomRow = Math.floor(Math.random() * (amountOfRows));
            let randomCollumn = Math.floor(Math.random() * (amountOfCollumns));
            let cel = map.rows[randomRow].cells[randomCollumn];

            if (!cel.classList.contains("wall") && !cel.classList.contains("treasure")) {
                cel.setAttribute("class", "treasure");
                counter++;
            }
        }
    }
}

