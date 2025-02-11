/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/app.ts":
/*!****************************!*\
  !*** ./src/scripts/app.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst form_1 = __webpack_require__(/*! ./components/form */ \"./src/scripts/components/form.ts\");\nconst speakers_1 = __webpack_require__(/*! ./content/speakers */ \"./src/scripts/content/speakers.ts\");\nconst faq_json_1 = __importDefault(__webpack_require__(/*! ./content/faq.json */ \"./src/scripts/content/faq.json\"));\nconst header_1 = __webpack_require__(/*! ./components/header */ \"./src/scripts/components/header.ts\");\nclass App {\n    constructor() {\n        this.language = 'Ru';\n        this.speakersMotherElement = document.getElementById('speakersCards');\n        this.faqMotherElement = document.getElementById('faq_accordion');\n        new header_1.Header();\n        new form_1.Form();\n        this.init();\n    }\n    init() {\n        this.faqFiller();\n        this.speakersFiller();\n    }\n    speakersFiller() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const template = yield this.getTemplate('./templates/speaker-card.html');\n            speakers_1.speakers.forEach((item) => {\n                var _a, _b;\n                const temp = document.createElement('div');\n                temp.innerHTML = template;\n                (_a = temp.querySelector('.card_img img')) === null || _a === void 0 ? void 0 : _a.setAttribute('src', './static/img/speakers/' + item.image);\n                const name = temp.querySelector('.card_name');\n                if (name)\n                    name.innerText = item[this.language].name;\n                const text = temp.querySelector('.card_text');\n                if (text)\n                    text.innerText = item[this.language].text;\n                (_b = this.speakersMotherElement) === null || _b === void 0 ? void 0 : _b.appendChild(temp.firstElementChild);\n            });\n        });\n    }\n    faqFiller() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const template = yield this.getTemplate('./templates/accordion.html');\n            faq_json_1.default.faq.forEach((element) => {\n                var _a, _b, _c;\n                const section = document.createElement('div');\n                section.innerHTML = template;\n                (_a = section.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('id', 'section' + element.id);\n                (_b = section.querySelector('label')) === null || _b === void 0 ? void 0 : _b.setAttribute('for', 'section' + element.id);\n                const head = section.querySelector('.accordion_section label span');\n                if (head) {\n                    head.innerText = element[this.language].head;\n                }\n                const body = section.querySelector('.section_body');\n                if (body) {\n                    body.innerHTML = element[this.language].body;\n                }\n                (_c = this.faqMotherElement) === null || _c === void 0 ? void 0 : _c.appendChild(section);\n            });\n        });\n    }\n    getTemplate(url) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield fetch(url)\n                .then(res => res.text())\n                .then(html => {\n                return html;\n            })\n                .catch(error => { console.error('fetch went wrong: ' + error); return '<div>not found</div>'; });\n        });\n    }\n}\nwindow.onload = () => {\n    new App();\n};\n\n\n//# sourceURL=webpack://retreat-site-2025/./src/scripts/app.ts?");

/***/ }),

