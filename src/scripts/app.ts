import { Form } from "./components/form";


import { Header } from "./components/header";
import { Scroller } from "./components/scroller";
import { Faq } from "./components/faq";
import { Speakers } from "./components/speakers";


class App {

    language : 'Ru' | 'En' = 'Ru';

    constructor() {
        new Scroller();
        
        new Header()
        new Speakers(this.language)
        new Faq(this.language);
        new Form()        
    }
}


    

   



new App();







