const { create } = require("domain");
const fs = require("fs");

const createGrid = (w, h, x = 0, y = 0) => {
    const grid = [...Array(w * h).keys()].map(light => {
        light = {
            state: 0,
            x: x,
            y: y
        }

        x++;

        if(x === w) {
            x = 0;
            y++;
        }

        return light;
    });

    return grid;
}

// Part 1
const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).split("\r\n").map(cmd => {
    var cmdArray = cmd.split(" ");
    
    var obj = {};
    if(cmdArray[0] === "turn") {
        obj.operation = cmdArray[1];
        cmdArray.splice(0, 2);
    } else {
        obj.operation = cmdArray[0];
        cmdArray.shift();
    }

    var startPos = cmdArray[0].split(",").map(x => Number(x));
    obj.from = {
        x: startPos[0],
        y: startPos[1]
    }

    var endPos = cmdArray[2].split(",").map(x => Number(x));
    obj.to = {
        x: endPos[0],
        y: endPos[1]
    }

    return obj;
});

var part1Grid = createGrid(1000, 1000);

for(const cmd of input) {
    console.log(cmd);
    for(let x = cmd.from.x; x <= cmd.to.x; x++) {
        for(let y = cmd.from.y; y <= cmd.to.y; y++) {
            console.log(`${x}, ${y}`);
            var state;
            var currentState = part1Grid[part1Grid.findIndex(tile => tile.x === x && tile.y === y)].state;

            if(cmd.operation === "on") {
                state = 1;
            }
            else if(cmd.operation === "off") {
                state = 0;
            }
            else {
                if(currentState === 0) {
                    state = 1;
                } else {
                    state = 0;
                }
            }

            part1Grid[part1Grid.findIndex(tile => tile.x === x && tile.y === y)].state = state;
        }
    }
}

var turnedOn = part1Grid.filter(tile => tile.state === 1);
console.log(`Part 1: ${turnedOn.length}`);

