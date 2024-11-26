import BaseElement from '../base-component';

export default class ThemeManager extends BaseElement<HTMLElement>{
    static #instance: ThemeManager;

    private subscribers: (() => void)[];

    private constructor() {
        super({ tag: 'button', class: 'theme-manager-button'});
        this.node.onclick = this.toggleTheme;
        this.subscribers = [];
    }

    public static getInstance(): ThemeManager {
        if (!ThemeManager.#instance) {
            ThemeManager.#instance = new ThemeManager();
        }

        return ThemeManager.#instance;
    }

    toggleTheme = () => {
        this.notifySubscribers();
    }

    private notifySubscribers = () => {
        this.subscribers.forEach((subscriber) => {
            subscriber();
        });
    };

    subscribe = (method: () => void) => {
        this.subscribers.push(method);
    };
}