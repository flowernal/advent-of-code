let input = require("fs").readFileSync("13.txt", "utf-8").split("\r\n");
input[1] = input[1].replace(/,x/g, "").split(",").map(x => Number(x));

// Part 1
let timestamps = [];
for(let i = 0; i < input[1].length; i++) {
    let timestamp = input[1][i];
    while(timestamp < input[0]) {
        timestamp += input[1][i];
    }
    timestamps.push([input[1][i], timestamp]);
}

let firstBus = timestamps.sort((a, b) => a[1] - b[1])[0];
console.log(`Part 1: ${firstBus[0] * (firstBus[1] - input[0])}`);

// Part 2

// first - prvý autobus [ bus ID, index v liste ]
// buses - ostatné [ bus ID, index v liste ]
let [first, ...buses] = require("fs").readFileSync("13.txt", "utf-8")
    .split("\r\n")[1]
    .split(",")
    .map((x, i) => [ Number(x), i ])
    .filter(([x]) => !isNaN(x));

// Prvý násobok je ID prvého autobusu (podľa nejakého krásneho algoritmu)
let multiplier = first[0];

// Štartujeme na indexe 0
let i = 0;

/*
Loopne to tu každý autobus, kde 'bus' je ID busu a 'index' je index v pôvodnom liste.
Urobíme tu opakujúci sa loop, ktorý skončí vtedy, keď zvyšok podielu (súčtu riadiacej hodnoty 'i' s indexom busu) s ID busom je 0.
Keď sa loop ukončí, tak multiplier vynásobíme IDčkom busa.
Ak nie, tak v riadiacej hodnote 'i' prirátame multiplier.
Celé toto funguje na nejakej magickej matematike. :D
 */
for(let [bus, index] of buses) {
    while(true) {
        if((i + index) % bus === 0) {
            multiplier *= bus;
            break;
        }
        i += multiplier;
    }
}

console.log(`Part 2: ${i}`);