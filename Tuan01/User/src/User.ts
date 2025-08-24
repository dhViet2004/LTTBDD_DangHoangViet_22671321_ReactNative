export class User {
    private _name: string;
    constructor(name: string) {
        this._name = name;
    }
    get name (): string{
        return this._name;
    }
    set name (value : string){
        if(value.length>0) this._name = value;
    }
}
 
