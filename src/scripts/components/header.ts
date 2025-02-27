
import { Common } from "./common";



export class Header extends Common {
    header: HTMLElement | null = document.querySelector('.header');
    burgerChekbox: HTMLInputElement | null = document.getElementById('burger') as HTMLInputElement;
    menuElement : HTMLElement | null =  document.getElementById('menu');

    elements: { element: HTMLElement; data: {"Ru" : string, "En" : string}; }[] = [
        {
            element : document.querySelector('#menu .to_speakers') as HTMLElement,
            data : {"En" : "speakers", "Ru" : "Спикеры"}
        },
        {
            element : document.querySelector('#menu .to_about') as HTMLElement,
            data : {"En" : "about", "Ru" : "о ретрите"}
        },
        {
            element : document.querySelector('#menu .to_conditions') as HTMLElement,
            data : {"En" : "Conditions", "Ru" : "Условия участия"}
        },
        {
            element : document.querySelector('#menu .to_faq') as HTMLElement,
            data : {"En" : "F.A.Q.", "Ru" : "Частые вопросы"}
        },

        {
            element : document.querySelector('.footer .footer_date') as HTMLElement,
            data : {
                "En" : "May 22-24, 2025",
                "Ru" : "22-24 мая 2025"
            }
        },
        {
            element : document.querySelector('.footer .block_title') as HTMLElement,
            data : {
                "En" : "Contacts: ",
                "Ru" : "Контакты"
            }
        },
    ];

    constructor() {
        super()
        if(!this.header) {
            console.error('header not found');
            return
        }

        if(this.menuElement) {
            this.menuElement.addEventListener('click', this.closeMenu.bind(this));
            this.menuElement.parentElement!.addEventListener('click', this.closeMenu.bind(this));
        }
       
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = 800; // Граница анимации

            let progress = Math.min(scrollY / maxScroll, 1).toFixed(3);

            // Изменяем только прозрачность фона
            this.header!.style.backgroundColor = `rgba(18, 18, 18, ${progress})`;
            this.header!.style.boxShadow = `0 0px 15px -10px rgba(255, 255, 255, ${progress})`;
        };

        window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));

        this.changeLanguage("Ru")
    }

    closeMenu () {
        if (this.burgerChekbox) {
            this.burgerChekbox.checked = false;
        } else {
            console.error('burgerChekbox not found')
        }
    }

    fillElement(element: HTMLElement, data: {"Ru" : string, "En" : string}, language: "Ru" | "En"): void {
        element.innerText = data[language]
    }

    changeLanguage(lang: "Ru" | "En"): void {
        this.elements.forEach(item => {
            this.fillElement(item.element, item.data, lang)
        })
    }
}