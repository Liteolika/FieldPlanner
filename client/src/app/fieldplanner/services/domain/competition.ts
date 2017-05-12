import { UUID } from "../helpers/uuid";

export class Competition {
    public id: string;
    public name: string;

    constructor(id: string, name: string) {

        if (name === null || name.trim() === "") {
            throw new Error("Competition name cannot be empty");
        }

        this.id = id;
        this.name = name;
    }

}