"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(n) {
        if (n) {
            this.name = n;
        }
    }
    greet(msg) {
        if (this.name) {
            console.log(msg + ' ' + this.name);
        }
        else {
            console.log('HI!');
        }
    }
}
let user1 = new Person('Max');
user1.greet('Hi there, I am');
user1.name = 'Jimmy';
user1.greet('Hello world - ');
