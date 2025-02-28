import { Form } from "./components/form";


import { Header } from "./components/header";
import { Scroller } from "./components/scroller";
import { Faq } from "./components/faq";
import { Speakers } from "./components/speakers";
import { Main } from "./components/main";
import { About } from "./components/about";
import { Conditions } from "./components/conditions";


class App {

    language : 'Ru' | 'En' = 'Ru';
    langBtn = document.querySelectorAll('input[name=language]') as NodeListOf<HTMLInputElement>;

    classes = [
        new Header(),
        new Main(),
        new About(),
        new Speakers(this.language),
        new Conditions(),
        new Faq(this.language),
        new Form()
    ]

    constructor() {
        new Scroller();
        this.languageBtnListener();   
    }

    languageBtnListener () {
        this.langBtn.forEach((btn : HTMLInputElement) => {
            btn.onclick = () => {
                this.language = btn.value as 'Ru' | 'En';
                this.changeLanguage();
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







