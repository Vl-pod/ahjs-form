/* eslint-disable import/prefer-default-export */
export class Popover {
  constructor(parentEl, headerMessage, bodyMessage) {
    this.parentEl = parentEl;
    this.headerMessage = headerMessage;
    this.bodyMessage = bodyMessage;
    this.tooltipElement = null;

    this.onClick = this.onClick.bind(this);
  }

  static get markup() {
    return `
        <button class="btn">Click to Validate</button>
      `;
  }

  showTooltip(element) {
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.classList.add('tooltlip');
    this.tooltipElement.innerHTML += `
        <div class="tooltlip__header">${this.headerMessage}</div>
        <div class="tooltlip__body">${this.bodyMessage}</div>
      `;
    document.body.appendChild(this.tooltipElement);

    const { right, top } = element.getBoundingClientRect();
    this.tooltipElement.style.right = `${right - element.offsetWidth / 2 - this.tooltipElement.offsetWidth / 2}px`;
    this.tooltipElement.style.top = `${top - element.offsetHeight / 2 - this.tooltipElement.offsetHeight}px`;

    setTimeout(() => {
      this.tooltipElement.classList.add('show');
    }, 10);
  }

  removeTooltip() {
    if (this.tooltipElement) {
      this.tooltipElement.classList.remove('show');
      setTimeout(() => {
        this.tooltipElement.remove();
        this.tooltipElement = null;
      }, 500);
    }
  }

  bindToDOM() {
    this.parentEl.innerHTML = Popover.markup;

    this.element = this.parentEl.querySelector('.btn');
    this.element.classList.add('inactive');
    this.element.addEventListener('click', this.onClick);
  }

  onClick(e) {
    e.preventDefault();

    if (this.tooltipElement) {
      this.removeTooltip();
      this.element.classList.remove('active');
      this.element.classList.add('inactive');
    } else {
      this.showTooltip(this.element);
      this.element.classList.remove('inactive');
      this.element.classList.add('active');
    }
  }
}
