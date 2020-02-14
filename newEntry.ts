import { TableCreation } from "./TableCreate.js";
import { ButtonPresentation } from "./interfaces.js";
import { Presentation } from "./ButtonOperations.js";
import { Operations } from "./BasicOperations.js";

export class NewEntry
{
    buttonObject: Presentation;
    operationObject: Operations;

    constructor()
    {   
        this.buttonObject = new Presentation;
        this.operationObject = new Operations;
        let newButton = document.getElementById("NewButton") as HTMLInputElement;
        newButton.addEventListener("click",() => {this.newData()});

    }

    newData()
    {
        let row : HTMLTableRowElement, cell: HTMLTableDataCellElement;
        let rowId = TableCreation.newid.toString();
        let tableBody = document.querySelector('tbody')!;
        tableBody.appendChild(row = document.createElement('tr'));
        row.setAttribute("id", rowId);
      
        for (let k of TableCreation.headings)
            row.appendChild(cell = document.createElement('td'));

        this.buttonObject.createButton(row, rowId,this.operationObject);
        this.operationObject.editRow(rowId);
        
        TableCreation.newid+= 1;
    }
}