export class Common {
    constructor() {

    }

    protected async getTemplate(url: string): Promise<string> {
        return await fetch(url)
            .then(res => res.text())
            .then(html => {
                return html
            })
            .catch(error => { console.error('fetch went wrong: ' + error); return '<div>not found</div>' });
    }
}