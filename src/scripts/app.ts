import { Form } from "./components/form";
import { Header } from "./components/header";
import { Scroller } from "./components/scroller";
import { Faq } from "./components/faq";
import { Speakers } from "./components/speakers";
import { Main } from "./components/main";
import { About } from "./components/about";
import { Conditions } from "./components/conditions";


class App {

    language : 'Ru' | 'En' = window.location.hash.split('/')?.[1] as 'Ru' | 'En';
    langBtn = document.querySelectorAll('input[name=language]') as NodeListOf<HTMLInputElement>;

    classes: any[] = [];

    constructor() {
        if(!this.language || (this.language !== "Ru" && this.language !== "En")) {
            window.location.href = '#/Ru';
            this.language = "Ru"
        } 

        this.classes = [
            new Header(this.language),
            new Main(this.language),
            new About(this.language),
            new Speakers(this.language),
            new Conditions(this.language),
            new Faq(this.language),
            new Form(this.language)
        ];

        document.getElementById(this.language)?.setAttribute('checked', 'checked')

        window.addEventListener('popstate', () => {
            this.changeLanguage();
        });

        new Scroller();
        this.languageBtnListener();
    }

    languageBtnListener () {
        this.langBtn.forEach((btn : HTMLInputElement) => {
            btn.onclick = () => {
                this.language = btn.value as 'Ru' | 'En';
                window.location.href = '#/' + this.language
            }
        });
    }

    changeLanguage() {
        this.classes.forEach(element => {
            element.changeLanguage(this.language)
        });
    }
}


new App();







