"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    constructor(id, balance, createAt) {
        this.id = id;
        this._balance = balance;
        this.createAt = createAt;
    }
    get balance() {
        return this._balance;
    }
}
exports.default = Account;
;
