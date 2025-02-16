

import intlTelInput from "intl-tel-input";
import { DataType } from "../types/data.type";

declare global {
    interface Window {
        intlTelInput: any;
    }
}

export class Form {

    isValid: boolean = true;
    form = document.getElementById('registrationForm') as HTMLFormElement;
    popup: HTMLElement | null = document.getElementById('formPopup')
    formInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form_input');
    daysButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input.participate_date');
    submitFormButton: HTMLElement | null = document.getElementById('submitFormButton');
    phoneInput = document.querySelector("#phone") as HTMLInputElement;
    daysTitle = document.getElementById('days_title');
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
    isChildrenAccordionOpen = false

    serveToggle = document.querySelectorAll('input[name="serve"]') as NodeListOf<HTMLInputElement>;
    serveAccordion = document.querySelector('.form_accordion.serve');
    isServeAccordionOpen = false;

    registrationPopupSending = document.getElementById('registration_form_popup_sending');
    registrationPopupReady = document.getElementById('registration_form_popup_ready');

    constructor() {

        this.childrenToggle.forEach((btn: HTMLInputElement) => {
            btn.onclick = (e) => {
                const value = (e.target as HTMLInputElement)?.value;
                if (value === 'open') {
                    this.childrenAccordion?.classList.add('open');
                    this.isChildrenAccordionOpen = true;
                } else {
                    this.childrenAccordion?.classList.remove('open');
                    this.isChildrenAccordionOpen = false;
                }
            }
        });

        this.serveToggle.forEach((btn: HTMLInputElement) => {
            btn.onclick = (e) => {
                const value = (e.target as HTMLInputElement)?.value;
                if (value === 'open') {
                    this.serveAccordion?.classList.add('open');
                    this.isServeAccordionOpen = true;
                } else {
                    this.serveAccordion?.classList.remove('open');
                    this.isServeAccordionOpen = false;
                }
            }
        })

        console.log(this.daysButtons)

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
            this.isValid = false;
            this.daysTitle?.classList.add('invalid')
        }



        if (this.isValid) {
            console.log('passed')
            this.collectData()
        } else {
            console.log('not passed')
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

        if (this.isServeAccordionOpen) {
            const radioValue = document.querySelector('input[name="serving"]:checked') as HTMLInputElement;
            const textValue = document.querySelector('input#serveOpenAnswer') as HTMLInputElement;
            if(radioValue) {
                data.volonteer = radioValue.value + ' | ' + textValue.value
            }
        }

        if(this.isChildrenAccordionOpen) {
            data.children = [
                (document.querySelector('input#less5') as HTMLInputElement)!.checked,
                (document.querySelector('input#from5to7') as HTMLInputElement)!.checked ? (document.getElementById('from5to7childrenCount') as HTMLInputElement).value : '',
                (document.querySelector('input#from8to12') as HTMLInputElement)!.checked ? (document.getElementById('from8to12childrenCount') as HTMLInputElement).value : '',
            ]
        }

        console.log(data)
        this.sending(data)
    }

    sending(data : any) {
        
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzOEqfIyOzap6HbSD0O5mXwNLlw-egXEEZidRPa9Etel0rnVGChGaiGQlJDUrCd0A73mA/exec'
        let body = `?firstName=${data.firstName}&lastName=${data.lastName}&location=${data.location}&church=${data.church}&phone=${data.phone}&22may=${data.participateDays[0]}&23may=${data.participateDays[1]}&24may=${data.participateDays[2]}&service=${data.volonteer}`
        if(data.children) {
            body = body + `&less5=${data.children[0]}&from5to7=${data.children[1]}&from8to12=${data.children[2]}`
        }


        console.log('sending')
        console.log(body)
        this.registrationPopupSending?.classList.add('open')
        fetch(scriptURL + body , {method: 'POST'}).then(a => {
            this.registrationPopupReady?.classList.add('open');
            setTimeout(() => {
                this.form!.reset();
                this.registrationPopupSending?.classList.remove('open')
            }, 1000)
            setTimeout(() => {
                this.registrationPopupReady?.classList.remove('open')
            }, 3000)
            
        })
    }
}
