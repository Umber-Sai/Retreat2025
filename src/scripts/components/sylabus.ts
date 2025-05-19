import { DefaultTranslationType } from "../types/defaultTranslation.type";
import { SyllabusDaysType } from "../types/syllabus.type";
import { Dynamic } from "./common";

export class Syllabus extends Dynamic {

    langauge : 'Ru' | 'En'
    jsonPath: string = './static/content/syllabus.json';
    elements: { element: HTMLElement; data: SyllabusDaysType; }[] = [];
    title: DefaultTranslationType = {'En' : "err", 'Ru' : 'err'}
    days : SyllabusDaysType[] = [] as SyllabusDaysType[]

    titleElement :  HTMLElement | null = document.getElementById('sylabus_title');
    daysElement : HTMLElement | null = document.getElementById('sylabus_days')


    constructor(langauge : 'Ru' | 'En') {
        super();
        this.langauge = langauge
        this.loadData(this.jsonPath)
            .then(data => {
                this.title = data.title;
                this.days = data.days;
                this.createElenments()
                    .then(() => {this.changeLanguage(this.langauge)})
            })
    }

    async createElenments(): Promise<void> {
        const template = await this.getTemplate('./templates/syllabus-day.html');
        this.days.forEach(day => {
            const element = document.createElement('div');
            element.innerHTML = template;

            this.elements.push({element : element.firstElementChild! as HTMLElement, data : day});

            this.daysElement?.appendChild(element.firstElementChild!);
        })
    }

    fillElement(element: HTMLElement, data: SyllabusDaysType, language: "Ru" | "En"): void {
        const title = element.querySelector('.day_title');
        title!.innerHTML = data.title[language];

        const activities = element.querySelector('.day_list');
        activities!.innerHTML = ''
        data.activities[language].forEach(activity => {
            const activityElement = document.createElement('div');
            activityElement.className = 'day_item';
            activityElement.innerHTML = activity;
            activities?.appendChild(activityElement)
        });
    }

    changeLanguage(lang : 'Ru' | 'En') {
        this.titleElement!.innerText = this.title[lang];
        this.elements.forEach(props => {
            this.fillElement(props.element, props.data, lang)
        })
    }
}