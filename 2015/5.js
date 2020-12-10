const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).split("\r\n");

// Part 1
var vowels = input.filter(str => str.match(/[aeiou]/g) && str.match(/[aeiou]/g).length >= 3);

var doubleChars = vowels.filter(str => str.match(/([a-z])\1/));

var withoutBannedStrings = doubleChars.filter(str => {
    var badMatches = str.match(/ab|cd|pq|xy/);
    if(badMatches) {
        return false;
    } else {
        return true;
    }
});

console.log(`Part 1: ${withoutBannedStrings.length}`);