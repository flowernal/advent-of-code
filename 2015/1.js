const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).replace("\r\n", "").split("");
const floors = input.map(x => Number(x.replace("(", "1").replace(")", "-1")));

// Part 1
const floor = floors.reduce((a, b) => a + b);
console.log(`Part 1: ${floor}`);

// Part 2
for(let i = 0, currentFloor = 0; i < input.length; i++) {
    if(currentFloor === -1) {
        return console.log(`Part 2: ${i}`);
    } else {
        currentFloor += floors[i];
    }
}