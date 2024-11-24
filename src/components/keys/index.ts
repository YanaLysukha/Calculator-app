import BaseElement from '../base-component';
import Calculator from '../calculator';
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
    }

    toggleSigns = () => {
        this.calculator.invertSign();
    }

    addNumber = () => {
        this.calculator.putNumber(1);
    }

    checkOperator = () => {
        this.calculator.putOperator('+')
    }

    checkSubtraction = () => {
        this.calculator.putOperator('-');
    }

    addDecimal = () => {
        this.calculator.putDecimal();
    }

    calculateResult = () => {
        this.calculator.calculate();
    }

    keysConfig = [
        { label: 'AC', handler: this.reset },
        { label: ' +/- ', handler: this.toggleSigns },
        { label: ' % ', handler: this.checkOperator },
        { label: ' ÷ ', handler: this.checkOperator },
        { label: '7', handler: this.addNumber },
        { label: '8', handler: this.addNumber },
        { label: '9', handler: this.addNumber },
        { label: ' * ', handler: this.checkOperator },
        { label: '4', handler: this.addNumber },
        { label: '5', handler: this.addNumber },
        { label: '6', handler: this.addNumber },
        { label: ' - ', handler: this.checkSubtraction },
        { label: '1', handler: this.addNumber },
        { label: '2', handler: this.addNumber },
        { label: '3', handler: this.addNumber },
        { label: ' + ', handler: this.checkOperator },
        { label: '0', handler: this.addNumber, className: 'zero-number' },
        { label: '.', handler: this.addDecimal },
        { label: '=', handler: this.calculateResult },
    ];
}
