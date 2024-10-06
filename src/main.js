import { Accordion } from './accordion/accordion';
import { ModelWindow } from './modelWindow/modelWindow';
import { Sidebar } from './sidebar/sidebar';

const accordionOne = new Accordion({
  selectorAccordion: '.accordion',
  selectorAccordionItem: '.accordion__item.item',
  selectorAccordionBtn: '.item__btn',
  selectorItemActive: 'active',
});
console.log(11111);

const modelWindowOne = new ModelWindow()
const sidebarOne = new Sidebar()
