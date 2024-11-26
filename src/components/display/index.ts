import BaseElement from '../base-component';
import Calculator from '../calculator';
import './style.scss';

export default class Display extends BaseElement<HTMLElement> {
    calculator: Calculator;

    constructor() {
        super({ tag: 'div', class: 'display-container' });
        this.calculator = Calculator.getInstance();
        this.calculator.addListener(this.updateText);
    }

    private updateText = (str: string) => {
        this.node.textContent = str;
    };
}
