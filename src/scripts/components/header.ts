

export class Header {
    header: HTMLElement | null = document.querySelector('.header');
    burgerChekbox: HTMLInputElement | null = document.getElementById('burger') as HTMLInputElement;
    menuElement : HTMLElement | null =  document.getElementById('menu');

    constructor() {
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
            console.log(`rgba(0, 0, 0, ${progress})`)

            // Изменяем только прозрачность фона
            this.header!.style.backgroundColor = `rgba(18, 18, 18, ${progress})`;
            this.header!.style.boxShadow = `0 0px 15px -10px rgba(255, 255, 255, ${progress})`;
        };

        window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
    }

    closeMenu () {
        if (this.burgerChekbox) {
            this.burgerChekbox.checked = false;
        } else {
            console.error('burgerChekbox not found')
        }
    }
}