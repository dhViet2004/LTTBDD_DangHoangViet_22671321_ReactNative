"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }
    deposit(amount) {
        if (amount > 0)
            this.balance += amount;
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance)
            this.balance -= amount;
    }
}
exports.BankAccount = BankAccount;
