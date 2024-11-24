export default class Calculator {
    static #instance: Calculator;

    private listeners: ((str: string) => void)[];

    private data: string;

    private constructor() {
        this.listeners = [];
        this.data = '';
    }

    public static getInstance(): Calculator {
        if (!Calculator.#instance) {
            Calculator.#instance = new Calculator();
        }

        return Calculator.#instance;
    }

    addListener = (method: (str: string) => void) => {
        this.listeners.push(method);
    }

    putNumber = (num: number) => {
        if (this.checkFirstNumber()) {
            this.data = num.toString();
        } else {
            this.data += num;
        }
    }

    checkFirstNumber = () => {
       return this.data === '0'; 
    }

    putOperator = (operator: string) => {
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
        this.data += '.';
    }

    getData = () => {
        return this.data;
    }

    calculate = () => {
        console.log('calculate');
        // const display = document.querySelector('.display-container') as HTMLElement;
        // const displayedNumber = display?.textContent ?? '0';
        // const expressionParts = displayedNumber.split(' ');
        // display.textContent = this.calculateNew(...expressionParts).toString(); 
    }

    reset = () => {
        this.data = '';
    }

    invertSign = () => {
        console.log('invert');
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

