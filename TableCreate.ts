
import { Employee, Role} from "./EmployeeModel.js"
import { Creation } from "./interfaces.js"
import { Presentation} from "./ButtonOperations.js"
import { Operations } from "./BasicOperations.js";


export class TableCreation implements Creation<Employee>
{
    static headings: string[] = [];
    static newid: number = -1;

    buttonObject : Presentation;
    operationObject : Operations;

    constructor()
    {
        this.buttonObject = new Presentation();
        this.operationObject = new Operations();
    }


    //called when data is fetched
    create(employee: Employee[]) 
    {     
        let loadB = document.getElementById('LoadButton')! as HTMLInputElement;

        if (loadB.value !== "Load Data") {
            loadB.value = "Refresh";
            Operations.flag = "off";
            TableCreation.newid = -1;
        }
        else
        {
         
            loadB.value = "Refresh";
            document.getElementById('NewButton')!.style.display = "block";
            let table = document.getElementsByTagName('table')[0];
            let tableHeader = document.createElement('thead');
            let tableBody = document.createElement('tbody')
            table.appendChild(tableHeader);
            table.appendChild(tableBody);
            TableCreation.headings = Object.keys(employee[0]);
            Operations.count = TableCreation.headings.length;
        }

        this.displayTable(employee);
    }

    //Displays table content
    displayTable(employee: Employee[]) 
    {
        
        let table = document.getElementsByTagName('table')[0];
        let tableBody = document.getElementsByTagName('tbody')[0];
        let tableHeader = document.getElementsByTagName('thead')[0];
        tableBody.innerHTML = "";
        tableHeader.innerHTML = "";
        let cell: HTMLTableDataCellElement, row: HTMLTableRowElement, head: HTMLTableHeaderCellElement;
        row = document.createElement('tr');
        tableHeader.appendChild(row);
        row.className = "success";

        for (let k of TableCreation.headings) 
        {
            head = document.createElement('th');
            row.appendChild(head);
            head.innerHTML = k;
        }

        head = document.createElement('th')
        row.appendChild(head);
        head.innerHTML = "Operations";

        let n = employee.length;

        for (let i = 0; i < n; i++)
        {
            tableBody.appendChild(row = document.createElement('tr'));
            row.setAttribute("id", i.toString());
            this.addEmployee(row, employee[i]);
            this.buttonObject.createButton(row, i.toString(),this.operationObject);
        }

        TableCreation.newid = n;
        
    }


    //Adds Employees one by one
    addEmployee(row: HTMLTableRowElement, employee: Employee)
    {  
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
        cell.innerHTML =Role[ employee.role];
        row.appendChild(cell);
        cell = document.createElement('td');
        cell.innerHTML = employee.address;   
        row.appendChild(cell); 
    }

}