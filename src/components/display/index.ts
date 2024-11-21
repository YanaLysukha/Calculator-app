import BaseElement from "../base-component";
import './style.scss';

export default class Display extends BaseElement<HTMLElement> {
    constructor() {
        super({ tag: 'div', class: 'display-container' });
    }

    getValue = () => {
        return this.node.textContent;
    }
}
