const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).split("\r\n");

const getRow = (code = "") => {
    code = code.replace(/[LR]/g, "");
    var rowRange = [0, 127];
    var row;
    for(let i = 0; i < code.length; i++) {
        if(i === code.length - 1) {
            if(code[i] === "F") {
                row = rowRange[0];
            } else {
                row = rowRange[1];
            }
            break;
        }
        if(code[i] === "F") {
            rowRange[1] -= Math.floor((rowRange[1] - rowRange[0] + 1) / 2)
        }
        else if(code[i] === "B") {
            rowRange[0] += Math.floor((rowRange[1] - rowRange[0] + 1) / 2)
        }
    }

    return row;
}

const getColumn = (code = "") => {
    code = code.replace(/[FB]/g, "");
    var columnRange = [0, 7];
    var column;
    for(let i = 0; i < code.length; i++) {
        if(i === code.length - 1) {
            if(code[i] === "L") {
                column = columnRange[0];
            } else {
                column = columnRange[1];
            }
            break;
        }
        if(code[i] === "L") {
            columnRange[1] -= Math.floor((columnRange[1] - columnRange[0] + 1) / 2)
        }
        else if(code[i] === "R") {
            columnRange[0] += Math.floor((columnRange[1] - columnRange[0] + 1) / 2)
        }
    }

    return column;
}

// Part 1
const ids = input.map(code => {
    let row = getRow(code);
    let column = getColumn(code);
    let id = row * 8 + column;

    return id;
});

console.log(`Part 1: ${ids.sort((a, b) => b - a)[0]}`);

// Part 2
var missingID;
for(let i = 0; i < ids.length; i++) {
    if(ids[i] - ids[i + 1] === 2) {
        missingID = ids[i] - 1;
    }
}

console.log(missingID);