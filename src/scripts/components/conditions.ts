import { Common } from "./common";
// import {conditions, title, button} from "../content/conditions.json"
import { ConditionsType } from "../types/conditions.type";
import { DefaultTranslationType } from "../types/defaultTranslation.type";



export class Conditions extends Common {

    titleElement : HTMLElement = document.querySelector('.conditions_title') as HTMLElement;
    buttonElement : HTMLElement = document.querySelector('.conditions_active .btn') as HTMLElement;
    jsonPath: string = 'static/content/conditions.json';

    elements: { element: HTMLElement; data: ConditionsType }[] = [];
    tTitle : DefaultTranslationType = {} as DefaultTranslationType
    tButton : DefaultTranslationType = {} as DefaultTranslationType

    constructor () {
        super();
        this.loadData(this.jsonPath)
            .then(data => {
                this.tTitle = data.title;
                this.tButton = data.button;
                this.elements = [
                    {
                        element : document.getElementById('condition_registration') as HTMLElement,
                        data : data.conditions[0]
                    },
                    {
                        element : document.getElementById('condition_free') as HTMLElement,
                        data : data.conditions[1]
                    },
                    {
                        element : document.getElementById('condition_tg') as HTMLElement,
                        data : data.conditions[2]
                    },
                    {
                        element : document.getElementById('condition_look') as HTMLElement,
                        data : data.conditions[3]
                    }
                ]
                this.changeLanguage("Ru")
            })
    }

    fillElement(element: HTMLElement, data: ConditionsType, language: "Ru" | "En"): void {
        const titleEl = element.querySelector('.card_title') as HTMLElement;
        if(titleEl) {
            titleEl.innerText = data[language].title
        }

        const textEl = element.querySelector('.card_text') as HTMLElement;
        if(textEl) {
            textEl.innerText = data[language].text
        }
    }   

    changeLanguage(lang: "Ru" | "En"): void {
        this.titleElement.innerHTML = this.tTitle[lang]
        this.buttonElement.innerHTML = this.tButton[lang]
        this.elements.forEach(item => {
            this.fillElement(item.element, item.data, lang)
        })
    }
}