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

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst faq_1 = __webpack_require__(/*! ./content/faq */ \"./src/scripts/content/faq.ts\");\nconst speakers_1 = __webpack_require__(/*! ./content/speakers */ \"./src/scripts/content/speakers.ts\");\nclass App {\n    constructor() {\n        var _a;\n        this.language = 'Ru';\n        this.burgerChekbox = document.getElementById('burger');\n        this.speakersMotherElement = document.getElementById('speakersCards');\n        this.faqMotherElement = document.getElementById('faq_accordion');\n        (_a = document.getElementById('menu')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {\n            if (this.burgerChekbox) {\n                this.burgerChekbox.checked = false;\n            }\n            else {\n                console.error('burgerChekbox not found');\n            }\n        });\n        this.init();\n    }\n    init() {\n        this.faqFiller();\n        this.speakersFiller();\n    }\n    speakersFiller() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const template = yield this.getTemplate('./templates/speaker-card.html');\n            speakers_1.speakers.forEach((item) => {\n                var _a, _b;\n                const temp = document.createElement('div');\n                temp.innerHTML = template;\n                (_a = temp.querySelector('.card_img img')) === null || _a === void 0 ? void 0 : _a.setAttribute('src', './static/img/speakers/' + item.image);\n                const name = temp.querySelector('.card_name');\n                if (name)\n                    name.innerText = item[this.language].name;\n                const text = temp.querySelector('.card_text');\n                if (text)\n                    text.innerText = item[this.language].text;\n                (_b = this.speakersMotherElement) === null || _b === void 0 ? void 0 : _b.appendChild(temp.firstElementChild);\n            });\n        });\n    }\n    faqFiller() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const template = yield this.getTemplate('./templates/accordion.html');\n            faq_1.faq.forEach((element) => {\n                var _a, _b, _c;\n                const section = document.createElement('div');\n                section.innerHTML = template;\n                (_a = section.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('id', 'section' + element.id);\n                (_b = section.querySelector('label')) === null || _b === void 0 ? void 0 : _b.setAttribute('for', 'section' + element.id);\n                const head = section.querySelector('.accordion_section label span');\n                if (head) {\n                    head.innerText = element[this.language].head;\n                }\n                const body = section.querySelector('.section_body');\n                if (body) {\n                    body.innerText = element[this.language].body;\n                }\n                (_c = this.faqMotherElement) === null || _c === void 0 ? void 0 : _c.appendChild(section);\n            });\n        });\n    }\n    getTemplate(url) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield fetch(url)\n                .then(res => res.text())\n                .then(html => {\n                return html;\n            })\n                .catch(error => { console.error('fetch went wrong: ' + error); return '<div>not found</div>'; });\n        });\n    }\n}\nwindow.onload = () => {\n    new App();\n};\n\n\n//# sourceURL=webpack://retreat-site-2025/./src/scripts/app.ts?");

/***/ }),

/***/ "./src/scripts/content/faq.ts":
/*!************************************!*\
  !*** ./src/scripts/content/faq.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.faq = void 0;\nexports.faq = [\n    {\n        id: 1,\n        Ru: {\n            head: 'Где будет проходить ретрит?',\n            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus voluptatem magnam mollitia, vero assumenda autem non esse pariatur ratione quod dolorum quidem eaque fugit adipisci illo nihil reiciendis similique!'\n        },\n        En: {\n            head: '',\n            body: ''\n        }\n    },\n    {\n        id: 2,\n        Ru: {\n            head: 'Как добраться на ретрит?',\n            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus voluptatem magnam mollitia, vero assumenda autem non esse pariatur ratione quod dolorum quidem eaque fugit adipisci illo nihil reiciendis similique!'\n        },\n        En: {\n            head: '',\n            body: ''\n        }\n    },\n    {\n        id: 3,\n        Ru: {\n            head: 'Есть ли место для парковки?',\n            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus voluptatem magnam mollitia, vero assumenda autem non esse pariatur ratione quod dolorum quidem eaque fugit adipisci illo nihil reiciendis similique!'\n        },\n        En: {\n            head: '',\n            body: ''\n        }\n    },\n    {\n        id: 4,\n        Ru: {\n            head: 'Где можно остановиться, если я живу далеко от места ретрита?',\n            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus voluptatem magnam mollitia, vero assumenda autem non esse pariatur ratione quod dolorum quidem eaque fugit adipisci illo nihil reiciendis similique!'\n        },\n        En: {\n            head: '',\n            body: ''\n        }\n    },\n    {\n        id: 5,\n        Ru: {\n            head: 'Где я могу покушатьво время ретрита?',\n            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus voluptatem magnam mollitia, vero assumenda autem non esse pariatur ratione quod dolorum quidem eaque fugit adipisci illo nihil reiciendis similique!'\n        },\n        En: {\n            head: '',\n            body: ''\n        }\n    },\n    {\n        id: 6,\n        Ru: {\n            head: 'Можно ли взять с собой ребенка?',\n            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus voluptatem magnam mollitia, vero assumenda autem non esse pariatur ratione quod dolorum quidem eaque fugit adipisci illo nihil reiciendis similique!'\n        },\n        En: {\n            head: '',\n            body: ''\n        }\n    }\n];\n\n\n//# sourceURL=webpack://retreat-site-2025/./src/scripts/content/faq.ts?");

/***/ }),

/***/ "./src/scripts/content/speakers.ts":
/*!*****************************************!*\
  !*** ./src/scripts/content/speakers.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.speakers = void 0;\nexports.speakers = [\n    {\n        id: 1,\n        image: 'IMG_0668 копия.png',\n        Ru: {\n            name: 'Борис Грисенко',\n            text: 'Раввин Киевской Еврейской Мессианской Общины, почётный доктор теологии CLST.'\n        },\n        En: {\n            name: '',\n            text: ''\n        }\n    },\n    {\n        id: 2,\n        image: 'IMGL6159.png',\n        Ru: {\n            name: 'Родион Самойлович',\n            text: 'Раввин Еврейской Мессианской Общины города Кёльн, Германия.'\n        },\n        En: {\n            name: '',\n            text: ''\n        }\n    }\n];\n\n\n//# sourceURL=webpack://retreat-site-2025/./src/scripts/content/speakers.ts?");

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