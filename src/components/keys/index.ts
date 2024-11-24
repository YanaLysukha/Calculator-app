import BaseElement, { ElementProps } from '../base-component';
import Calculator from '../calculator';
import './style.scss';

type KeysProps = Omit<ElementProps<HTMLElement>, 'tag'>;

const keysConfig = [
    { type: 'operator', label: 'AC', action: 'reset' },
    { type: 'operator', label: ' +/- ', action: 'sign change' },
    { type: 'operator', label: ' % ', action: 'percent' },
    { type: 'operator', label: ' ÷ ', action: 'division' },
    { type: 'number', label: '7', action: '7' },
    { type: 'number', label: '8', action: '8' },
    { type: 'number', label: '9', action: '9' },
    { type: 'operator', label: ' * ', action: 'multiplication' },
    { type: 'number', label: '4', action: '4' },
    { type: 'number', label: '5', action: '5' },
    { type: 'number', label: '6', action: '6' },
    { type: 'operator', label: ' - ', action: 'subtraction' },
    { type: 'number', label: '1', action: '1' },
    { type: 'number', label: '2', action: '2' },
    { type: 'number', label: '3', action: '3' },
    { type: 'operator', label: ' + ', action: 'addition' },
    { type: 'number', label: '0', action: '0' },
    { type: 'operator', label: '.', action: 'decimal' },
    { type: 'operator', label: '=', action: 'calculation' },
];

const operators = ['-', '+', '%', '÷', '*'];

export default class Keys extends BaseElement<HTMLElement> {
    private button!: BaseElement<HTMLButtonElement>;

    private currentSign!: string;

    private previousSign!: string;

    private calculator: Calculator;

    constructor(props: KeysProps) {
        super({ tag: 'div', class: 'keys-container', ...props });
        this.createKeys();
        this.calculator = Calculator.getInstance();
    }

    private createKeys = () => {
        keysConfig.forEach((key) => {
            this.button = new BaseElement<HTMLButtonElement>({ tag: 'button' });
            this.button.node.textContent = key.label;
            this.node.append(this.button.node);
            if (key.type === 'operator' && key.action) {
                this.button.node.classList.add('key-operator');
                this.button.node.setAttribute('data-action', key.action);
            }
            if (key.label === '0') {
                this.button.node.classList.add('zero-number');
            }
            this.addOnclickHandlers(key, 'calculation', this.calculateResult);
            this.addOnclickHandlers(key, 'decimal',  this.addDecimal);
            this.addOnclickHandlers(key, 'subtraction',  this.checkSubtraction);
            this.addOnclickHandlers(key, 'division', this.checkOperator);
            this.addOnclickHandlers(key, 'multiplication', this.checkOperator);
            this.addOnclickHandlers(key, 'addition', this.checkOperator);
            this.addOnclickHandlers(key, 'percent', this.checkOperator);
            this.addOnclickHandlers(key, '0', this.addNumber);
            this.addOnclickHandlers(key, '1', this.addNumber);
            this.addOnclickHandlers(key, '2', this.addNumber);
            this.addOnclickHandlers(key, '3', this.addNumber);
            this.addOnclickHandlers(key, '4', this.addNumber);
            this.addOnclickHandlers(key, '5', this.addNumber);
            this.addOnclickHandlers(key, '6', this.addNumber);
            this.addOnclickHandlers(key, '7', this.addNumber);
            this.addOnclickHandlers(key, '8', this.addNumber);
            this.addOnclickHandlers(key, '9', this.addNumber);
        });
    };

    addOnclickHandlers = (key: {
        type: string;
        label: string;
        action: string;
    } | {
        type: string;
        label: string;
        action?: undefined;
    }, action: string, handler: () => void) => {
        if (key.action === action) {
            this.button.node.addEventListener('click', handler);
        }
    }

    addNumber = () => {
        const display = document.querySelector('.display-container') as HTMLElement;
        const displayedNumber = display?.textContent ?? '0';
        display.textContent = this.currentSign;
        if (displayedNumber && displayedNumber === '0') {
            display.textContent = this.currentSign;
        } else {
            display.textContent = displayedNumber + this.currentSign;
        }
    }

    checkOperator = () => {
        const display = document.querySelector('.display-container') as HTMLElement;
        const displayedNumber = display?.textContent ?? '0';
    
        if (display.textContent !== '') {
            if (operators.includes(this.previousSign) && operators.includes(this.currentSign)) {
                // replace operators
                const begin = displayedNumber.slice(0, displayedNumber.length-1);
                display.textContent = '';
                display.textContent = begin + this.currentSign;
            } else {
                display.textContent = displayedNumber + this.currentSign;
            }
        } else {
            display.textContent = '';
        }
        this.previousSign = this.currentSign;
    }

    checkSubtraction = () => {
        const display = document.querySelector('.display-container') as HTMLElement;
        const displayedNumber = display?.textContent ?? '0';
        if (operators.includes(this.previousSign) && operators.includes(this.currentSign)) {
            // replace operators
            const begin = displayedNumber.slice(0, displayedNumber.length-1);
            display.textContent = '';
            display.textContent = begin + this.currentSign;
        } else {
            display.textContent = displayedNumber + this.currentSign;
        }
        this.previousSign = this.currentSign;
    }

    addDecimal = () => {
        const display = document.querySelector('.display-container') as HTMLElement;
        const displayedNumber = display?.textContent ?? '0';
        display.textContent = displayedNumber + '.';
    }

    calculateResult = () => {
        const display = document.querySelector('.display-container') as HTMLElement;
        const displayedNumber = display?.textContent ?? '0';
        const expressionParts = displayedNumber.split(' ');
        display.textContent = this.calculateNew(...expressionParts).toString(); 
    }

    calculateNew = (...params: string[]) => {
        let result: number = 0;
        let num1: string = '';
        let num2: string;
        let operator: string = '';
        for (let i = 0; i < params.length; i += 2) {
            if(!isNaN(Number(params[i]))) {
                num1 = params[i];
                console.log('num1', num1);
            }
            if (isNaN(Number(params[i + 1]))) {
                operator = params[i + 1];
                console.log('operator', params[i + 1]);
            }
            if (!isNaN(Number(params[i + 2]))) {
                num2 = params[i + 2];
                console.log('num2', num2);
                const currentResult = this.calculate(num1, operator, num2);
                result += currentResult;
            }
        } 
        return result;
    }

    calculate = (num1: string, operator: string, num2: string) => {
        let result = 0;

        switch (operator) {
            case '-':
                result = parseFloat(num1) - parseFloat(num2);
                break;
            case '+':
                result = parseFloat(num1) + parseFloat(num2);
                break;
            case '*':
                result = parseFloat(num1) * parseFloat(num2);
                break;
            case '÷':
                result = parseFloat(num1) / parseFloat(num2);
            default:
                console.log(`${result} - Such an operator does not exist!`);
        }

        return result;
    }
}
