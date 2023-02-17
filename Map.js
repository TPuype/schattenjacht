'use strict';

/* ++++++++++++++++++ SPEELVELD ++++++++++++++++++ */

class Map {
    constructor(rows, collumns) {
        this.rows = rows;
        this.collumns = collumns;
    }

    createMap() {
        amountOfRows = this.rows;
        amountOfCollumns = this.collumns;

        for (let i = 0; i < amountOfRows; i++) {
            let tr = map.insertRow();

            for (let j = 0; j < amountOfCollumns; j++) {
                tr.insertCell();
            }
        }
    }
}