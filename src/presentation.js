import markdown from './presentation.md';
import './css/fonts.css';
import './css/presentation.scss';
import './css/styles.scss';
import unmodified from './ai2html-output/schematic-override.html';
import modified from './ai2html-output/example-schematic.preview.html';
const container = document.querySelector('#render-here');
container.insertAdjacentHTML('beforeend', markdown);

document.querySelector('#unmodified').insertAdjacentHTML('afterbegin', unmodified);
document.querySelector('#builder-asset').insertAdjacentHTML('afterbegin', modified);