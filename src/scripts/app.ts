import { Form } from "./components/form";
import { speakers } from "./content/speakers";
import { FaqType } from "./types/faq.type";
import { SpeakersType } from "./types/speakers.type";
import faq from './content/faq.json';
import { Header } from "./components/header";


class App {

    language : 'Ru' | 'En' = 'Ru';
    speakersMotherElement : HTMLElement | null = document.getElementById('speakersCards');
    faqMotherElement : HTMLElement | null = document.getElementById('faq_accordion');
    registrationSection = document.getElementById('registration');
    toFormBtn = document.querySelectorAll('.toForm') as NodeListOf<HTMLElement>


    constructor() {
        this.toFormBtn.forEach((btn : HTMLElement) => {
            btn.onclick = () => {
                this.registrationSection?.scrollIntoView({behavior : "smooth"});
            }
        });

        new Header()
        new Form()
        
        this.init()
    }

    init() {
        this.faqFiller();
        this.speakersFiller()
    }


  
    

    async speakersFiller(): Promise<void> {
        const template : string = await this.getTemplate('./templates/speaker-card.html');
        speakers.forEach((item : SpeakersType) => {
            const temp = document.createElement('div');
            temp.innerHTML = template;

            temp.querySelector('.card_img img')?.setAttribute('src', './static/img/speakers/' + item.image)

            const name: HTMLElement | null = temp.querySelector('.card_name');
            if(name) name.innerText = item[this.language].name

            const text: HTMLElement | null = temp.querySelector('.card_text');
            if(text) text.innerText = item[this.language].text

            this.speakersMotherElement?.appendChild(temp.firstElementChild!)

        })
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
            this.faqMotherElement?.appendChild(section) 
        });
    }

    private async getTemplate(url: string): Promise<string> {
        return await fetch(url)
            .then(res => res.text())
            .then(html => {
                return html
            })
            .catch(error => { console.error('fetch went wrong: ' + error); return '<div>not found</div>' });
    }

}

new App();







