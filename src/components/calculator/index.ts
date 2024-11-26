export type Operators = '+' | '-' | '*' | '%' | '/';

export default class Calculator {
    static #instance: Calculator;

    private listeners: ((str: string) => void)[];

    private operatorsArray: Operators[];

    private numbersArray: number[];

    private currentNumber: number | null;

    private currentOperator: Operators | null;

    private constructor() {
        this.listeners = [];
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
        this.listeners.forEach((listener) => {
            const data = this.getData();
            listener(data);
        });
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
        // console.log(this.currentNumber)
        if (this.currentNumber !== null) {
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
        let data: string = '';
        this.numbersArray.forEach((num, i) => {
            data += `${num}`;
            if (this.operatorsArray[i]) {
                data += `${this.operatorsArray[i]}`;
            }
        })
        if (this.currentOperator) {
            data += `${this.currentOperator}`;
        }
        if (this.currentNumber || this.currentNumber === 0) {
            data += `${this.currentNumber}`;
        }
        return data;
    };

    reset = () => {
        this.numbersArray = [];
        this.operatorsArray = [];
        this.currentNumber = null;
        this.currentOperator = null;
        this.callListeners();
    };

    invertSign = () => {
        if (this.currentNumber) {
            this.currentNumber = this.currentNumber * -1;
        }
        this.callListeners();
    };

    calculate = () => {
        if (this.numbersArray.length === 0 || this.operatorsArray.length === 0) {
            return;
        }
        if (this.currentNumber !== null) {
            this.numbersArray.push(this.currentNumber);
        }
        const numbers = [...this.numbersArray];
        const operators = [...this.operatorsArray];

        for (let i = 0; i < operators.length; ) {
            if (operators[i] === "*" || operators[i] === "/" || operators[i] === "%") {
                const result = this.doOperations(numbers[i], operators[i], numbers[i + 1]);
                numbers.splice(i, 2, result);
                operators.splice(i, 1);
            } else {
                i+=1;
            }
        }

        let result = numbers[0];
        for (let i = 0; i < operators.length; i+=1) {
            result = this.doOperations(result, operators[i], numbers[i + 1]);
        }

        this.reset();
        this.numbersArray.push(result);

        this.callListeners();
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
            case '/':
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    console.error('Division by zero is not allowed!');
                    result = 0;
                }
                break;
            case '%':
                if (num2 === 0) {
                    console.error("Cannot calculate percentage with divisor 0!");
                    result = 0;
                } else {
                    result = num1 * (num2 / 100);
                }
                break;
            default:
                console.log(`${operator} - Such an operator does not exist!`);
        }

        return result;
    }
}
