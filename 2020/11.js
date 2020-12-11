const fs = require("fs");

let input = fs.readFileSync("11.txt", "utf-8").split("\r\n").map(x => x.split(""));

// Part 1
const getAdjacentSeats = (i = 0, j = 0) => {
    let seats = [];
    if(i - 1 !== -1 && j - 1 !== -1) seats.push([i - 1, j - 1]);
    if(i - 1 !== -1) seats.push([i - 1, j]);
    if(i - 1 !== -1 && j + 1 < input[0].length) seats.push([i - 1, j + 1]);
    if(j + 1 < input[0].length) seats.push([i, j + 1]);
    if(i + 1 < input.length && j + 1 < input[0].length) seats.push([i + 1, j + 1]);
    if(i + 1 < input.length) seats.push([i + 1, j]);
    if(i + 1 < input.length && j - 1 !== -1) seats.push([i + 1, j - 1]);
    if(j - 1 !== -1) seats.push([i, j - 1]);
    return seats;
}

const changeSeatStates = (arr) => {
    let seats = JSON.parse(JSON.stringify(arr));
    let tempSeats = JSON.parse(JSON.stringify(seats));
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            let occupiedCount = 0;
            for(const seat of getAdjacentSeats(i, j)) {
                if(tempSeats[seat[0]][seat[1]] === "#") {
                    occupiedCount++;
                }
            }
            if(tempSeats[i][j] !== "." && occupiedCount === 0) {
                seats[i][j] = "#";
            }
            else if(tempSeats[i][j] === "#" && occupiedCount >= 4) {
                seats[i][j] = "L";
            }
        }
    }
    return seats;
}

let oldSeatStates = JSON.parse(JSON.stringify(input));
let currentSeatStates = changeSeatStates(oldSeatStates);
while(JSON.stringify(oldSeatStates) !== JSON.stringify(currentSeatStates)) {
    oldSeatStates = JSON.parse(JSON.stringify(currentSeatStates));
    currentSeatStates = changeSeatStates(oldSeatStates);
}

console.log(`Part 1: ${currentSeatStates.flat().filter(x => x === "#").length}`);

// Part 2
const getSeat = (i = [0, 0, ""], j = [0, 0, ""]) => {
    if(input[i[0] + i[1]][j[0] + j[1]] === ".") {
        let seat = [i[0] + i[1], j[0] + j[1]];
        while(input[seat[0]][seat[1]] === ".") {
            i[2] === "+" ? seat[0]++ : void(i[2] === "-" && seat[0]--);
            j[2] === "+" ? seat[1]++ : void(j[2] === "-" && seat[1]--);
            if(seat[0] === -1 || seat[1] === - 1 || seat[0] >= input.length || seat[1] >= input[0].length) return null;
        }
        return seat;
    } else {
        return [i[0] + i[1], j[0] + j[1]];
    }
}

const getVisibleSeats = (i = 0, j = 0) => {
    let seats = [];
    if(i - 1 !== -1 && j - 1 !== -1) {
        let seat = getSeat([i, -1, "-"], [j, -1, "-"]);
        if(seat) seats.push(seat);
    }
    if(i - 1 !== -1) {
        let seat = getSeat([i, -1, "-"], [j, 0, ""]);
        if(seat) seats.push(seat);
    }
    if(i - 1 !== -1 && j + 1 < input[0].length) {
        let seat = getSeat([i, -1, "-"], [j, 1, "+"]);
        if(seat) seats.push(seat);
    }
    if(j + 1 < input[0].length) {
        let seat = getSeat([i, 0, ""], [j, 1, "+"]);
        if(seat) seats.push(seat);
    }
    if(i + 1 < input.length && j + 1 < input[0].length) {
        let seat = getSeat([i, 1, "+"], [j, 1, "+"]);
        if(seat) seats.push(seat);
    }
    if(i + 1 < input.length) {
        let seat = getSeat([i, 1, "+"], [j, 0, ""]);
        if(seat) seats.push(seat);
    }
    if(i + 1 < input.length && j - 1 !== -1) {
        let seat = getSeat([i, 1, "+"], [j, -1, "-"]);
        if(seat) seats.push(seat);
    }
    if(j - 1 !== -1) {
        let seat = getSeat([i, 0, ""], [j, -1, "-"]);
        if(seat) seats.push(seat);
    }
    return seats;
}

const changeSeatStates2 = (arr) => {
    let seats = JSON.parse(JSON.stringify(arr));
    let tempSeats = JSON.parse(JSON.stringify(seats));
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            let occupiedCount = 0;
            for(const seat of getVisibleSeats(i, j)) {
                if(tempSeats[seat[0]][seat[1]] === "#") {
                    occupiedCount++;
                }
            }
            if(tempSeats[i][j] !== "." && occupiedCount === 0) {
                seats[i][j] = "#";
            }
            else if(tempSeats[i][j] === "#" && occupiedCount >= 5) {
                seats[i][j] = "L";
            }
        }
    }
    return seats;
}

oldSeatStates = JSON.parse(JSON.stringify(input));
currentSeatStates = changeSeatStates2(oldSeatStates);
while(JSON.stringify(oldSeatStates) !== JSON.stringify(currentSeatStates)) {
    oldSeatStates = JSON.parse(JSON.stringify(currentSeatStates));
    currentSeatStates = changeSeatStates2(oldSeatStates);
}

console.log(`Part 2: ${currentSeatStates.flat().filter(x => x === "#").length}`);
