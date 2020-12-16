const input = require("fs").readFileSync("16.txt", "utf-8").split("\r\n\r\n");

const validNumbers = [...new Set(input[0].split("\r\n").map(x => x.split(": ")[1].split(" or ").map(y => y.split("-").map(z => Number(z)))).map(x => {
    let arr = [];
    for(let i = x[0][0]; i <= x[0][1]; i++) arr.push(i);
    for(let i = x[1][0]; i <= x[1][1]; i++) arr.push(i);
    return arr;
}).flat())];

const nearbyTickets = input[2].split("\r\n").slice(1).map(x => x.split(",").map(y => Number(y)));

// Part 1
const invalid = [];
nearbyTickets.forEach(x => x.forEach(y => { if(!validNumbers.includes(y)) invalid.push(y) }));
//console.log(`Part 1: ${invalid.reduce((a, b) => a + b)}`);

// Part 2
const validTickets = nearbyTickets.forEach(x => x.filter(y => validNumbers.includes(y)));
console.log(validTickets);