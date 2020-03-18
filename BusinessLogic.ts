import { Employee } from "./EmployeeModel.js"
import { FetchData } from "./interfaces.js"

export class FetchLogic implements FetchData<Employee>
{
    fetchFunction(): Promise<Employee[]> 
    {
        return fetch("data.json")
            .then(response => response.json())
    }
}