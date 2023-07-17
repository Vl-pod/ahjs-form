import { Popover } from './Popover';

const container = document.querySelector('.container');
const headerMessage = 'Popover title';
const bodyMessage = "And here's some amazing. It's very engaging. Right?";
const form = new Popover(container, headerMessage, bodyMessage);

form.bindToDOM();
