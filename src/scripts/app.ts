import { Form } from "./components/form";
import { faq } from "./content/faq";
import { speakers } from "./content/speakers";
import { FaqType } from "./types/faq.type";
import { SpeakersType } from "./types/speakers.type";

class App {

    language : 'Ru' | 'En' = 'Ru';
    burgerChekbox: HTMLInputElement | null = document.getElementById('burger') as HTMLInputElement;
    speakersMotherElement : HTMLElement | null = document.getElementById('speakersCards');
    faqMotherElement : HTMLElement | null = document.getElementById('faq_accordion');
   
    constructor() {
        
        document.getElementById('menu')?.addEventListener('click', () => {
            if (this.burgerChekbox) {
                this.burgerChekbox.checked = false;
            } else {
                console.error('burgerChekbox not found')
            }
        });

        this.init()

        new Form()
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
        faq.forEach((element: FaqType) => {
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
                body.innerText = element[this.language].body;
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

window.onload = () => {
    new App()
}






