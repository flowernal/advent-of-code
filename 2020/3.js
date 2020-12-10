const fs = require("fs");

let input = fs.readFileSync("3.txt", "utf-8");

let lastIndexOfRow = input.split("\r\n")[0].length - 1;
let rowWidth = input.split("\r\n")[0].length;

let x = 0, y = 0;
input = input.replace(/\r\n/g, "").split("").map(square => {
    let tree = square === "#";

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
    let x = 0, y = 0, treeCount = 0;

    while(y <= input[input.length - 1].y) {
        let square = input.find(sqr => sqr.x === x && sqr.y === y);
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