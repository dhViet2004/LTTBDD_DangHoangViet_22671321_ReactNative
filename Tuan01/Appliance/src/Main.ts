abstract class Appliance {
    abstract turnOn(): void;
} 

class Fan extends Appliance {
    turnOn(): void {
        console.log("Fan is now ON");
    }
}

class AirConditioner extends Appliance {
    turnOn(): void {
        console.log("Air Conditioner is now ON");
    }
}

const fan = new Fan();
fan.turnOn();

const ac = new AirConditioner();
ac.turnOn();