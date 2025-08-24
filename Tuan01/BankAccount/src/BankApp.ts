import { BankAccount } from "./BankAccount";

const account = new BankAccount(100);
console.log("Nạp 10");
account.deposit(10);

console.log("Số tiền còn trong tài khoản:", account.balance);

console.log("Rút 30");
account.withdraw(30);

console.log("Số tiền còn trong tài khoản:", account.balance);


