import { TableCreation } from "./TableCreate.js";
import { Presentation } from "./ButtonOperations.js";
//import { Employee } from "./EmployeeModel.js";
export class Operations {
    constructor() {
        this.buttonObject = new Presentation();
        this.deleteRow = (x) => document.getElementById(x).remove();
    }
    //Makes the entire row updatable
    editRow(x) {
        if (Operations.flag !== "off")
            this.cancelRow(Operations.flag);
        Operations.flag = x;
        let rowId = document.getElementById(x);
        let newinput, element;
        let errorLine;
        for (let j = 0; j < Operations.count; j++) {
            element = rowId.childNodes[j];
            Operations.buffer[j] = element.textContent;
            element.textContent = "";
            element.appendChild(newinput = document.createElement('input'));
            element.appendChild(errorLine = document.createElement('p'));
            errorLine.id = "e" + x + j;
            if (Operations.buffer[j] == "")
                newinput.placeholder = TableCreation.headings[j];
            else
                newinput.value = Operations.buffer[j].toString();
        }
        let selectElement = document.getElementById(x).getElementsByTagName('td')[5];
        selectElement.innerHTML = " <select><option>Trainee</option> <option>QA</option> <option>Devops</option><option>Developer</option></select>";
        selectElement.appendChild(errorLine = document.createElement('p'));
        errorLine.id = "e" + x + '5';
        let saveB, cancelB;
        let lastColumn = rowId.getElementsByTagName('td')[Operations.count];
        //FIRST CHILD IS THE EDIT BUTTON
        saveB = lastColumn.getElementsByTagName('input')[0];
        // LAST CHILD IS THE DELETE BUTTON
        cancelB = lastColumn.getElementsByTagName('input')[1];
        saveB.value = "SAVE";
        saveB.onclick = () => { this.saveRow(x); };
        cancelB.value = "CANCEL";
        cancelB.onclick = () => { this.cancelRow(x); };
    }
    saveRow(x) {
        let row = document.getElementById(x);
        let cell = row.getElementsByTagName('td');
        let cellInput = [];
        for (let i = 0; i < Operations.count; i++) {
            document.getElementById('e' + x + i).innerHTML = " ";
            if (i === 5) {
                cellInput[i] = cell[i].querySelector('select').value;
                continue;
            }
            cellInput[i] = cell[i].querySelector('input').value;
        }
        let answer = this.validateFields(cellInput, x);
        if (answer === true) {
            Operations.flag = "off";
            for (let i = 0; i < Operations.count; i++)
                cell[i].innerHTML = cellInput[i];
            this.buttonObject.fetchButton(x, this);
        }
    }
    cancelRow(x) {
        Operations.flag = "off";
        let val = 0;
        let cell = document.getElementById(x).getElementsByTagName('td');
        for (let i = 0; i < Operations.count; i++) {
            cell[i].innerHTML = Operations.buffer[i].toString();
            if (cell[i].innerHTML == "")
                val += 1;
        }
        this.buttonObject.fetchButton(x, this);
        if (val == Operations.count) {
            this.deleteRow(x);
        }
    }
    validateFields(employee, x) {
        if (!employee[0].match(/^[a-zA-Z]+$/)) {
            document.getElementById('e' + x + '0').innerHTML = 'Only alphabets are allowed';
            return false;
        }
        if (!employee[1].match(/^[a-zA-Z]+$/)) {
            document.getElementById('e' + x + '1').innerHTML = 'Only alphabets are allowed';
            return false;
        }
        if (!employee[2].match(/^[a-zA-Z]+$/)) {
            document.getElementById('e' + x + '2').innerHTML = 'Only alphabets are allowed';
            return false;
        }
        if (!employee[3].match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            document.getElementById('e' + x + '3').innerHTML = 'Enter valid email';
            return false;
        }
        if (!employee[4].match(/[+]?[0-9]{10,13}$/)) {
            document.getElementById('e' + x + '4').innerHTML = 'Only digits are allowed';
            return false;
        }
        if (employee[6] === "") {
            document.getElementById('e' + x + '6').innerHTML = 'Invalid Address';
            return false;
        }
        return true;
    }
    multipleDelete() {
        var _a;
        Operations.flag = "off";
        const box = document.getElementsByName('check');
        const n = box.length;
        let arr = [];
        for (let i = 0; i < n; i++) {
            if (box[i] && box[i].checked) {
                let str = (_a = box[i].parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
                arr.push(str.id);
            }
        }
        for (let x of arr)
            this.deleteRow(x);
    }
}
Operations.buffer = [];
Operations.flag = "off";
