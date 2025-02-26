import { Form } from "./components/form";


import { Header } from "./components/header";
import { Scroller } from "./components/scroller";
import { Faq } from "./components/faq";
import { Speakers } from "./components/speakers";


class App {

    language : 'Ru' | 'En' = 'Ru';
    langBtn = document.querySelectorAll('input[name=language]') as NodeListOf<HTMLInputElement>;

    header = new Header();
    speakers = new Speakers(this.language)
    faq = new Faq(this.language);
    form = new Form()  

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
        this.faq.changeLanguage(this.language)
    }
}


    

   



new App();







