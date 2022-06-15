"use strict";
var _a;
const el = {
    name: 'Max',
    priviledges: ['create-server'],
    startDate: new Date(),
};
function add(a, b) {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return +a + +b;
}
const result = add('Max', ' Schwarz');
result.split(' ');
const result2 = add(2, 5);
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'My Own Company' },
};
console.log((_a = fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const userVal = null;
const storedData = userVal !== null && userVal !== void 0 ? userVal : 'DEFAULT';
console.log(storedData);
function printEmployee(emp) {
    console.log('Name: ', emp.name);
    if ('priviledges' in emp) {
        console.log('Privledges: ', emp.priviledges);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ', emp.startDate);
    }
}
printEmployee(el);
class Car {
    drive() {
        console.log('Driving...');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount) {
        console.log('Loading cargo ...', amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed:', speed);
}
const bird = {
    type: 'bird',
    flyingSpeed: 10,
};
moveAnimal(bird);
const userInput = document.getElementById('user-input');
userInput.value = 'hi there!';
const errorBag = {
    email: 'Not a valid email!',
    username: 'Must Start with a valid character!',
};
