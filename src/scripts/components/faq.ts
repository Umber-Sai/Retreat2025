import { Common } from "./common";
import faq from '../content/faq.json';
import { FaqType } from "../types/faq.type";


export class Faq extends Common {

    language : 'Ru' | 'En';
    url = './templates/accordion.html';
    motherElement : HTMLElement | null = document.getElementById('faq_accordion');

    constructor (langauge : 'Ru' | 'En') {
        super();
        this.language = langauge;
        this.faqFiller();
    }

    async faqFiller(): Promise<void> {
        const template : string = await this.getTemplate('./templates/accordion.html');
        faq.faq.forEach((element: FaqType) => {
            const section: HTMLElement = document.createElement('div');
            section.innerHTML = template;

            section.querySelector('input')?.setAttribute('id', 'section' + element.id);
            section.querySelector('label')?.setAttribute('for', 'section' + element.id);

            const head: HTMLElement | null = section.querySelector('.accordion_section label span');
            if (head) {
                head.innerText = element[this.language].head;
            }
            const body: HTMLElement | null = section.querySelector('.section_body');
            if (body) {
                body.innerHTML = element[this.language].body;
            }
            this.motherElement?.appendChild(section) 
        });
    }
}