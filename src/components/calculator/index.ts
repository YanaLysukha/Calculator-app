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
        // const display = document.querySelector('.display-container') as HTMLElement;
        // const displayedNumber = display?.textContent ?? '0';
        // display.textContent = this.currentSign;
        // if (displayedNumber && displayedNumber === '0') {
        //     display.textContent = this.currentSign;
        // } else {
        //     display.textContent = displayedNumber + this.currentSign;
        // }
    }

    putOperator = (operator: Operators) => {
        console.log(operator);
        // const display = document.querySelector('.display-container') as HTMLElement;
        // const displayedNumber = display?.textContent ?? '0';
        // if (operators.includes(this.previousSign) && operators.includes(this.currentSign)) {
        //     // replace operators
        //     const begin = displayedNumber.slice(0, displayedNumber.length-1);
        //     display.textContent = '';
        //     display.textContent = begin + this.currentSign;
        // } else {
        //     display.textContent = displayedNumber + this.currentSign;
        // }
        // this.previousSign = this.currentSign;


        // const display = document.querySelector('.display-container') as HTMLElement;
        // const displayedNumber = display?.textContent ?? '0';
    
        // if (display.textContent !== '') {
        //     if (operators.includes(this.previousSign) && operators.includes(this.currentSign)) {
        //         // replace operators
        //         const begin = displayedNumber.slice(0, displayedNumber.length-1);
        //         display.textContent = '';
        //         display.textContent = begin + this.currentSign;
        //     } else {
        //         display.textContent = displayedNumber + this.currentSign;
        //     }
        // } else {
        //     display.textContent = '';
        // }
        // this.previousSign = this.currentSign;
    }

    putDecimal = () => {
        console.log('.');
        // const display = document.querySelector('.display-container') as HTMLElement;
        // const displayedNumber = display?.textContent ?? '0';
        // display.textContent = displayedNumber + '.';
    }

    getData = () => {
        return '1 + 2';
    }

    calculate = () => {
        console.log('calculate');
        // const display = document.querySelector('.display-container') as HTMLElement;
        // const displayedNumber = display?.textContent ?? '0';
        // const expressionParts = displayedNumber.split(' ');
        // display.textContent = this.calculateNew(...expressionParts).toString(); 
    }

    // calculateNew = (...params: string[]) => {
    //     let result: number = 0;
    //     let num1: string = '';
    //     let num2: string;
    //     let operator: string = '';
    //     for (let i = 0; i < params.length; i += 2) {
    //         if(!isNaN(Number(params[i]))) {
    //             num1 = params[i];
    //             console.log('num1', num1);
    //         }
    //         if (isNaN(Number(params[i + 1]))) {
    //             operator = params[i + 1];
    //             console.log('operator', params[i + 1]);
    //         }
    //         if (!isNaN(Number(params[i + 2]))) {
    //             num2 = params[i + 2];
    //             console.log('num2', num2);
    //             const currentResult = this.calculate(num1, operator, num2);
    //             result += currentResult;
    //         }
    //     } 
    //     return result;
    // }

    // calculate = (num1: string, operator: string, num2: string) => {
    //     let result = 0;

    //     switch (operator) {
    //         case '-':
    //             result = parseFloat(num1) - parseFloat(num2);
    //             break;
    //         case '+':
    //             result = parseFloat(num1) + parseFloat(num2);
    //             break;
    //         case '*':
    //             result = parseFloat(num1) * parseFloat(num2);
    //             break;
    //         case '÷':
    //             result = parseFloat(num1) / parseFloat(num2);
    //         default:
    //             console.log(`${result} - Such an operator does not exist!`);
    //     }

    //     return result;
    // }
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

