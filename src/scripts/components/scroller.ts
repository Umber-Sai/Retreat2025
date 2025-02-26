
export class Scroller {

    toFormBtn = document.querySelectorAll('.toForm') as NodeListOf<HTMLElement>
    registrationSection = document.getElementById('registration');

    elements : {[key : string] : HTMLElement | null} = {
        'about' : document.getElementById('about'),
        'speakers' : document.getElementById('speakers'),
        'conditions' : document.getElementById('conditions'),
        'faq' : document.getElementById('faq'),
        'registration' : document.getElementById('registration'),
    }

    constructor() {

        const keys = Object.keys(this.elements);

        keys.forEach((key : string) => {
            const elements = document.querySelectorAll('.to_' + key);
            elements.forEach(element => {     
                element?.addEventListener('click', () => {
                    this.elements[key]?.scrollIntoView({behavior : 'smooth'})
                })
            });
            
        });
    }
}