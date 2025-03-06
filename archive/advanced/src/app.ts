type Admin = {
    name: string;
    priviledges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const el: ElevatedEmployee = {
    name: 'Max',
    priviledges: ['create-server'],
    startDate: new Date(),
};

type Combineable = string | number;
type Numeric = number | boolean;

type Universal = Combineable & Numeric;

function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: Combineable, b: Combineable) {
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

console.log(fetchedUserData.job?.title);

const userVal = null;
const storedData = userVal ?? 'DEFAULT';
console.log(storedData);

type UnknownEmployee = Employee | Admin;

function printEmployee(emp: UnknownEmployee) {
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

    loadCargo(amount: number) {
        console.log('Loading cargo ...', amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed: number;
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

const bird: Bird = {
    type: 'bird',
    flyingSpeed: 10,
};

moveAnimal(bird);

const userInput = <HTMLInputElement>document.getElementById('user-input');

userInput.value = 'hi there!';

interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must Start with a valid character!',
};
