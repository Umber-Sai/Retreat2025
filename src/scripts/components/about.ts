
import { Common } from "./common";



export class About extends Common {
    elements: { element: HTMLElement; data:  {"Ru" : string, "En" : string}; }[] = [];
    jsonPath: string = 'static/content/about.json';

    constructor () {
        super();
        this.loadData(this.jsonPath)
            .then(data => {
                this.elements = [
                    {
                        element : document.querySelector('.about_title') as HTMLElement,
                        data : data.title
                    },
                    {
                        element : document.querySelector('.about_text') as HTMLElement,
                        data : data.text
                    },
                ]
                this.changeLanguage("Ru");
            })
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