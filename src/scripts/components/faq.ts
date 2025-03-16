import { Dynamic } from "./common";
import { FaqType } from "../types/faq.type";
import { DefaultTranslationType } from "../types/defaultTranslation.type";


export class Faq extends Dynamic {

    language : 'Ru' | 'En';
    url = './templates/accordion.html';
    motherElement : HTMLElement | null = document.getElementById('faq_accordion');
    titleElement : HTMLElement = document.getElementById('faq_title') as HTMLElement;
    elements : {element : HTMLElement, data : FaqType}[] = [];
    jsonPath: string = 'static/content/faq.json';
    faq : FaqType[] = [];
    tTitle : DefaultTranslationType = {} as DefaultTranslationType

    constructor (langauge : 'Ru' | 'En') {
        super();
        this.language = langauge;
        this,this.loadData(this.jsonPath)
            .then(data => {
                this.faq = data.faq;
                this.tTitle = data.title
                this.titleElement.innerText = this.tTitle[this.language];
                this.createElenments();
            })
    }

    async createElenments(): Promise<void> {
        const template : string = await this.getTemplate('./templates/accordion.html');
        this.faq.forEach((data: FaqType) => {
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
        this.titleElement.innerText = this.tTitle[lang];
        this.elements.forEach(props => {
            this.fillElement(props.element, props.data, lang)
        })
    }
}