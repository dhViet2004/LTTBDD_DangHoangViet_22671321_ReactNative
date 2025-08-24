export default class Account {
    public id: string;
    private _balance: number;
    readonly createAt: Date;

    constructor(id: string, balance: number, createAt: Date) {
        this.id = id;
        this._balance = balance;
        this.createAt = createAt;
    
    }

    get balance(): number {
        return this._balance;
    }
};

