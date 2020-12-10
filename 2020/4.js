const fs = require("fs");

const input = fs.readFileSync("4.txt", "utf-8").split("\r\n\r\n").map(datas => {
    datas = datas.replace(/\r\n/g, " ").split(" ");

    const obj = {};

    datas.forEach(data => {
        var [key, value] = data.split(":");

        const newObj = {
            [key]: value
        }

        Object.assign(obj, newObj);
    });

    return obj;
});

console.log(input);

// Part 1
var validPassports = 0;
input.forEach(passport => {
    if(Object.keys(passport).length < 8) {
        if(Object.keys(passport).length === 7) {
            if(!passport.cid) {
                validPassports++;
            }
        }
    } else {
        validPassports++;
    }
});

console.log(`Part 1: ${validPassports}`);

// Part 2
const validate = (pp) => {
    if(pp.byr.length === 4 && pp.byr >= 1920 && pp.byr <= 2002) {
        if(pp.iyr.length === 4 && pp.iyr >= 2010 && pp.iyr <= 2020) {
            if(pp.eyr.length === 4 && pp.eyr >= 2020 && pp.eyr <= 2030) {
                if((pp.hgt.endsWith("cm") && pp.hgt.slice(0, pp.hgt.length - 2) >= 150 && pp.hgt.slice(0, pp.hgt.length - 2) <= 193) || (pp.hgt.endsWith("in") && pp.hgt.slice(0, pp.hgt.length - 2) >= 59 && pp.hgt.slice(0, pp.hgt.length - 2) <= 76)) {
                    if(pp.hcl[0] === "#" && (pp.hcl.match(/[g-z]/) || []).length < 1) {
                        if(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(pp.ecl)) {
                            if(pp.pid.length === 9) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }

    return false;
}

var actuallyValidPassports = 0;
input.forEach(passport => {
    if(Object.keys(passport).length < 8) {
        if(Object.keys(passport).length === 7) {
            if(!passport.cid) {
                if(validate(passport)) actuallyValidPassports++;
            }
        }
    } else {
        if(validate(passport)) actuallyValidPassports++;
    }
});

console.log(`Part 2: ${actuallyValidPassports}`);