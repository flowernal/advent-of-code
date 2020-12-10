const fs = require("fs");

const input = fs.readFileSync("2.txt", "utf-8").split("\r\n").map(x => x.split("x").map(y => Number(y)));

// Part 1
const papers = input.map(dimensions => {
    let [l, w, h] = dimensions.sort((a, b) => a - b);
    return (2 * l * w) + (2 * w * h) + (2 * l * h) + (l * w);
});

const Sp = papers.reduce((a, b) => a + b);
console.log(`Part 1: ${Sp}`);

// Part 2
const ribbons = input.map(dimensions => {
    let [l, w, h] = dimensions.sort((a, b) => a - b);
    return (l * 2) + (w * 2) + (l * w * h);
});

const Sr = ribbons.reduce((a, b) => a + b);
console.log(`Part 2: ${Sr}`);