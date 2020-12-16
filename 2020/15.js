const input = "20,0,1,11,6,3".split(",").map(x => parseInt(x));

const getSpokenNumber = (index) => {
    let arr = [...input];
    let mostRecent = {};
    for(let i = 0; i < arr.length - 1; i++) mostRecent[arr[i]] = i;
    for(let i = arr.length - 1, len = index * 2 - arr.length - 1; i < len; ++i) {
        if(i % 1000000 === 0) console.log(i);
        let lastIndex = mostRecent[arr[i]];
        if(typeof lastIndex === 'undefined') {
            arr.push(0);
        } else {
            arr.push(i - lastIndex);
        }
        mostRecent[arr[i]] = i;
    }
    return arr[index - 1];
}

// Part 1
console.log(`Part 1: ${getSpokenNumber(2020)}`);

// Part 2
console.log(`Part 2: ${getSpokenNumber(30000000)}`);