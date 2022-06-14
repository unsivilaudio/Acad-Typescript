type AddFn = (a: number, b: number) => number;

let add: AddFn;
add = (n1: number, n2: number) => {
    return n1 + n2;
};

interface Named {
    readonly name?: string;
    outputName?: string;
}

interface Greetable extends Named {
    greet: (phrase: string) => void;
}

class Person implements Greetable {
    name?: string;

    constructor(n?: string) {
        if (n) {
            this.name = n;
        }
    }

    greet(msg: string) {
        if (this.name) {
            console.log(msg + ' ' + this.name);
        } else {
            console.log('HI!');
        }
    }
}

let user1 = new Person('Max');

user1.greet('Hi there, I am');
user1.name = 'Jimmy';
user1.greet('Hello world - ');
