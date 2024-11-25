import BaseElement from './components/base-component';
import Display from './components/display';
import Keys from './components/keys';
import './style.scss';

const calculatorWrapper = new BaseElement<HTMLDivElement>({ tag: 'div', class: 'calculator-wrapper' });
const display = new Display();
const keys = new Keys();
calculatorWrapper.node.append(display.node);
calculatorWrapper.node.append(keys.node);
document.body.append(calculatorWrapper.node);
