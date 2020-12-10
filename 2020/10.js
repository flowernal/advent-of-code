const fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8").split("\r\n").map(x => Number(x))
    .sort((a, b) => a - b);

let deviceJoltage = input[input.length - 1];
let diff = {
    "1": 0,
    "2": 0,
    "3": 1
}

// Part 1
let lastJoltage = 0;
for(let joltage of input) {
    diff[(joltage - lastJoltage).toString()]++;
    lastJoltage = joltage;
}

console.log(`Part 1: ${diff["1"] * diff["3"]}`);

// Part 2
let combinations = input.reduce((a, b) => {
    a[b] = (a[b - 3] || 0) + (a[b - 2] || 0) + (a[b - 1] || 0);
    return a;
}, [1]).pop();

console.log(`Part 2: ${combinations}`);