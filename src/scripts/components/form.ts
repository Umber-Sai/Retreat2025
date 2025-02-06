
import cities from '../content/cities.json';

export class Form {
    
    isValid : boolean = true;
    popup: HTMLElement | null = document.getElementById('formPopup')
    formInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form_input input');
    submitFormButton: HTMLElement | null = document.getElementById('submitFormButton');

    constructor() {
        if(this.popup) {
            this.popup.onclick = (e) => {
                (e.target as HTMLElement).classList.add('hide')
            }
        } else console.error('popup not found')
        this.formInputs.forEach(item => {
            item.onfocus = (e) => {
                (e.target as HTMLElement).parentElement?.classList.remove('no_value');
                (e.target as HTMLElement).parentElement?.classList.remove('invalid');
            }
        });

        this.cityEngine();
        this.phoneEngine();

        this.submitFormButton?.addEventListener('click', this.validation.bind(this))

    }

    cityEngine () {
        const cityInput : HTMLInputElement | null = document.getElementById('city') as HTMLInputElement | null;
        const autocompliterElement : HTMLElement | null = document.getElementById('autocompliter');
        let filteredCities : string[] = cities.cities;
        fillAuthocompliter(cities.cities)
        if(cityInput) {
            cityInput.onkeyup = () => {
                filteredCities = cities.cities.filter(item => item.toLowerCase().match(cityInput.value.toLowerCase()));
                fillAuthocompliter(filteredCities)
            }
            cityInput.onblur = (e) => {
                const value = (e.target as HTMLInputElement).value;
                if(!value) return;
                const firstVal = filteredCities.filter(item => item.toLowerCase().match(value.toLowerCase()))[0]
                if(firstVal) {
                    cityInput.value = firstVal;
                } else {
                    console.log(filteredCities[0])
                    console.log(cityInput.parentElement)
                    cityInput.parentElement!.classList.add('invalid');
                }
            }
        } else {
            console.error('no city input')
        }

        function fillAuthocompliter (cities : string[]) {
            autocompliterElement!.innerHTML = ''
            cities.forEach(city => {
                const cityElement : HTMLElement = document.createElement('div');
                cityElement.innerText = city;
                cityElement.onclick = () => {
                    if(cityInput) cityInput.value = city
                }
                autocompliterElement?.appendChild(cityElement);
            });
        }
    }

    phoneEngine () {
        const phoneInput: HTMLInputElement | null = document.getElementById('phone') as HTMLInputElement | null;

        if(phoneInput) {
            phoneInput.oninput = (e) => {
                const key = (e as InputEvent).data!;
                if(key?.match(/\D/g)) {
                    const value = (e.target as HTMLInputElement).value;
                    (e.target as HTMLInputElement).value = value.replace(key, '');
                }
            }
            phoneInput.onblur = (e) => {
                const value = (e.target as HTMLInputElement).value;
                if(value && !value.match(/5\d{8}/)) {
                    phoneInput.parentElement?.classList.add('invalid')
                }
            }
        }
    }


    validation() {
        this.isValid = true
        this.formInputs.forEach(item => {
            if (!item.value) {
                item.parentElement?.classList.add('no_value');
                this.isValid = false
            } else if (item.classList.contains('invalid') || item.classList.contains('no_value')) {
                this.isValid = false
            }
        });
        if(this.isValid) {
            console.log('passed')
            alert('passed')
        } else {
            console.log('not passed')
        }
    }
}