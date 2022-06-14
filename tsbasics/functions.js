"use strict";
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result: ' + num);
}
function addAndHandle(n1, n2, cb) {
    const result = n1 + n2;
    cb(result);
}
let combineValues;
combineValues = add;
console.log(combineValues(8, 8));
addAndHandle(10, 12, console.log);
