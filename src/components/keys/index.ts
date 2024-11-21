import BaseElement, { ElementProps } from "../base-component";
import './style.scss';

type KeysProps = Omit<ElementProps<HTMLElement>, 'tag'>;

const keysConfig = [
    { type: 'operator', label: 'AC', action: 'reset' },
    { type: 'operator', label: '+/-', action: 'sign change' },
    { type: 'operator', label: '%', action: 'percent' },
    { type: 'operator', label: '÷', action: 'division' },
    { type: 'number', label: '7' },
    { type: 'number', label: '8' },
    { type: 'number', label: '9' },
    { type: 'operator', label: '*', action: 'multiplication' },
    { type: 'number', label: '4' },
    { type: 'number', label: '5' },
    { type: 'number', label: '6' },
    { type: 'operator', label: '-', action: 'subtraction' },
    { type: 'number', label: '1' },
    { type: 'number', label: '2' },
    { type: 'number', label: '3' },
    { type: 'operator', label: '+', action: 'addition' },
    { type: 'number', label: '0' },
    { type: 'operator', label: '.', action: 'decimal' },
    { type: 'operator', label: '=', action: 'calculation' },
];

export default class Keys extends BaseElement<HTMLElement> {
    constructor(props: KeysProps) {
        super({ tag: 'div', class: 'keys-container', ...props });
        this.createKeys();
    }

    private createKeys = () => {
        keysConfig.forEach((key) => {
            const button = new BaseElement<HTMLButtonElement>({ tag: 'button' });
            button.node.textContent = key.label;
            this.node.append(button.node);
            if (key.type === 'operator' && key.action) {
                button.node.classList.add('key-operator');
                button.node.setAttribute('data-action', key.action);
            }
            if (key.label === '0') {
                button.node.classList.add('zero-number');
            }
        });
    }
}
