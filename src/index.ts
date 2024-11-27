import BaseElement from './components/base-component';
import Display from './components/display';
import Keys from './components/keys';
import './style.scss';
import ThemeManager from './components/ThemeManager';

const updateTheme = () => {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
};

const calculatorWrapper = new BaseElement<HTMLDivElement>({
    tag: 'div',
    class: 'calculator-wrapper',
});
const display = new Display();
const keys = new Keys();
const themeManager = ThemeManager.getInstance();
calculatorWrapper.node.append(display.node);
calculatorWrapper.node.append(keys.node);
document.body.append(calculatorWrapper.node);
document.body.append(themeManager.node);
document.body.classList.add('light');
ThemeManager.getInstance().subscribe(updateTheme);
