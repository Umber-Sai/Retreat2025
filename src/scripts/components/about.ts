
import { Common } from "./common";
import { title, text} from "../content/about.json"



export class About extends Common {
    elements: { element: HTMLElement; data:  {"Ru" : string, "En" : string}; }[] = [
        {
            element : document.querySelector('.about_title') as HTMLElement,
            data : title
        },
        {
            element : document.querySelector('.about_text') as HTMLElement,
            data : text
        },
    ];

    constructor () {
        super();
        this.changeLanguage("Ru")
    }

    fillElement(element: HTMLElement, data: {"Ru" : string, "En" : string}, language: "Ru" | "En"): void {
        element.innerHTML = data[language];
    }   

    changeLanguage(lang: "Ru" | "En"): void {
        this.elements.forEach(item => {
            this.fillElement(item.element, item.data, lang)
        })
    }
}