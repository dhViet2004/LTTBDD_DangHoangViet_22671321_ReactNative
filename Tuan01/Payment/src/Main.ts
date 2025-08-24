interface Payment {
    pay(amount: number): void;
} 

class CashPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid ${amount} using Cash.`);
    }
}

class CreditCardPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid ${amount} using Credit Card.`);
    }
}

const cash = new CashPayment();
cash.pay(100);
