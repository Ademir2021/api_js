import { client } from "../connect"

export abstract class Pg {
    protected _id: number = 0;
    protected _name: string | number;
    constructor(id: number, name: string | number) {
        this._id = id;
        this._name = name;
    };

    public abstract insert(): void;
    public abstract select(): void;
    public abstract update(): void;
    public abstract delete(): void;

}