/***/ "./src/scripts/components/form.ts":
/*!****************************************!*\
  !*** ./src/scripts/components/form.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Form = void 0;\nconst cities_json_1 = __importDefault(__webpack_require__(/*! ../content/cities.json */ \"./src/scripts/content/cities.json\"));\nclass Form {\n    constructor() {\n        var _a;\n        this.isValid = true;\n        this.popup = document.getElementById('formPopup');\n        this.formInputs = document.querySelectorAll('.form_input input');\n        this.submitFormButton = document.getElementById('submitFormButton');\n        if (this.popup) {\n            this.popup.onclick = (e) => {\n                e.target.classList.add('hide');\n            };\n        }\n        else\n            console.error('popup not found');\n        this.formInputs.forEach(item => {\n            item.onfocus = (e) => {\n                var _a, _b;\n                (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove('no_value');\n                (_b = e.target.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('invalid');\n            };\n        });\n        this.cityEngine();\n        this.phoneEngine();\n        (_a = this.submitFormButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.validation.bind(this));\n    }\n    cityEngine() {\n        const cityInput = document.getElementById('city');\n        const autocompliterElement = document.getElementById('autocompliter');\n        let filteredCities = cities_json_1.default.cities;\n        fillAuthocompliter(cities_json_1.default.cities);\n        if (cityInput) {\n            cityInput.onkeyup = () => {\n                filteredCities = cities_json_1.default.cities.filter(item => item.toLowerCase().match(cityInput.value.toLowerCase()));\n                fillAuthocompliter(filteredCities);\n            };\n            cityInput.onblur = (e) => {\n                const value = e.target.value;\n                if (!value)\n                    return;\n                const firstVal = filteredCities.filter(item => item.toLowerCase().match(value.toLowerCase()))[0];\n                if (firstVal) {\n                    cityInput.value = firstVal;\n                }\n                else {\n                    console.log(filteredCities[0]);\n                    console.log(cityInput.parentElement);\n                    cityInput.parentElement.classList.add('invalid');\n                }\n            };\n        }\n        else {\n            console.error('no city input');\n        }\n        function fillAuthocompliter(cities) {\n            autocompliterElement.innerHTML = '';\n            cities.forEach(city => {\n                const cityElement = document.createElement('div');\n                cityElement.innerText = city;\n                cityElement.onclick = () => {\n                    if (cityInput)\n                        cityInput.value = city;\n                };\n                autocompliterElement === null || autocompliterElement === void 0 ? void 0 : autocompliterElement.appendChild(cityElement);\n            });\n        }\n    }\n    phoneEngine() {\n        const phoneInput = document.getElementById('phone');\n        if (phoneInput) {\n            phoneInput.oninput = (e) => {\n                const key = e.data;\n                if (key === null || key === void 0 ? void 0 : key.match(/\\D/g)) {\n                    const value = e.target.value;\n                    e.target.value = value.replace(key, '');\n                }\n            };\n            phoneInput.onblur = (e) => {\n                var _a;\n                const value = e.target.value;\n                if (value && !value.match(/5\\d{8}/)) {\n                    (_a = phoneInput.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('invalid');\n                }\n            };\n        }\n    }\n    validation() {\n        this.isValid = true;\n        this.formInputs.forEach(item => {\n            var _a;\n            if (!item.value) {\n                (_a = item.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('no_value');\n                this.isValid = false;\n            }\n            else if (item.classList.contains('invalid') || item.classList.contains('no_value')) {\n                this.isValid = false;\n            }\n        });\n        if (this.isValid) {\n            console.log('passed');\n            alert('passed');\n        }\n        else {\n            console.log('not passed');\n        }\n    }\n}\nexports.Form = Form;\n\n\n//# sourceURL=webpack://retreat-site-2025/./src/scripts/components/form.ts?");

/***/ }),

/***/ "./src/scripts/components/header.ts":
/*!******************************************!*\
  !*** ./src/scripts/components/header.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Header = void 0;\nclass Header {\n    constructor() {\n        this.header = document.querySelector('.header');\n        this.burgerChekbox = document.getElementById('burger');\n        this.menuElement = document.getElementById('menu');\n        if (!this.header) {\n            console.error('header not found');\n            return;\n        }\n        if (this.menuElement) {\n            this.menuElement.addEventListener('click', this.closeMenu.bind(this));\n            this.menuElement.parentElement.addEventListener('click', this.closeMenu.bind(this));\n        }\n        const handleScroll = () => {\n            const scrollY = window.scrollY;\n            const maxScroll = 800; // Граница анимации\n            let progress = Math.min(scrollY / maxScroll, 1).toFixed(3);\n            console.log(`rgba(0, 0, 0, ${progress})`);\n            // Изменяем только прозрачность фона\n            this.header.style.backgroundColor = `rgba(18, 18, 18, ${progress})`;\n            this.header.style.boxShadow = `0 0px 15px -10px rgba(255, 255, 255, ${progress})`;\n        };\n        window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));\n    }\n    closeMenu() {\n        if (this.burgerChekbox) {\n            this.burgerChekbox.checked = false;\n        }\n        else {\n            console.error('burgerChekbox not found');\n        }\n    }\n}\nexports.Header = Header;\n\n\n//# sourceURL=webpack://retreat-site-2025/./src/scripts/components/header.ts?");

/***/ }),

/***/ "./src/scripts/content/speakers.ts":
/*!*****************************************!*\
  !*** ./src/scripts/content/speakers.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.speakers = void 0;\nexports.speakers = [\n    {\n        id: 1,\n        image: 'boris_grisenko.png',\n        Ru: {\n            name: 'Борис Грисенко',\n            text: 'Раввин Киевской Еврейской Мессианской Общины, почётный доктор теологии CLST.'\n        },\n        En: {\n            name: '',\n            text: ''\n        }\n    },\n    {\n        id: 2,\n        image: 'rodion_samoylovich.png',\n        Ru: {\n            name: 'Родион Самойлович',\n            text: 'Раввин Еврейской Мессианской Общины города Кёльн, Германия.'\n        },\n        En: {\n            name: '',\n            text: ''\n        }\n    },\n];\n\n\n//# sourceURL=webpack://retreat-site-2025/./src/scripts/content/speakers.ts?");

/***/ }),

/***/ "./src/scripts/content/cities.json":
/*!*****************************************!*\
  !*** ./src/scripts/content/cities.json ***!
  \*****************************************/
