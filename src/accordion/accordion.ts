interface AccordionOptions {
  selectorAccordion: string;
  selectorAccordionItem: string;
  selectorAccordionBtn: string;
  selectorItemActive: string;
}

export class Accordion {
  private accordion: HTMLElement;
  private items: NodeListOf<HTMLElement>;
  private selectorAccordionBtn: string;
  private selectorItemActive: string;

  constructor({ selectorAccordion, selectorAccordionItem, selectorAccordionBtn, selectorItemActive }: AccordionOptions) {
    this.accordion = document.querySelector(selectorAccordion) as HTMLElement;
    this.items = this.accordion.querySelectorAll(selectorAccordionItem) as NodeListOf<HTMLElement>;
    this.selectorAccordionBtn = selectorAccordionBtn;
    this.selectorItemActive = selectorItemActive;
    this.init();
  }

  private init(): void {
    this.items.forEach(item => {
      const button = item.querySelector(this.selectorAccordionBtn) as HTMLElement;
      button.addEventListener('click', () => {
        this.toggleItem(item);
      });
    });
  }

  private toggleItem(item: HTMLElement): void {
    const isActive = item.classList.contains(this.selectorItemActive);
    item.classList.toggle(this.selectorItemActive, !isActive);
  }

  public closeAllItems(): void {
    this.items.forEach(item => {
      item.classList.remove(this.selectorItemActive);
    });
  }
}
