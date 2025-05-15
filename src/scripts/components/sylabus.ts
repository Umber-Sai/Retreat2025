
export class Syllabus {
    motherElement : HTMLElement | null= document.getElementById('sylabus');
    langauge : 'Ru' | 'En' = 'En'
    constructor(langauge : 'Ru' | 'En') {
        if(!this.motherElement) {
            console.error('syllabus not found');
            return
        }
        this.langauge = langauge;
    }

    changeLanguage(langauge : 'Ru' | 'En') {
        this.langauge = langauge;
        if(this.langauge === 'Ru') {
            this.motherElement!.style.display = 'block'
        } else {
            this.motherElement!.style.display = 'none'
        }
    }
}