export class FetchLogic {
    fetchFunction() {
        return fetch("data.json")
            .then(response => response.json());
    }
}
