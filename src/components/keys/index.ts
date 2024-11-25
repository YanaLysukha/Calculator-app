import BaseElement from '../base-component';
import Calculator, { Operators } from '../calculator';
import './style.scss';

export default class Keys extends BaseElement<HTMLElement> {
    private calculator: Calculator;

    constructor() {
        super({ tag: 'div', class: 'keys-container' });
        this.createKeys();
        this.calculator = Calculator.getInstance();
    }

    private createKeys = () => {
        this.keysConfig.forEach((key) => {
            const button = new BaseElement<HTMLButtonElement>({ tag: 'button' });
            button.node.textContent = key.label;
            this.node.append(button.node);
            if (key.className) {
                button.node.classList.add(key.className);
            }
            button.node.addEventListener('click', key.handler);
        });
    };

    reset = () => {
        this.calculator.reset();
    };

    toggleSigns = () => {
        this.calculator.invertSign();
    };

    addNumber = (num: number) => () => this.calculator.putNumber(num);

    checkOperator = (operator: Operators) => () => this.calculator.putOperator(operator);

    addDecimal = () => {
        this.calculator.putDecimal();
    };

    calculateResult = () => {
        this.calculator.calculate();
    };

    keysConfig: {
        label: string;
        handler: () => void;
        className?: undefined | string;
    }[] = [
        { label: 'AC', handler: this.reset, className: 'dark-gray' },
        { label: ' +/- ', handler: this.toggleSigns, className: 'dark-gray' },
        { label: '%', handler: this.checkOperator('%'), className: 'dark-gray' },
        { label: '÷', handler: this.checkOperator('/'), className: 'orange' },
        { label: '7', handler: this.addNumber(7), className: 'gray' },
        { label: '8', handler: this.addNumber(8), className: 'gray' },
        { label: '9', handler: this.addNumber(9), className: 'gray' },
        { label: '×', handler: this.checkOperator('*'), className: 'orange' },
        { label: '4', handler: this.addNumber(4), className: 'gray' },
        { label: '5', handler: this.addNumber(5), className: 'gray' },
        { label: '6', handler: this.addNumber(6), className: 'gray' },
        { label: '-', handler: this.checkOperator('-'), className: 'orange' },
        { label: '1', handler: this.addNumber(1), className: 'gray' },
        { label: '2', handler: this.addNumber(2), className: 'gray' },
        { label: '3', handler: this.addNumber(3), className: 'gray' },
        { label: '+', handler: this.checkOperator('+'), className: 'orange' },
        { label: '0', handler: this.addNumber(0), className: 'zero-number' },
        { label: '.', handler: this.addDecimal, className: 'gray' },
        { label: '=', handler: this.calculateResult, className: 'orange' },
    ];
}
