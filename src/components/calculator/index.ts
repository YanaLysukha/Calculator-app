export type Operators = '+' | '-' | '*' | '%' | '/';

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

    calculate = () => {
        if (this.currentNumber) {
            this.numbersArray.push(this.currentNumber);
        }
        let result = 0;
        const resultsArr = [];
        for (let i = 0; i < this.numbersArray.length - 1; i += 1) {
            if (i === 0) {
                result = this.doOperations(this.numbersArray[i], this.operatorsArray[i], this.numbersArray[i + 1]);
            } else {
                result = this.doOperations(resultsArr[resultsArr.length - 1], this.operatorsArray[i], this.numbersArray[i + 1]);
            }
            resultsArr.push(result);
        }
        this.reset();
        this.data = `${result}`;
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
