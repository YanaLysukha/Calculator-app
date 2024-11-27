import BaseElement from '../base-component';
import './style.scss';

export default class ThemeManager extends BaseElement<HTMLElement> {
    static #instance: ThemeManager;

    private subscribers: (() => void)[];

    private constructor() {
        super({ tag: 'div', class: 'theme-manager-wrapper' });
        this.createThemeSwitcher();
        this.subscribers = [];
    }

    private createThemeSwitcher = () => {
        const switcherLabel = new BaseElement<HTMLLabelElement>({ tag: 'label', class: 'switch' });
        this.node.append(switcherLabel.node);
        const inputThemeSwitcher = new BaseElement<HTMLInputElement>({
            tag: 'input',
            type: 'checkbox',
            id: 'theme-switcher',
        });
        const stylesSlider = new BaseElement<HTMLSpanElement>({
            tag: 'span',
            class: 'slider',
            onclick: this.toggleTheme,
        });
        switcherLabel.node.append(inputThemeSwitcher.node);
        switcherLabel.node.append(stylesSlider.node);
    };

    public static getInstance(): ThemeManager {
        if (!ThemeManager.#instance) {
            ThemeManager.#instance = new ThemeManager();
        }

        return ThemeManager.#instance;
    }

    toggleTheme = () => {
        this.notifySubscribers();
    };

    private notifySubscribers = () => {
        this.subscribers.forEach((subscriber) => {
            subscriber();
        });
    };

    subscribe = (method: () => void) => {
        this.subscribers.push(method);
    };
}
