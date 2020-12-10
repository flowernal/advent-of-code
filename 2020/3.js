const fs = require("fs");

var input = fs.readFileSync("./input.txt", { encoding: "utf-8" });

var lastIndexOfRow = input.split("\r\n")[0].length - 1;
var rowWidth = input.split("\r\n")[0].length;

var x = y = 0;
input = input.replace(/\r\n/g, "").split("").map(square => {
    var tree = square == "#" ? true : false;

    const obj = {
        tree: tree,
        x: x,
        y: y
    }

    if(x === lastIndexOfRow) {
        x = -1;
        y++;
    }

    x++;

    return obj;
});

const slide = (right, down) => {
    x = y = treeCount = 0;

    while(y <= input[input.length - 1].y) {
        var square = input.find(sqr => sqr.x === x && sqr.y === y);
        if(square) {
            if(square.tree) {
                treeCount++;
            }
        }

        x = (x + right) % rowWidth;
        y += down;
    }

    return treeCount;
}

// Part 1
console.log(`Part 1: ${slide(3, 1)}`);

// Part 2
console.log(`Part 2: ${slide(1, 1) * slide(3, 1) * slide(5, 1) * slide(7, 1) * slide(1, 2)}`);