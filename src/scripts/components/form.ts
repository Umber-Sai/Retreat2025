

import intlTelInput from "intl-tel-input";

declare global {
    interface Window {
        intlTelInput: any;
    }
}





export class Form {

    isValid: boolean = true;
    popup: HTMLElement | null = document.getElementById('formPopup')
    formInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form_input');
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
        geoIpLookup: (success, failure) => {
            fetch("https://ipapi.co/json")
              .then((res) => res.json())
              .then((data) => success(data.country_code))
              .catch(() => console.error("can't get country"));
        },
        useFullscreenPopup: false,
        separateDialCode: true,
        countryOrder: ["il", "ru", "ua"],
        fixDropdownWidth: true,
    });

    childrenToggle = document.querySelectorAll('input[name="children"]') as NodeListOf<HTMLInputElement>;
    childrenAccordion = document.querySelector('.form_accordion.children');

    serveToggle = document.querySelectorAll('input[name="serve"]') as NodeListOf<HTMLInputElement>;
    serveAccordion = document.querySelector('.form_accordion.serve');


    constructor() {
        this.childrenToggle.forEach((btn : HTMLInputElement) => {
            btn.onclick = (e) => {
                const value = (e.target as HTMLInputElement)?.value;
                if(value === 'open') {
                    this.childrenAccordion?.classList.add('open');
                } else {
                    this.childrenAccordion?.classList.remove('open');
                }
            }
        });

        this.serveToggle.forEach((btn : HTMLInputElement) => {
            btn.onclick = (e) => {
                const value = (e.target as HTMLInputElement)?.value;
                if(value === 'open') {
                    this.serveAccordion?.classList.add('open');
                } else {
                    this.serveAccordion?.classList.remove('open');
                }
            }
        })

        this.formInputs.forEach(item => {
            const input = item.querySelector('input.form_input__input') as HTMLInputElement | null;
            if(input) {
                input.onfocus = () => {
                    item.classList.remove('no_value');
                    item.classList.remove('invalid');
                }
            }
           
        });


        this.submitFormButton?.addEventListener('click', this.validation.bind(this))

    }


    validation() {
        console.log(this.iti.isValidNumber())
        this.isValid = true
        this.formInputs.forEach(item => {
            const input = item.querySelector('input.form_input__input') as HTMLInputElement | null;
            console.log(item)
            if (input && !input.value) {
                item.classList.add('no_value');
                this.isValid = false
            } 
        });
        if(!this.iti.isValidNumber()) {
            document.getElementById('phoneFormInput')?.classList.add('invalid')
            this.isValid = false
        }
        if (this.isValid) {
            console.log('passed')
            alert('passed')
        } else {
            console.log('not passed')
        }
    }
}