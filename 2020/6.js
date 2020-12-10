const fs = require("fs");

let input = fs.readFileSync("6.txt", "utf-8").split("\r\n\r\n")
    .map(x => x.split("\r\n").sort((a, b) => b.length - a.length));

// Part 1
let countsSum = 0;
input.forEach(x => countsSum += [...new Set(x.join("").split(""))].length);

console.log(`Part 1: ${countsSum}`);

// Part 2
let everyoneCount = 0;
input.forEach(x => {
    for(let i = 0; i < x[0].length; i++) {
        if(x.every(y => y.includes(x[0][i]))) everyoneCount++;
    }
});

console.log(`Part 2: ${everyoneCount}`);