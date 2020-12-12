const fs = require("fs");

const input = fs.readFileSync("12.txt", "utf-8").split("\r\n").map(x => [ x.slice(0, 1), Number(x.slice(1)) ]);

let degreesMap = new Map([["0", "N"], ["90", "E"], ["180", "S"], ["270", "W"]]);

// Part 1
let x = 0, y = 0;
let facing = "E";
let degrees = 90;

const rotate = (direction, value) => {
    let rotations = value / 90;
    for(let i = 0; i < rotations; i++) {
        degrees += direction === "R" ? 90 : -90;
        degrees = degrees < 0 ? 270 : degrees > 270 ? 0 : degrees;
    }
    facing = degreesMap.get(String(degrees));
}

for(const movement of input) {
    let [direction, value] = movement;
    direction = direction === "F" ? facing : direction;
    x += direction === "E" ? value : direction === "W" ? -value : 0;
    y += direction === "N" ? value : direction === "S" ? -value : 0;
    if(direction === "R" || direction === "L") rotate(direction, value);
}

console.log(`Part 1: ${Math.abs(x) + Math.abs(y)}`);

// Part 2
x = 0; y = 0;
let wX = 10, wY = 1;

const rotateWaypoint = (direction, value) => {
    let rotations = value / 90;
    for(let i = 0; i < rotations; i++) {
        [wX, wY] = direction === "R" ? [wY, -wX] : [-wY, wX];
    }
}

for(const movement of input) {
    let [direction, value] = movement;
    wX += direction === "E" ? value : direction === "W" ? -value : 0;
    wY += direction === "N" ? value : direction === "S" ? -value : 0;
    [x, y] = direction === "F" ? [x + wX * value, y + wY * value] : [x, y];
    if(direction === "R" || direction === "L") rotateWaypoint(direction, value);
}

console.log(`Part 2: ${Math.abs(x) + Math.abs(y)}`);