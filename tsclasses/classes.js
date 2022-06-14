"use strict";
class Department {
    // private name: string;
    // private employees: string[] = [];
    constructor(id, name, employees = []) {
        this.id = id;
        this.name = name;
        this.employees = employees;
        // this.id = id;
        // this.name = name;
        // this.employees = employees;
    }
    static createEmployee(name) {
        return { name };
    }
    describe() {
        console.log('Department: ' + this.id + ' ' + this.name);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees);
    }
}
Department.fiscalYear = 2020;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log('IT deparment ID: ' + this.id);
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('Please add a value');
        }
        this.addReport(value);
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
    addReport(text) {
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
