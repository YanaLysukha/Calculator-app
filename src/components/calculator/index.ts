type Operators = '+' | '-' | '*' | '%' | '/';
const operatorsArr = ['+', '-', '*', '%', '/'];

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

    private checkFirstNumber = () => {
       return this.data === '0'; 
    }

    putOperator = (operator: Operators) => {
        const lastCharIndex = this.data.length - 1;
        const firstPartOfData = this.data.slice(0, lastCharIndex);
        if (operatorsArr.includes(this.data[lastCharIndex])) {
            this.data = '';
            this.data = firstPartOfData + operator;
        } else {
            this.data += operator;
        }
    }

    putDecimal = () => {
        if (this.data[this.data.length - 1] !== '.') {
            this.data += '.';
        }
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

