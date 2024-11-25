export type Operators = '+' | '-' | '*' | '%' | '/';
// const operatorsArr = ['+', '-', '*', '%', '/'];

export default class Calculator {
    static #instance: Calculator;

    private listeners: ((str: string) => void)[];

    private data: string;

    private operatorsArray: Operators[];

    private numbersArray: number[];

    private currentNumber: number | null;

    private currentOperator: Operators | null;

    private constructor() {
        this.listeners = [];
        this.data = '';
        this.operatorsArray = [];
        this.numbersArray = [];
        this.currentNumber = null;
        this.currentOperator = null;
    }

    public static getInstance(): Calculator {
        if (!Calculator.#instance) {
            Calculator.#instance = new Calculator();
        }

        return Calculator.#instance;
    }

    private callListeners = () => {
        this.listeners.forEach((listener) => listener(this.getData()));
    };

    addListener = (method: (str: string) => void) => {
        this.listeners.push(method);
    };

    putNumber = (num: number) => {
        if (this.currentOperator) {
            this.operatorsArray.push(this.currentOperator);
            this.currentOperator = null;
        }
        if (this.currentNumber === null) {
            this.currentNumber = num;
        } else {
            this.currentNumber = this.currentNumber * 10 + num;
        }

        this.callListeners();
    };

    putOperator = (operator: Operators) => {
        if (this.currentNumber) {
            this.numbersArray.push(this.currentNumber);
            this.currentNumber = null;
        }
        this.currentOperator = operator;
        this.callListeners();
    };

    putDecimal = () => {
        // if (this.data[this.data.length - 1] !== '.') {
        //     this.data += '.';
        // }
        this.callListeners();
    };

    getData = () => {
        this.numbersArray.forEach((num, i) => {
            this.data += `${num}`;
            if (this.operatorsArray[i]) {
                this.data += `${this.operatorsArray[i]}`;
            }
        })
        if (this.currentOperator) {
            this.data += `${this.currentOperator}`;
        }
        if (this.currentNumber) {
            this.data += `${this.currentNumber}`;
        }
        return this.data;
    };

    reset = () => {
        this.numbersArray = [];
        this.operatorsArray = [];
        this.currentNumber = null;
        this.currentOperator = null;
        this.data = '';
        this.callListeners();
    };

    invertSign = () => {
        if (this.currentNumber) {
            this.currentNumber = this.currentNumber * -1;
        }
        this.callListeners();
    };

    calculateResult = () => {
        console.log('calculate');
        // let result = 0;

        // const calculate = (array: number[]): void => {
        //     result = this.doOperations(array[0], this.operatorsArray[0], array[1]);
        //     const restArray = array.slice(2);
        //     return calculate([result, ...restArray]);
        // }
        
        // calculate(this.numbersArray);
        // this.reset();
        // this.data = `${result}`;
    };

    doOperations = (num1: number, operator: string, num2: number) => {
        let result = 0;

        switch (operator) {
            case '-':
                result = num1 - num2;
                break;
            case '+':
                result = num1 + num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '÷':
                result = num1 / num2;
            default:
                console.log(`${result} - Such an operator does not exist!`);
        }

        return result;
    }
}
