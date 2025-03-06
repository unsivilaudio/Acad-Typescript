import fs from 'node:fs';

// fs.readFileSync()

let userName: string;

userName = 'Max';

console.log(userName);

function add(a: any, b: any) {
  return a + b;
}

const result = add(1, 2);
console.log(result);
