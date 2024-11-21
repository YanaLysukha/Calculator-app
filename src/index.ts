import Keys from './components/keys';
import './style.scss';

const text = document.createElement('h1');
text.textContent = 'Hello!';
document.body.append(text);

const keys = new Keys({});
document.body.append(keys.node);
