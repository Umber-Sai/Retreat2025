import { Common } from "./common";
import {conditions, title, button} from "../content/conditions.json"
import { ConditionsType } from "../types/conditions.type";



export class Conditions extends Common {

    titleElement : HTMLElement = document.querySelector('.conditions_title') as HTMLElement;
    buttonElement : HTMLElement = document.querySelector('.conditions_active .btn') as HTMLElement;

    elements: { element: HTMLElement; data: ConditionsType }[] =
    [
        {
            element : document.getElementById('condition_registration') as HTMLElement,
            data : conditions[0]
        },
        {
            element : document.getElementById('condition_free') as HTMLElement,
            data : conditions[1]
        },
        {
            element : document.getElementById('condition_tg') as HTMLElement,
            data : conditions[2]
        },
        {
            element : document.getElementById('condition_look') as HTMLElement,
            data : conditions[3]
        }
    ]

    constructor () {
        super();
        this.changeLanguage("Ru")
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
        this.titleElement.innerHTML = title[lang]
        this.buttonElement.innerHTML = button[lang]
        this.elements.forEach(item => {
            this.fillElement(item.element, item.data, lang)
        })
    }
}