const fs = require("fs");

let input = fs.readFileSync("9.txt", "utf-8").split("\r\n").map(x => Number(x));

// Part 1
let badNumber;
for(let i = 25; i < input.length; i++) {
    let found = false;

    for(let j = i - 25; j < i; j++) {
        for(let k = i - 25; k < i; k++) {
            if(!found && input[j] + input[k] === input[i]) {
                found = true;
            }
        }
    }

    if(!found) {
        badNumber = input[i];
        break;
    }
}

console.log(`Part 1: ${badNumber}`);

// Part 2
const findRange = (start = 0) => {
    let i = start;
    let currentSum = 0;
    let rangeSum;
    while(!rangeSum) {
        if(currentSum > badNumber) {
            return findRange(start + 1);
        }
        else if(currentSum === badNumber) {
            let range = input.slice(start, i);
            rangeSum = Math.min(...range) + Math.max(...range);
        }
        else {
            currentSum += input[i];
            i++;
        }
    }

    return rangeSum;
}

console.log(`Part 2: ${findRange(0)}`);