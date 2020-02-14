import { CRUD } from "./interfaces.js"
import { TableCreation } from "./TableCreate.js"
import { Presentation } from "./ButtonOperations.js"


export class Operations implements CRUD<string>
{
    static count: number;
    static buffer: (string | number)[] = [];
    static flag: string = "off";

    buttonObject: Presentation = new Presentation();


    //Makes the entire row updatable
    editRow(x: string) 
    {
        if (Operations.flag !== "off")
            this.cancelRow(Operations.flag);
        Operations.flag = x;

        let rowId = document.getElementById(x)!;
        let newinput: HTMLInputElement, element: ChildNode;

        for (let j = 0; j < Operations.count; j++) 
        {
            element = rowId.childNodes[j];
            Operations.buffer[j] = element.textContent!;
            element.textContent = "";
            element.appendChild(newinput = document.createElement('input'));
            if (Operations.buffer[j] == "")
                newinput.placeholder = TableCreation.headings[j];
            else
                newinput.placeholder = Operations.buffer[j].toString();
        }

        let saveB: HTMLInputElement, cancelB: HTMLInputElement;
        let lastColumn = rowId.getElementsByTagName('td')[Operations.count];

        //FIRST CHILD IS THE EDIT BUTTON
        saveB = lastColumn.getElementsByTagName('input')[0];
        // LAST CHILD IS THE DELETE BUTTON
        cancelB = lastColumn.getElementsByTagName('input')[1];

        saveB.value = "SAVE";
        saveB.onclick = () => { this.saveRow(x) };

        cancelB.value = "CANCEL";
        cancelB.onclick = () => { this.cancelRow(x) };

    }


    deleteRow = (x: string) => document.getElementById(x)!.remove();


    saveRow(x: string) 
    {
        Operations.flag = "off";
        let val = 0;
        let row = document.getElementById(x)!;
        let cell = row.getElementsByTagName('td');
        let cellInput: string;

        for (let i = 0; i < Operations.count; i++) 
        {
            cellInput = cell[i].querySelector('input')!.value;
            if (cellInput == "") val += 1;
            cell[i].innerHTML = cellInput;
        }

        if (val == Operations.count)
            this.cancelRow(x);
        else
            this.buttonObject.fetchButton(x, this);

    }


    cancelRow(x: string) 
    {
        Operations.flag = "off";
        let val = 0;
        let cell = document.getElementById(x)!.getElementsByTagName('td')!;

        for (let i = 0; i < Operations.count; i++) 
        {
            cell[i].innerHTML = Operations.buffer[i].toString();
            if (cell[i].innerHTML == "") val += 1;
        }

        this.buttonObject.fetchButton(x, this);

        if (val == Operations.count) 
        {
            alert('Empty row would be deleted');
            this.deleteRow(x);
        }

    }

}


