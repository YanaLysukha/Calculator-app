import BaseElement from '../base-component';
import Calculator from '../calculator';
import './style.scss';
import ThemeManager from '../ThemeManager';

export default class Display extends BaseElement<HTMLElement> {
    calculator: Calculator;

    themeManager: ThemeManager;

    constructor() {
        super({ tag: 'div', class: 'display-container' });
        this.calculator = Calculator.getInstance();
        this.calculator.subscribe(this.updateText);
        this.themeManager = ThemeManager.getInstance();
        this.themeManager.subscribe(this.updateTheme);
        this.node.classList.add('light');
    }

    private updateText = (str: string) => {
        this.node.textContent = str;
    };

    updateTheme = ()=> {
        this.node.classList.toggle('light');
        this.node.classList.toggle('dark');
    }
}
