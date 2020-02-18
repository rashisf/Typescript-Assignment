import { Role } from "./EmployeeModel.js";
import { Presentation } from "./ButtonOperations.js";
import { Operations } from "./BasicOperations.js";
export class TableCreation {
    constructor() {
        this.buttonObject = new Presentation();
        this.operationObject = new Operations();
        let mButton = document.getElementById("mDeleteButton");
        mButton.addEventListener("click", () => { this.operationObject.multipleDelete(); });
    }
    //called when data is fetched
    create(employee) {
        let loadB = document.getElementById('LoadButton');
        if (loadB.value !== "Load Data") {
            loadB.value = "Refresh";
            Operations.flag = "off";
            TableCreation.newid = -1;
        }
        else {
            loadB.value = "Refresh";
            document.getElementById('NewButton').style.display = "block";
            document.getElementById('mDeleteButton').style.display = "block";
            let table = document.getElementsByTagName('table')[0];
            let tableHeader = document.createElement('thead');
            let tableBody = document.createElement('tbody');
            table.appendChild(tableHeader);
            table.appendChild(tableBody);
            TableCreation.headings = Object.keys(employee[0]);
            Operations.count = TableCreation.headings.length;
        }
        this.displayTable(employee);
    }
    //Displays table content
    displayTable(employee) {
        let table = document.getElementsByTagName('table')[0];
        let tableBody = document.getElementsByTagName('tbody')[0];
        let tableHeader = document.getElementsByTagName('thead')[0];
        tableBody.innerHTML = "";
        tableHeader.innerHTML = "";
        let cell, row, head;
        row = document.createElement('tr');
        tableHeader.appendChild(row);
        row.className = "success";
        for (let k of TableCreation.headings) {
            head = document.createElement('th');
            row.appendChild(head);
            head.innerHTML = k;
        }
        head = document.createElement('th');
        row.appendChild(head);
        head.innerHTML = "Operations";
        head = document.createElement('th');
        row.appendChild(head);
        head.innerHTML = "MultipleDelete";
        let n = employee.length;
        for (let i = 0; i < n; i++) {
            tableBody.appendChild(row = document.createElement('tr'));
            row.setAttribute("id", i.toString());
            this.addEmployee(row, employee[i]);
            this.buttonObject.createButton(row, i.toString(), this.operationObject);
        }
        TableCreation.newid = n - 1;
    }
    //Adds Employees one by one
    addEmployee(row, employee) {
        let cell = document.createElement('td');
        cell.innerHTML = employee.firstName;
        row.appendChild(cell);
        cell = document.createElement('td');
        cell.innerHTML = employee.middleName;
        row.appendChild(cell);
        cell = document.createElement('td');
        cell.innerHTML = employee.lastName;
        row.appendChild(cell);
        cell = document.createElement('td');
        cell.innerHTML = employee.email;
        row.appendChild(cell);
        cell = document.createElement('td');
        cell.innerHTML = employee.phone.toString();
        row.appendChild(cell);
        cell = document.createElement('td');
        cell.innerHTML = Role[employee.role];
        row.appendChild(cell);
        cell = document.createElement('td');
        cell.innerHTML = employee.address;
        row.appendChild(cell);
        return employee;
    }
}
TableCreation.headings = [];
TableCreation.newid = -1;
