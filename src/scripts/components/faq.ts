import { Dynamic } from "./common";
import faq from '../content/faq.json';
import { FaqType } from "../types/faq.type";


export class Faq extends Dynamic {

    language : 'Ru' | 'En';
    url = './templates/accordion.html';
    motherElement : HTMLElement | null = document.getElementById('faq_accordion');
    titleElement : HTMLElement = document.getElementById('faq_title') as HTMLElement;
    elements : {element : HTMLElement, data : FaqType}[] = [];

    constructor (langauge : 'Ru' | 'En') {
        super();
        this.language = langauge;
        this.titleElement.innerText = faq.title[this.language];
        this.createElenments();
    }

    async createElenments(): Promise<void> {
        const template : string = await this.getTemplate('./templates/accordion.html');
        faq.faq.forEach((data: FaqType) => {
            const element: HTMLElement = document.createElement('div');
            element.innerHTML = template;

            element.querySelector('input')?.setAttribute('id', 'section' + data.id);
            element.querySelector('label')?.setAttribute('for', 'section' + data.id);

            this.fillElement(element, data, this.language);

            this.elements.push({element : element, data : data})
            this.motherElement?.appendChild(element);
        });
    }

    fillElement (element : HTMLElement, data : FaqType, language : 'Ru' | 'En') {
        const head: HTMLElement | null = element.querySelector('.accordion_section label span');
        if (head) {
            head.innerText = data[language].head;
        }
        const body: HTMLElement | null = element.querySelector('.section_body');
        if (body) {
            body.innerHTML = data[language].body;
        }
    }

    changeLanguage(lang : 'Ru' | 'En') : void {
        this.titleElement.innerText = faq.title[lang];
        this.elements.forEach(props => {
            this.fillElement(props.element, props.data, lang)
        })
    }
}