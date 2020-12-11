const fs = require("fs");

let input = fs.readFileSync("11.txt", "utf-8").split("\r\n").map(x => x.split(""));

let directions = [
    // i, j (row, column)
    [-1, -1], // top left
    [-1, 0], // top
    [-1, 1], // top right
    [0, 1], // right
    [1, 1], // bottom right
    [1, 0], // bottom
    [1, -1], // bottom left
    [0, -1] // left
];

const isOutOfBounds = (arr) => {
    let [i, j] = arr;
    if(i === -1 || i >= input.length) return true;
    return j === -1 || j >= input[0].length;
}

const changeSeatStates = (arr, func, minOccupied) => {
    let seats = arr.map(e => [...e]);
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            let occupiedCount = 0;
            func(i, j).forEach(seat => occupiedCount += arr[seat[0]][seat[1]] === "#" ? 1 : 0);
            seats[i][j] = arr[i][j] !== "." && occupiedCount === 0 ? "#" : arr[i][j] === "#" && occupiedCount >= minOccupied ? "L" : seats[i][j];
        }
    }
    return seats;
}

const getOccupiedSeats = (func, minOccupied) => {
    let oldSeatStates = [...input];
    let currentSeatStates = changeSeatStates(oldSeatStates, func, minOccupied);
    while(oldSeatStates.join() !== currentSeatStates.join()) {
        oldSeatStates = [...currentSeatStates];
        currentSeatStates = changeSeatStates(oldSeatStates, func, minOccupied);
    }
    return currentSeatStates.flat().filter(x => x === "#").length
}

// Part 1
const getAdjacentSeats = (i = 0, j = 0) => {
    let seats = [];

    for(const direction of directions) {
        let location = direction.map((x, index) => x + [i, j][index]);
        if(!isOutOfBounds(location)) seats.push(location);
    }

    return seats;
}

console.log(`Part 1: ${getOccupiedSeats(getAdjacentSeats, 4)}`);

// Part 2
const getClosestSeats = (i = 0, j = 0) => {
    let seats = [];

    for(const direction of directions) {
        let location = direction.map((x, index) => x + [i, j][index]);
        while(!isOutOfBounds(location) && input[location[0]][location[1]] === ".") {
            location = location.map((x, index) => x + direction[index]);
        }
        if(!isOutOfBounds(location)) seats.push(location);
    }

    return seats;
}

console.log(`Part 2: ${getOccupiedSeats(getClosestSeats, 5)}`);
