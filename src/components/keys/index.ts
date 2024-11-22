import BaseElement, { ElementProps } from '../base-component';
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
    private button!: BaseElement<HTMLButtonElement>;

    constructor(props: KeysProps) {
        super({ tag: 'div', class: 'keys-container', ...props });
        this.createKeys();
        this.onClickHandler();
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
        });
    };

    private onClickHandler = () => {
        this.node.addEventListener('click', (e) => {
            // позже заменить
            const display = document.querySelector('.display-container') as HTMLElement;
            const displayedNumber = display?.textContent ?? '0';

            const target = e.target as HTMLElement;

            if (target.tagName === 'BUTTON') {
                const action = target.dataset.action;
                const content = target.textContent;
                if (!action) {
                    display.textContent = content;
                    if (displayedNumber && displayedNumber === '0') {
                        display.textContent = content;
                    } else {
                        display.textContent = displayedNumber + content;
                    }
                } else if (
                    action === 'division' ||
                    action === 'multiplication' ||
                    action === 'subtraction' ||
                    action === 'addition' ||
                    action === 'percent'
                ) {
                    if (action === 'subtraction' || display.textContent !== '') {
                        display.textContent = displayedNumber + content;
                    } else {
                        display.textContent = '';
                    }
                }
                if (action === 'decimal') {
                    display.textContent = displayedNumber + '.';
                }
            }
        });
    };
}
