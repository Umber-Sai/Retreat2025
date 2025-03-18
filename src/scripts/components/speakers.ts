import { Dynamic } from "./common";
import { SpeakersType } from "../types/speakers.type";
import { DefaultTranslationType } from "../types/defaultTranslation.type";



export class Speakers extends Dynamic {

    language : 'Ru' | 'En';
    speakersMotherElement : HTMLElement | null = document.getElementById('speakersCards');
    elements : {element : HTMLElement, data : SpeakersType}[] = [];
    titleElement : HTMLElement = document.getElementById('speakers_title') as HTMLElement;
    buttonElement : HTMLElement = document.querySelector('.speakers .speakers_action .btn') as HTMLElement;
    speakers : SpeakersType[] = [];
    title : {"Ru" : string, "En" : string} = {} as {"Ru" : string, "En" : string}
    button : DefaultTranslationType = {} as DefaultTranslationType
    jsonPath: string = './static/content/speakers.json';

    constructor(langauge : 'Ru' | 'En') {
        super();
        this.language = langauge;
        this.loadData(this.jsonPath)
            .then(data => {
                this.speakers = data.speakers;
                this.title = data.title;
                this.button = data.button;
                this.createElenments()
                    .then(() => {this.changeLanguage(this.language)})
            })
    }

    async createElenments(): Promise<void> {
        const template : string = await this.getTemplate('./templates/speaker-card.html');
        this.speakers.forEach((item : SpeakersType) => {
            const element = document.createElement('div');
            element.innerHTML = template;
            element.querySelector('.card_img img')?.setAttribute('src', './static/img/speakers/' + item.image);
            // this.fillElement(element, item, this.language);

            this.elements.push({element : element.firstElementChild! as HTMLElement, data : item});

            this.speakersMotherElement?.appendChild(element.firstElementChild!);
        });
    }

    fillElement(element: HTMLElement, data: SpeakersType, language: "Ru" | "En"): void {
        const name: HTMLElement | null = element.querySelector('.card_name');
        if(name) name.innerText = data[language].name

        const text: HTMLElement | null = element.querySelector('.card_text');
        if(text) text.innerText = data[language].text
    }

    changeLanguage(lang: "Ru" | "En"): void {
        this.titleElement.innerText = this.title[lang];
        this.buttonElement.innerText = this.button[lang];
        this.elements.forEach(props => {
            this.fillElement(props.element, props.data, lang)
        })
    }
}