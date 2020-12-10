const fs = require("fs");

const passwords = fs.readFileSync("2.txt", "utf-8").split("\r\n");

// Create objects with passwords
const passwordObjects = [];
for(const element of passwords) {
    let password = element.split(" ");

    const obj = {
        range: password[0].split("-").map(x => Number(x)),
        letter: password[1].replace(":", ""),
        corrupted: password[2]
    }

    passwordObjects.push(obj);
}

// Part 1
let validPasswords = 0;
for(const password of passwordObjects) {
    let occurrences = (password.corrupted.match(new RegExp(password.letter, "g")) || []).length;
    if(occurrences >= password.range[0] && occurrences <= password.range[1]) {
        validPasswords++;
    }
}

console.log(`Part 1: ${validPasswords}`);

// Part 2
let actuallyValidPasswords = 0;
for(const password of passwordObjects) {
    if(password.corrupted[password.range[0] - 1] === password.letter || password.corrupted[password.range[1] - 1] === password.letter) {
        if(password.corrupted[password.range[0] - 1] !== password.corrupted[password.range[1] - 1]) {
            actuallyValidPasswords++;
        }
    }
}

console.log(`Part 2: ${actuallyValidPasswords}`);