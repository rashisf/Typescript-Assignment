import { TableCreation } from "./TableCreate.js";
import { Presentation } from "./ButtonOperations.js";
import { Operations } from "./BasicOperations.js";
export class NewEntry {
    constructor() {
        this.buttonObject = new Presentation();
        this.operationObject = new Operations();
        let newButton = document.getElementById("NewButton");
        newButton.addEventListener("click", () => { this.newData(); });
    }
    newData() {
        TableCreation.newid += 1;
        let row, cell;
        let rowId = TableCreation.newid.toString();
        let tableBody = document.querySelector('tbody');
        tableBody.appendChild(row = document.createElement('tr'));
        row.setAttribute("id", rowId);
        for (let k of TableCreation.headings)
            row.appendChild(cell = document.createElement('td'));
        this.buttonObject.createButton(row, rowId, this.operationObject);
        this.operationObject.editRow(rowId);
    }
}
