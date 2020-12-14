console.log("Please wait... this will take a while.");

let i = 0;

// Part 1
while(true) {
    if(require("crypto").createHash("md5").update("yzbqklnj" + i).digest("hex").startsWith("00000")) {
        console.log(`Part 1: ${i}`);
        break;
    }
    i++;
}

// Part 2
while(true) {
    if(require("crypto").createHash("md5").update("yzbqklnj" + i).digest("hex").startsWith("000000")) {
        console.log(`Part 2: ${i}`);
        break;
    }
    i++;
}
