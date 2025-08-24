import Account from "./Account";

const account = new Account("id", 100, new Date());
console.log(`Account ID: ${account.id}`);
console.log(`Account Balance: ${account.balance}`);
console.log(`Account Created At: ${account.createAt}`);
