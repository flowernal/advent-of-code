const fs = require("fs");

const numbers = fs.readFileSync("./numbers.txt", { encoding: "utf-8" }).split("\r\n").map(x => Number(x));

// Part 1
var fuel = numbers.map(mass => Math.floor(mass / 3) - 2).reduce((a, b) => a + b);

console.log(`Part 1: ${fuel}`);

// Part 2
const calculateTotalFuel = (mass, total = 0) => {
    let fuel = Math.floor(mass / 3) - 2;

    if(fuel <= 0) {
        return total;
    } else {
        total += fuel;
        return calculateTotalFuel(fuel, total);
    }
};

let totalFuel = numbers.map(mass => calculateTotalFuel(mass)).reduce((a, b) => a + b);

console.log(`Part 2: ${totalFuel}`);
