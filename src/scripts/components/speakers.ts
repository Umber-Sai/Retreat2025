import { Common } from "./common";
import { speakers } from "../content/speakers";
import { SpeakersType } from "../types/speakers.type";



export class Speakers extends Common {

    language : 'Ru' | 'En';
    speakersMotherElement : HTMLElement | null = document.getElementById('speakersCards');

    constructor(langauge : 'Ru' | 'En') {
        super();
        this.language = langauge;
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
}