export default class Calculator {
    static #instance: Calculator;

    private constructor() {
        
    }

    public static getInstance(): Calculator {
        if (!Calculator.#instance) {
            Calculator.#instance = new Calculator();
        }

        return Calculator.#instance;
    }

    putNumber = (num: Numbers) => {
        console.log(num);
    }

    putOperator = (operator: Operators) => {
        console.log(operator);
    }

    getData = () => {
        return '1 + 2';
    }
}

class Numbers {}

class Operators {}

export class Display {
    calculator: Calculator;

    constructor(calculator: Calculator) {
        this.calculator = calculator;
    }

    show = () => {
        console.log(this.calculator.getData());
    }
}

// const calculator = new Calculator();
// calculator.putNumber(1);
// calculator.putOperator(+);
// calculator.putNumber(2);
// calculator.getData() == "1 + 2";

// const calculator = new Calculator();
// calculator.putNumber(1);
// calculator.putOperator(+);
// calculator.putNumber(2);
// calculator.putOperator(=);
// calculator.getData() == "3";

// const calculator = new Calculator();
// calculator.putNumber(1);
// calculator.putOperator(+);
// calculator.putOperator(*);
// calculator.getData() == "1 *";

