enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR,
}

const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: Role;
} = {
    name: 'Max',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN,
};

for (const hobby of person.hobbies) {
    console.log(hobby);
}

person.role = Role.AUTHOR;
console.log(person.name);

let favoriteActivities: string[];
favoriteActivities = ['Sports'];
