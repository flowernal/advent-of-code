let input = require("fs").readFileSync("14.txt", "utf-8").split("\r\n");

/**
 *
 * @param {number} index
 * @param {string} replacement
 * @returns {string}
 */
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const permutation = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

class Bits {
    constructor(decimal) {
        let bits = (decimal >>> 0).toString(2);
        this.value = "0".repeat(36 - bits.length).concat(bits);
    }

    /**
     * Apply the mask.
     * @param {string} mask
     * @param {boolean} floating
     * @returns {string}
     */
    applyMask(mask, floating = false) {
        let pos = [...mask].map((x, i) => [x, i]);
        let positions = floating ? pos.filter(x => x[0] !== "0") : pos.filter(x => x[0] !== "X");
        positions.forEach(x => this.value = this.value.replaceAt(x[1], x[0]));
        return this.value;
    }

    floatingCombinations() {
        let seeds = [];
        let combinations = [];
        let positions = [...this.value].map((x, i) => [x, i]).filter(x => x[0] === "X").map(x => x[1]);
        for(let i = 0; i <= positions.length; i++) {
            let seed = "0".repeat(positions.length - i) + "1".repeat(i);
            seeds.push(seed);
        }
        let permuted = [];
        for(let seed of seeds) {
            const setArray = new Set(permutation(seed.split("")).map(x => JSON.stringify(x)))
            const uniqArray = [...setArray].map(x => JSON.parse(x))
            permuted.push(uniqArray);
        }
        for(const combination of permuted.flat()) {
            let replaced = this.value;
            for(let i = 0; i < combination.length; i++) {
                replaced = replaced.replaceAt(positions[i], combination[i]);
            }
            combinations.push(replaced);
        }
        return combinations;
    }
}

// Part 1
let mask = "";
let mem = {};
for(const command of input) {
    if(command.startsWith("mask")) {
        eval(command.replace(" = ", " = \"").concat("\""));
    } else {
        let [assign, decimal] = command.split(" = ");
        let bits = new Bits(Number(decimal));
        let masked = parseInt(bits.applyMask(mask), 2);
        eval(assign.concat(" = ", String(masked)));
    }
}

let sum = 0;
for(const value of Object.values(mem)) {
    sum += Number(value);
}

console.log(`Part 1: ${sum}`);

// Part 2
mask = "";
mem = {};
for(const command of input) {
    if(command.startsWith("mask")) {
        eval(command.replace(" = ", " = \"").concat("\""));
    } else {
        let [assign, decimal] = command.split(" = ");
        assign = assign.split("[")[1].replace("]", "");
        let bits = new Bits(Number(assign));
        bits.applyMask(mask, true);
        let combinations = bits.floatingCombinations();
        for(const combination of combinations) {
            mem[parseInt(combination, 2)] = Number(decimal);
        }
    }
}

sum = 0;
for(const value of Object.values(mem)) {
    sum += Number(value);
}

console.log(`Part 2: ${sum}`);
