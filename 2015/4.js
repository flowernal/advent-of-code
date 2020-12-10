console.log("Please wait... this will take a while.");

// Part 1
for(let i = 0; i >= 0; i++) {
    if(require("crypto").createHash("md5").update("yzbqklnj" + i).digest("hex").startsWith("00000")) {
        console.log(`Part 1: ${i}`);
        break;
    }
}

// Part 2
for(let i = 0; i >= 0; i++) {
    if(require("crypto").createHash("md5").update("yzbqklnj" + i).digest("hex").startsWith("000000")) {
        console.log(`Part 2: ${i}`);
        break;
    }
}