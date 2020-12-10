const fs = require("fs");

let input = fs.readFileSync("8.txt", "utf-8").split("\r\n")
    .map(x => {
        x = x.split(" ");
        return { operation: x[0], argument: Number(x[1]) };
    });

const validate = (arr, returnAcc) => {
    let acc = 0;
    let indexes = [];

    for(let i = 0; i < arr.length;) {
        if(indexes.includes(i)) {
            if(returnAcc) {
                return acc;
            } else {
                return 0;
            }
        }

        let operation = arr[i].operation;
        let argument = arr[i].argument;
        indexes.push(i);

        if(operation === "acc") {
            acc += argument;
            i++;
        }
        else if(operation === "jmp") {
            i += argument;
        }
        else {
            i++;
        }
    }

    return acc;
}

// Part 1
console.log(`Part 1: ${validate(input, true)}`);

// Part 2
let replacedCodes = [];
for(let i = 0; i < input.length; i++) {
    let inputCopy = JSON.parse(JSON.stringify(input));
    let operation = inputCopy[i].operation;

    if(operation === "jmp") {
        inputCopy[i].operation = "nop";
        replacedCodes.push(inputCopy);
    }
    else if(operation === "nop") {
        inputCopy[i].operation = "jmp";
        replacedCodes.push(inputCopy);
    }
}

for(const code of replacedCodes) {
    const value = validate(code);
    if(value > 0) {
        console.log(`Part 2: ${value}`);
    }
}