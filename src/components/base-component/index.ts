export type TagName = keyof HTMLElementTagNameMap;

export type Callback = (event: Event) => void;

export type ElementProps<T extends HTMLElement = HTMLElement> = {
  tag: TagName;
  class?: string | string[];
  text?: string;
} & Omit<Partial<T>, 'tag' | 'class' | 'text'>;

export default class BaseElement<T extends HTMLElement> {
  #node: T;

  constructor(props: ElementProps<T>, ...children: BaseElement<HTMLElement>[]) {
    this.#node = document.createElement(props.tag) as T;

    if (props.class) {
      if (typeof props.class === 'string') {
        this.node.classList.add(props.class);
      } else if (Array.isArray(props.class)) {
        this.node.classList.add(...props.class);
      }
    }

    if (props.text) {
      this.node.textContent = props.text;
    }

    if (children) {
      children.forEach((element) => {
        this.node.append(element.node);
      });
    }

    Object.assign(this.#node, props);
  }

  get node() {
    return this.#node;
  }
}
