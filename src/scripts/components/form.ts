

import intlTelInput from "intl-tel-input";
import { DataType } from "../types/data.type";
import { Common } from "./common";
import { FormElementsDataType } from "../types/formElements.type";
import form from "../content/form.json"

declare global {
    interface Window {
        intlTelInput: any;
    }
}

export class Form extends Common {

    isValid: boolean = true;

    serviceAccordion = new ToggleAccordion('service');
    childrenAccordion = new ToggleAccordion('children');

    iti = intlTelInput(document.querySelector("#phone")!, {
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
            fetch("https://ipwho.is/")
                .then((res) => res.json())
                .then((data) => success(data.country_code))
                .catch(() => console.error("can't get country"));
        },
        useFullscreenPopup: false,
        separateDialCode: true,
        countryOrder: ["il", "ru", "ua"],
        fixDropdownWidth: true,
    });




    form = document.getElementById('registrationForm') as HTMLFormElement;
    popup: HTMLElement | null = document.getElementById('formPopup')
    formInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form_input');
    daysButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input.participate_date');
    daysTitle = document.getElementById('days_title');
    
    
    submitFormButton: HTMLElement | null = document.getElementById('submitFormButton');
    titleElement : HTMLElement = document.querySelector('.registration_title') as HTMLElement;
    serviceOpenAnswer : HTMLInputElement = document.getElementById('serveOpenAnswer') as HTMLInputElement;
    elements: { element: HTMLElement; data: any; }[] =
     [
        {
            element : document.querySelector('.form_input.firstName') as HTMLElement,
            data : form.firstName
        },
        {
            element : document.querySelector('.form_input.lastName') as HTMLElement,
            data : form.lastName
        },
        {
            element : document.querySelector('.form_input.location') as HTMLElement,
            data : form.location
        },
        {
            element : document.querySelector('.form_input.church') as HTMLElement,
            data : form.church
        },
        {
            element : document.querySelector('.form_input#phoneFormInput') as HTMLElement,
            data : form.phone
        },

        {
            element : document.querySelector('.form_input.days') as HTMLElement,
            data : form.days
        },
        {
            element : document.querySelector('.form_input.service') as HTMLElement,
            data : form.service
        },
        {
            element : document.querySelector('.form_input.children') as HTMLElement,
            data : form.children
        }
    ];



    registrationPopupSending = document.getElementById('registration_form_popup_sending');
    registrationPopupReady = document.getElementById('registration_form_popup_ready');

    constructor() {
        super()

        document.getElementById('close_popup')!.onclick = () => {
            this.registrationPopupReady?.classList.remove('open');
        }

        this.daysButtons.forEach(item => {  
            item.onclick = () => {
                this.daysTitle?.classList.remove('invalid')
            }
        })


        this.formInputs.forEach(item => {
            const input = item.querySelector('input.form_input__input') as HTMLInputElement | null;
            if (input) {
                input.onfocus = () => {
                    item.classList.remove('no_value');
                    item.classList.remove('invalid');
                }
            }

        });


        this.submitFormButton?.addEventListener('click', this.validation.bind(this))

    }

    changeLanguage(lang: "Ru" | "En"): void {
        this.titleElement.innerText = form.title[lang];
        this.submitFormButton!.innerText = form.button[lang];
        this.serviceOpenAnswer.placeholder = form.placeholder[lang];

        this.elements.forEach(item => {
            Object.keys(item.data).forEach(key => {
                const el = item.element.querySelector('.' + key);
                if (el) el.innerHTML = item.data[key][lang]
            })
        })
    }

    validation() {
        this.isValid = true
        this.formInputs.forEach(item => {
            const input = item.querySelector('input.form_input__input') as HTMLInputElement | null;
            if (input && !input.value) {
                item.classList.add('no_value');
                this.isValid = false
            }
        });
        if (!this.iti.isValidNumber()) {
            document.getElementById('phoneFormInput')?.classList.add('invalid')
            this.isValid = false
        }
        if (!document.querySelector('input.participate_date:checked')) {
            this.daysTitle?.classList.add('invalid')
            this.isValid = false;
        }



        if (this.isValid) {
            console.log('passed')
            this.collectData()
        } else {
            console.log('not passed')
            this.form.scrollIntoView({behavior : 'smooth'});
        }
    }

    collectData() {
        const data : DataType = {
            firstName: (document.querySelector('input#firstName') as HTMLInputElement)!.value,
            lastName: (document.querySelector('input#lastName') as HTMLInputElement)!.value,
            location: (document.querySelector('input#location') as HTMLInputElement)!.value,
            church: (document.querySelector('input#church') as HTMLInputElement)!.value,
            phone: this.iti.getNumber(),
            participateDays: [
                (document.querySelector('input.participate_date#day22') as HTMLInputElement)!.checked,
                (document.querySelector('input.participate_date#day23') as HTMLInputElement)!.checked,
                (document.querySelector('input.participate_date#day24') as HTMLInputElement)!.checked,
            ],
            volonteer: '',
            children : false
        }

        if (this.serviceAccordion.isOpen) {
            const radioBtn = document.querySelector('input[name="serving"]:checked') as HTMLInputElement;
            const textValue = (document.querySelector('input#serveOpenAnswer') as HTMLInputElement).value;
            if(radioBtn) data.volonteer = radioBtn.value;
            if(textValue) data.volonteer += ' | ' + textValue;
        }

        if(this.childrenAccordion.isOpen) {
            data.children = [
                (document.querySelector('input#less5') as HTMLInputElement)!.checked,
                (document.querySelector('input#from5to7') as HTMLInputElement)!.checked ? (document.getElementById('from5to7childrenCount') as HTMLInputElement).value : '',
                (document.querySelector('input#from8to12') as HTMLInputElement)!.checked ? (document.getElementById('from8to12childrenCount') as HTMLInputElement).value : '',
            ]
        }

        this.sending(data)
    }

    sending(data : any) {
        
        const scriptURL = 'https://script.google.com/macros/s/AKfycbw72NRTAAgcoZAZxe9uOn41q2g_bJs9pgZTXv0mnlVxKoyQH2V2bgqu8ty8dQTWLMSw9A/exec'
        let body = `?firstName=${data.firstName}&lastName=${data.lastName}&location=${data.location}&church=${data.church}&phone=${data.phone}&22may=${data.participateDays[0]}&23may=${data.participateDays[1]}&24may=${data.participateDays[2]}&service=${data.volonteer}`
        if(data.children) {
            body = body + `&less5=${data.children[0]}&from5to7=${data.children[1]}&from8to12=${data.children[2]}`
        }

        this.registrationPopupSending?.classList.add('open');
        this.form.scrollIntoView({behavior: "smooth", block : "center"})
        fetch(scriptURL + body , {method: 'POST'})
            .then(a => {
            this.registrationPopupReady?.classList.add('open');
            setTimeout(() => {
                window.open('https://t.me/+Nub4GDtYtlI4YmJi');
                
                this.form!.reset();
                this.registrationPopupSending?.classList.remove('open');

            }, 2000)
            // setTimeout(() => {
            //     this.registrationPopupReady?.classList.remove('open')
            // }, 3000)
            
            }).catch(() => {
                this.registrationPopupSending?.classList.remove('open');
                alert('Что-то пошло не так, повторите попытку позже :(')
        })
    }

    fillElement(element: HTMLElement, data: unknown, language: "Ru" | "En"): void {
        
    }

 
}



class ToggleAccordion {

    isOpen : boolean = false;

    private motherElement : HTMLElement;
    private openBtn : HTMLInputElement;
    private closeBtn : HTMLInputElement;

    constructor (classsAccordion : string) {
        this.motherElement = document.querySelector('.form_accordion.' + classsAccordion) as HTMLElement;
        this.openBtn = this.motherElement.querySelector('input.open') as HTMLInputElement;
        this.closeBtn = this.motherElement.querySelector('input.close') as HTMLInputElement;

        if(this.openBtn.checked) this.accordionEngine(true);

        this.openBtn.addEventListener('click', () => this.accordionEngine(true))
        this.closeBtn.addEventListener('click', () => this.accordionEngine(false))
    }

    accordionEngine (status : boolean) : void {
        if(status) {
            this.motherElement.classList.add('open');
            this.isOpen = true;
        } else {
            this.motherElement.classList.remove('open');
            this.isOpen = false;
        }
    }

}