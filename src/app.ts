import {Consumer} from "./consumer";
import {Inject} from "./decorators/inject";

console.log('>>> app.ts | running...')

class Main {
    @Inject('consumer') consumer!: Consumer;
    constructor( ) {
        console.log('>>> app.ts | ', { currentDate: this.consumer.currentDate });

    }
}

const main = new Main();

console.log('>>> app.ts | Getting another instance of Consumer without Inject')
const consumer2 = new Consumer();
console.log('>>> app.ts | ', { currentDate: consumer2.currentDate })