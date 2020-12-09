/* eslint no-unused-vars: warn */
/* eslint no-undef: warn */
import './css/styles.scss';

const root = document.querySelector('#render-here');
const ai2htmlContext = require.context('./ai2html-output/', false, /^[^-].*\.preview\.html$/);
function copyHandler(){
    const text = this.parentElement.querySelector('figure').outerHTML;
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to your clipboard.');
    });
}
function importAll(r){
    r.keys().forEach(key => {
        insertSection(r, key);
    });
}
function insertSection(r,key){
    const section = document.createElement('section');
    const btn = document.createElement('button');
    btn.className = 'pew-blue-button';
    btn.textContent = 'Copy code';
    btn.style="position: relative; bottom: 25px;";
    btn.addEventListener('click', copyHandler);
    section.insertAdjacentHTML('beforeend', r(key));
    section.appendChild(btn);
    root.appendChild(section);
}
function removeEmpties(){
    document.querySelectorAll('.js-check-empty').forEach(node => {
        if (node.textContent.trim() == ''){
            node.parentElement.removeChild(node);
        }
        if (node.textContent.match(/\\p/)){
            let tagname = node.tagName.toLowerCase();
            let klass = node.className;
            node.outerHTML = `<${tagname}${klass ? ' class="' + klass + '"' : ''}>` + node.textContent.replace(/\\p/g, `</${tagname}><${tagname}${klass ? ' class="' + klass + '"' : ''}>`) + `</${tagname}>`;
        }
    });
}
importAll(ai2htmlContext);
removeEmpties();

document.dispatchEvent(new Event('custom-render-trigger')); 