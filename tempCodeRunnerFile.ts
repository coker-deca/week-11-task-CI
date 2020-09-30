function endZeros(value: number): number {
    // your code here
    let strValue = value.toString();
    let index = strValue.length - 1;
    let digit = Number(value[index]);
    let count = 0;
    while (digit !== 0) {
        count++
        digit++
    }
    return count;
}

console.log(endZeros(1000));