/***/ ((module) => {

eval("module.exports = /*#__PURE__*/JSON.parse('{\"cities\":[\"Акко\",\"Арад\",\"Ариэль\",\"Афула\",\"Ашдод\",\"Ашкелон\",\"Бака-эль-Гарбия\",\"Бат-Ям\",\"Бейтар-Илит\",\"Бейт-Шеан\",\"Бейт-Шемеш\",\"Беэр-Шева\",\"Бней-Брак\",\"Герцлия\",\"Гиватаим\",\"Гиват-Шмуэль\",\"Димона\",\"Иерусалим\",\"Йехуд-Моноссон\",\"Йокнеам\",\"Калансуа\",\"Кармиэль\",\"Кафр-Касем\",\"Кирьят-Ата\",\"Кирьят-Бялик\",\"Кирьят-Гат\",\"Кирьят-Малахи\",\"Кирьят-Моцкин\",\"Кирьят-Оно\",\"Кирьят-Шмона\",\"Кирьят-Ям\",\"Кфар-Сава\",\"Лод\",\"Маале-Адумим\",\"Маалот-Таршиха\",\"Мигдаль-ха-Эмек\",\"Модиин-Илит\",\"Модиин-Маккабим-Реут\",\"Нагария\",\"Назарет\",\"Нес-Циона\",\"Нетания\",\"Нетивот\",\"Нешер\",\"Ноф-ха-Галиль\",\"Ор-Акива\",\"Ор-Йехуда\",\"Офаким\",\"Петах-Тиква\",\"Раанана\",\"Рамат-Ган\",\"Рамат-ха-Шарон\",\"Рамла\",\"Рахат\",\"Реховот\",\"Ришон-ле-Цион\",\"Рош-ха-Аин\",\"Сахнин\",\"Сдерот\",\"Тайбе\",\"Тамра\",\"Тверия\",\"Тель-Авив\",\"Тира\",\"Тират-Кармель\",\"Умм-эль-Фахм\",\"Хадера\",\"Хайфа\",\"Ход-ха-Шарон\",\"Холон\",\"Цфат\",\"Шефарам\",\"Эйлат\",\"Эльад\",\"Явне\"]}');\n\n//# sourceURL=webpack://retreat-site-2025/./src/scripts/content/cities.json?");

/***/ }),

/***/ "./src/scripts/content/faq.json":
/*!**************************************!*\
  !*** ./src/scripts/content/faq.json ***!
  \**************************************/
/***/ ((module) => {

eval("module.exports = /*#__PURE__*/JSON.parse('{\"faq\":[{\"id\":1,\"Ru\":{\"head\":\"Где будет проходить ретрит?\",\"body\":\"<a href=\\'https://maps.app.goo.gl/PxSjBtB6xsurEfPH6\\'> Haifa, Haitstadyon Street 25</a>\"},\"En\":{\"head\":\"\",\"body\":\"\"}},{\"id\":2,\"Ru\":{\"head\":\"Как добраться на ретрит?\",\"body\":\"В четверг и пятницу утром общественный транспорт ходит без ограничений — можно воспользоваться приложением Moovit, чтобы проложить маршрут. В пятницу вечером и в субботу транспорт не работает, и добраться можно будет только своим ходом. Если вы являетесь частью какой-то общины, то можно организовать подвозку своими силами.\"},\"En\":{\"head\":\"\",\"body\":\"\"}},{\"id\":3,\"Ru\":{\"head\":\"Есть ли место для парковки?\",\"body\":\"Через дорогу от здания, где будет проходить ретрит, есть много мест для парковки.\"},\"En\":{\"head\":\"\",\"body\":\"\"}},{\"id\":4,\"Ru\":{\"head\":\"Где можно остановиться, если я живу далеко от места ретрита?\",\"body\":\"Если у вас не получается самостоятельно найти место проживания на время ретрита, вы можете обратиться к нам за помощью, заполнив форму. Мы постараемся вам помочь. <a href=\\'https://forms.gle/3ts311ffJ5eexqQ5A\\'>Ссылка на гугл форму</a>\"},\"En\":{\"head\":\"\",\"body\":\"\"}},{\"id\":5,\"Ru\":{\"head\":\"Где я могу покушать во время ретрита?\",\"body\":\"В пешей доступности от места проведения ретрита есть супермаркет “Кешет Таамим”, там можно приобрести готовую еду. Также вы можете взять еду с собой или заказать доставку.\"},\"En\":{\"head\":\"\",\"body\":\"\"}},{\"id\":6,\"Ru\":{\"head\":\"Можно ли взять с собой ребенка?\",\"body\":\"Во время служений ретрита планируется детская программа для детей 5-13 лет. Дети до 5 лет должны быть под присмотром родителей. Для мамочек с детьми младше 5 лет будет отдельная комната с онлайн трансляцией.\"},\"En\":{\"head\":\"\",\"body\":\"\"}}]}');\n\n//# sourceURL=webpack://retreat-site-2025/./src/scripts/content/faq.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/app.ts");
/******/ 	
/******/ })()
;