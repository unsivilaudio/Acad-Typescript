abstract class Department {
    static fiscalYear = 2020;
    // private name: string;
    // private employees: string[] = [];

    constructor(
        protected readonly id: string,
        private name: string,
        protected employees: string[] = []
    ) {
        // this.id = id;
        // this.name = name;
        // this.employees = employees;
    }

    static createEmployee(name: string) {
        return { name };
    }

    describe(this: Department) {
        console.log('Department: ' + this.id + ' ' + this.name);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
    }

    describe(): void {
        console.log('IT deparment ID: ' + this.id);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please add a value');
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

    describe() {
        console.log('Accounting department ID: ' + this.id);
    }

    addReport(text: string) {
        this.reports.push(text);
    }

    printReports() {
        console.log(this.reports);
    }
}

// const accounting = new AccountingDepartment('n3', [
//     'good job',
//     'bad job',
//     'ugly job',
// ]);

const accounting = AccountingDepartment.getInstance();
// Same  instance!!!!
const accounting2 = AccountingDepartment.getInstance();

const informationTech = new ITDepartment('i3', ['Max']);

const employee1 = Department.createEmployee('Max');
console.log(employee1);

accounting.mostRecentReport = 'Year End Report';
console.log(accounting.mostRecentReport);
accounting.addEmployee('Max');
accounting.addEmployee('Jeff');

accounting.describe();
accounting.printEmployeeInformation();
accounting.printReports();

// const accountingCopy = { name: 's', describe: accounting.describe };
// accountingCopy.describe();
