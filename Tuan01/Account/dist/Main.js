"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = __importDefault(require("./Account"));
const account = new Account_1.default("id", 100, new Date());
console.log(`Account ID: ${account.id}`);
console.log(`Account Balance: ${account.balance}`);
console.log(`Account Created At: ${account.createAt}`);
