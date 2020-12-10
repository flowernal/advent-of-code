const fs = require("fs");

let input = fs.readFileSync("7.txt", "utf-8").split("\r\n");

// Part 1
let count = 0;
bags = {};
for(const line of input) {
    let innerBagTypes = line.replace(/.*?bags/, "").split(",");
    innerBagTypes = innerBagTypes.map(x => x.replace(/.*\d /, "").replace(/[^a-zA-Z ]/g, "").replace(/(bags|bag)/,"").trim())
    bags[line.replace(/bags.*/, "").trim()] = innerBagTypes;
}

const containsShinyGold = (bags, bag) => {
    if(!bags[bag]) {
        return false;
    }

    if(bags[bag].includes("shiny gold")) {
        return true;
    }

    let innerBagContainsGold = false;
    for(const innerBag of bags[bag]) {
        if(containsShinyGold(bags, innerBag)) {
            innerBagContainsGold = true;
        }
    }

    return innerBagContainsGold;
}

for(const bag in bags) {
    if(bags.hasOwnProperty(bag)) {
        count += containsShinyGold(bags, bag) ? 1 : 0;
    }
}

console.log(`Part 1: ${count}`);

// Part 2
bags = {};
for(const line of input) {
    let innerBagTypes = line.replace(/.*?bags/, "").split(",");
    innerBagTypes = innerBagTypes.map(x => [Number(x.replace(/[^\d]+/g, "")), x.replace(/.*\d /, "").replace(/[^a-zA-Z ]/g, "").replace(/(bags|bag)/,"").trim()])
    bags[line.replace(/bags.*/, "").trim()] = innerBagTypes;
}

const innerBagsCount = (bags, bag) => {
    if(!bags[bag]) {
        return 0;
    }

    let innerBags = 0;
    for(const innerBag of bags[bag]) {
        innerBags += innerBag[0] + innerBag[0] * innerBagsCount(bags, innerBag[1]);
    }

    return innerBags;
}

console.log(`Part 2: ${innerBagsCount(bags, "shiny gold")}`);