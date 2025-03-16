import { Common } from "./common";
// import { date, title, location, button  } from "../content/main.json"
import { DefaultTranslationType } from "../types/defaultTranslation.type";



export class Main extends Common {

    elements: { element: HTMLElement; data: {"Ru" : string, "En" : string}; }[] = [];

    jsonPath: string = 'static/content/main.json';



    constructor () {
        super();
        this.loadData(this.jsonPath)
            .then(data => {
                this.elements = [
                    {
                        element : document.querySelector('.main_date') as HTMLElement,
                        data : data.date
                    },
                    {
                        element : document.querySelector('.main_title') as HTMLElement,
                        data : data.title
                    },
                    {
                        element : document.querySelector('.main_location') as HTMLElement,
                        data : data.location
                    },
                    {
                        element : document.querySelector('.main_active .btn') as HTMLElement,
                        data : data.button
                    },
                ]
                this.changeLanguage('Ru');
            })
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