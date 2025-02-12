
import cities from '../content/cities.json';
import intlTelInput from "intl-tel-input";

declare global {
    interface Window {
        intlTelInput: any;
    }
}





export class Form {

    isValid: boolean = true;
    popup: HTMLElement | null = document.getElementById('formPopup')
    formInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form_input input');
    submitFormButton: HTMLElement | null = document.getElementById('submitFormButton');
    phoneInput = document.querySelector("#phone") as HTMLInputElement;
    iti = intlTelInput(this.phoneInput, {
        loadUtils: () => {
            return new Promise((resolve, reject) => {
              try {
                const utils = require('intl-tel-input/build/js/utils.js');
                resolve(utils);
              } catch (error) {
                reject(error);
              }
            });
          },
        initialCountry: "auto",
        geoIpLookup: (success: any, failure: any) => {
            fetch("https://ipapi.co/json")
                .then((res) => res.json())
                .then((data) => success(data.country_code))
                .catch(() => failure());
        },
        useFullscreenPopup: false,
        separateDialCode: true,
        countryOrder: ["il", "ru", "ua"],
        fixDropdownWidth: true,
    });


    constructor() {

        this.formInputs.forEach(item => {
            item.onfocus = (e) => {
                (e.target as HTMLElement).parentElement?.classList.remove('no_value');
                (e.target as HTMLElement).parentElement?.classList.remove('invalid');
            }
        });

        this.cityEngine();
        // this.phoneEngine();

        this.submitFormButton?.addEventListener('click', this.validation.bind(this))

    }

    cityEngine() {
        const cityInput: HTMLInputElement | null = document.getElementById('city') as HTMLInputElement | null;
        const autocompliterElement: HTMLElement | null = document.getElementById('autocompliter');
        let filteredCities: string[] = cities.cities;
        fillAuthocompliter(cities.cities)
        if (cityInput) {
            cityInput.onkeyup = () => {
                filteredCities = cities.cities.filter(item => item.toLowerCase().match(cityInput.value.toLowerCase()));
                fillAuthocompliter(filteredCities)
            }
            cityInput.onblur = (e) => {
                const value = (e.target as HTMLInputElement).value;
                if (!value) return;
                const firstVal = filteredCities.filter(item => item.toLowerCase().match(value.toLowerCase()))[0]
                if (firstVal) {
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

        function fillAuthocompliter(cities: string[]) {
            autocompliterElement!.innerHTML = ''
            cities.forEach(city => {
                const cityElement: HTMLElement = document.createElement('div');
                cityElement.innerText = city;
                cityElement.onclick = () => {
                    if (cityInput) cityInput.value = city
                }
                autocompliterElement?.appendChild(cityElement);
            });
        }
    }

    // phoneEngine() {
    //     const phoneInput: HTMLInputElement | null = document.getElementById('phone') as HTMLInputElement | null;

    //     if (phoneInput) {
    //         phoneInput.oninput = (e) => {
    //             const key = (e as InputEvent).data!;
    //             if (key?.match(/\D/g)) {
    //                 const value = (e.target as HTMLInputElement).value;
    //                 (e.target as HTMLInputElement).value = value.replace(key, '');
    //             }
    //         }
    //         phoneInput.onblur = (e) => {
    //             const value = (e.target as HTMLInputElement).value;
    //             if (value && !value.match(/5\d{8}/)) {
    //                 phoneInput.parentElement?.classList.add('invalid')
    //             }
    //         }
    //     }
    // }


    validation() {
        console.log(this.iti.isValidNumber())
        this.isValid = true
        this.formInputs.forEach(item => {
            if (!item.value) {
                item.parentElement?.classList.add('no_value');
                this.isValid = false
            } else if (item.classList.contains('invalid') || item.classList.contains('no_value')) {
                this.isValid = false
            }

            const phoneValidation : any = {
                1 : "Неверный номер",
                2 : "Слишком короткий",
                3 : "Слишком длинный",
                4 : "Неверный номер",
                5 : "Неверный номер"
            }

            const phoneValid = this.iti.getValidationError();
            if(phoneValid !== 0) {
                this.isValid = false;
                const phoneFormInput = document.getElementById('phoneFormInput') as HTMLElement;
                phoneFormInput?.classList.add('invalid');
                (phoneFormInput!.querySelector('.input_errors') as HTMLElement).innerText = phoneValidation[phoneValid]
            }



        });
        if (this.isValid) {
            console.log('passed')
            alert('passed')
        } else {
            console.log('not passed')
        }
    }
}