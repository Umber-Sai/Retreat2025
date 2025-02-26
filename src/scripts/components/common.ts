export abstract class Common {
    abstract elements : {element : HTMLElement, data : unknown}[];
    abstract fillElement (element : HTMLElement, data : unknown, language : 'Ru' | 'En'): void;
    abstract changeLanguage(lang : 'Ru' | 'En') : void;
}

export abstract class Dynamic extends Common{
    protected async getTemplate(url: string): Promise<string> {
        return await fetch(url)
            .then(res => res.text())
            .then(html => {
                return html
            })
            .catch(error => { console.error('fetch went wrong: ' + error); return '<div>not found</div>' });
    }

    abstract createElenments (): void;
}