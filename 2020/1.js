const fs = require("fs");

const numbers = fs.readFileSync("1.txt", "utf-8").split("\r\n").map(num => Number(num));

// Part 1
function part1() {
    for(let i = 0; i < numbers.length; i++) {
        for(let j = 0; j < numbers.length; j++) {
            if(numbers[i] + numbers[j] === 2020 && i !== j) {
                return console.log(`Part 1: ${numbers[i] * numbers[j]}`);
            }
        }
    }
}

part1();

// Part 2
function part2() {
    for(let i = 0; i < numbers.length; i++) {
        for(let j = 0; j < numbers.length; j++) {
            for(let k = 0; k < numbers.length; k++) {
                if(numbers[i] + numbers[j] + numbers[k] === 2020 && i !== j && j !== k) {
                    return console.log(`Part 2: ${numbers[i] * numbers[j] * numbers[k]}`);
                }
            }
        }
    }
}

part2();
