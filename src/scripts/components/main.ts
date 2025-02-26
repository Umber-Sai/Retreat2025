import { Common } from "./common";
import { date, title, location, button  } from "../content/main.json"



export class Main extends Common {

    elements: { element: HTMLElement; data: {"Ru" : string, "En" : string}; }[] = [
        {
            element : document.querySelector('.main_date') as HTMLElement,
            data : date
        },
        {
            element : document.querySelector('.main_title') as HTMLElement,
            data : title
        },
        {
            element : document.querySelector('.main_location') as HTMLElement,
            data : location
        },
        {
            element : document.querySelector('.main_active .btn') as HTMLElement,
            data : button
        },
    ];

    constructor () {
        super();
        this.changeLanguage('Ru')
    }

    fillElement(element: HTMLElement, data: {"Ru" : string, "En" : string}, language: "Ru" | "En"): void {
        element.innerText = data[language];
    }

    changeLanguage(lang: "Ru" | "En"): void {
        this.elements.forEach(item => {
            this.fillElement(item.element, item.data, lang);
        });
    }
}