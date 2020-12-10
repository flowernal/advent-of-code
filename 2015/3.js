const fs = require("fs");

const input = fs.readFileSync("3.txt", "utf-8").replace("\r\n", "").split("");

// Part 1
var houses = [];
var x = y = 0;

input.forEach(direction => {
    switch(direction) {
        case "^":
            y++;
            break;
        case "v":
            y--;
            break;
        case ">":
            x++;
            break;
        case "<":
            x--;
            break;
    }

    let house = houses.find(e => e.x === x && e.y === y);
    if(!house) {
        const obj = {
            x: x,
            y: y
        }
        houses.push(obj);
    }
});

console.log(`Part 1: ${houses.length}`);

// Part 2
var houses = [];
var x = y = rx = ry = 0;
var robo = 0;

input.forEach(direction => {
    if(robo) {
        switch(direction) {
            case "^":
                ry++;
                break;
            case "v":
                ry--;
                break;
            case ">":
                rx++;
                break;
            case "<":
                rx--;
                break;
        }

        let house = houses.find(e => e.x === rx && e.y === ry);
        if(!house) {
            const obj = {
                x: rx,
                y: ry
            }
            houses.push(obj);
        }

        robo = 0;
    } else {
        switch(direction) {
            case "^":
                y++;
                break;
            case "v":
                y--;
                break;
            case ">":
                x++;
                break;
            case "<":
                x--;
                break;
        }

        let house = houses.find(e => e.x === x && e.y === y);
        if(!house) {
            const obj = {
                x: x,
                y: y
            }
            houses.push(obj);
        }

        robo = 1;
    }
});

console.log(`Part 2: ${houses.length}`);