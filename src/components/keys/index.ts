import BaseElement, { ElementProps } from '../base-component';
import Calculator from '../calculator';
import './style.scss';

type KeysProps = Omit<ElementProps<HTMLElement>, 'tag'>;

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
        this.keysConfig.forEach((key) => {
            this.button = new BaseElement<HTMLButtonElement>({ tag: 'button' });
            this.button.node.textContent = key.label;
            this.node.append(this.button.node);
            if (key.className) {
                this.button.node.classList.add(key.className);
            }
            this.button.node.addEventListener('click', key.handler);
        });
    };

    reset = () => {
        console.log('reset');
    }

    toggleSigns = () => {
        console.log('toggle signs');
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

    keysConfig = [
        { label: 'AC', handler: this.reset, className: 'key-operator' },
        { label: ' +/- ', handler: this.toggleSigns, className: 'key-operator' },
        { label: ' % ', handler: this.checkOperator, className: 'key-operator' },
        { label: ' ÷ ', handler: this.checkOperator, className: 'key-operator' },
        { label: '7', handler: this.addNumber },
        { label: '8', handler: this.addNumber },
        { label: '9', handler: this.addNumber },
        { label: ' * ', handler: this.checkOperator, className: 'key-operator' },
        { label: '4', handler: this.addNumber },
        { label: '5', handler: this.addNumber },
        { label: '6', handler: this.addNumber },
        { label: ' - ', handler: this.checkSubtraction, className: 'key-operator' },
        { label: '1', handler: this.addNumber },
        { label: '2', handler: this.addNumber },
        { label: '3', handler: this.addNumber },
        { label: ' + ', handler: this.checkOperator, className: 'key-operator' },
        { label: '0', handler: this.addNumber, className: 'zero-number' },
        { label: '.', handler: this.addDecimal, className: 'key-operator' },
        { label: '=', handler: this.calculateResult, className: 'key-operator' },
    ];
}
