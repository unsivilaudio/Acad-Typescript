// class User {
//   name: string;
//   age: number;

//   constructor(n: string, a: number) {
//     // this.name = 'Max';
//     this.name = n;
//     this.age = a;
//   }
// }

class Person {
  readonly hobbies: string[] = [];

  constructor(public name: string, private readonly age: number) {}

  greet() {
    console.log('My age: ' + this.age);
  }
}

const max1 = new Person('Max', 36);
const fred = new Person('Fred', 29);

// max.hobbies = ['Sports']

console.log(max1, fred);
