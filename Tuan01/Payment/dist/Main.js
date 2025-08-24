"use strict";
class CashPayment {
    pay(amount) {
        console.log(`Paid ${amount} using Cash.`);
    }
}
class CreditCardPayment {
    pay(amount) {
        console.log(`Paid ${amount} using Credit Card.`);
    }
}
const cash = new CashPayment();
cash.pay(100);
