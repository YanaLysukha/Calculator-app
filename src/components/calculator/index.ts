export type Operators = '+' | '-' | '*' | '%' | '/';

export default class Calculator {
    static #instance: Calculator;

    private subscribers: ((str: string) => void)[];

    private operatorsArray: Operators[];

    private numbersArray: number[];

    private currentNumber: number | null;

    private currentOperator: Operators | null;

    private showError: boolean = false;

    private decimalPart = 1;

    private isDecimalPointUsed = false;

    private constructor() {
        this.subscribers = [];
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

    private notifySubscribers = () => {
        this.subscribers.forEach((subscriber) => {
            const data = this.getData();
            subscriber(data);
        });
    };

    subscribe = (method: (str: string) => void) => {
        this.subscribers.push(method);
    };

    putNumber = (num: number) => {
        if (this.showError) {
            this.reset();
        }
        if (this.currentOperator) {
            this.operatorsArray.push(this.currentOperator);
            this.currentOperator = null;
        }
        if (this.currentNumber === null) {
            this.currentNumber = num;
        } else {
            if (this.isDecimalPointUsed){
                this.decimalPart = this.decimalPart / 10;
                this.currentNumber = this.currentNumber + num * this.decimalPart;
            }
            else{
                this.currentNumber = this.currentNumber * 10 + num;
            }
        }
        this.notifySubscribers();
    };

    putOperator = (operator: Operators) => {
        if (this.isDecimalPointUsed){
            this.isDecimalPointUsed = false;
            this.decimalPart = 1;
        }
        // console.log(this.currentNumber)
        if (this.currentNumber !== null) {
            this.numbersArray.push(this.currentNumber);
            this.currentNumber = null;
        }
        if (this.numbersArray.length !== 0) {
            this.currentOperator = operator;
        }

        this.notifySubscribers();
    };

    putDecimal = () => {
        this.isDecimalPointUsed = true;

        if (this.currentNumber === null){
            this.currentNumber = 0;
        }

        this.notifySubscribers();
    };

    getData = () => {
        if (this.showError) {
            return 'Error!';
        }

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
        this.isDecimalPointUsed = false;
        this.decimalPart = 1;
        this.operatorsArray = [];
        this.currentNumber = null;
        this.currentOperator = null;
        this.showError = false;
        this.notifySubscribers();
    };

    invertSign = () => {
        if (this.currentNumber) {
            this.currentNumber = this.currentNumber * -1;
        }
        if (this.numbersArray.length === 1 && this.currentNumber === null) {
            this.numbersArray[0] = this.numbersArray[0] * -1;
        }
        this.notifySubscribers();
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

        if (!this.showError) {
            this.reset();
            this.numbersArray.push(result);
        }

        this.notifySubscribers();
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
                    this.showError = true;
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
