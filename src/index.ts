import Display from './components/display';
import Keys from './components/keys';
import './style.scss';

const display = new Display();
const keys = new Keys({});
document.body.append(display.node);
document.body.append(keys.node);
