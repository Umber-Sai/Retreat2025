export abstract class Common {
    abstract elements : {element : HTMLElement, data : unknown}[];
    abstract jsonPath : string;

    abstract fillElement (element : HTMLElement, data : unknown, language : 'Ru' | 'En'): void;
    abstract changeLanguage(lang : 'Ru' | 'En') : void;

    async loadData (jsonPath : string) : Promise<any> {
        return await fetch(jsonPath).then(resp => resp.json());
    }
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