export class BankAccount {
    balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    deposit(amount: number): void{
        if(amount>0) this.balance += amount;
    }

    withdraw(amount: number): void {
        if(amount>0 && amount <= this.balance) this.balance -= amount;
    }
} 
