/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/CommunicationServer.js":
/*!***************************************!*\
  !*** ./src/js/CommunicationServer.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CommunicationServer; }
/* harmony export */ });
class CommunicationServer {
  constructor(port) {
    this.port = port;
  }
  async getLastNews() {
    const result = await fetch(`${this.port}/news/last`);
    return result;
  }
}

/***/ }),

/***/ "./src/js/ControlNews.js":
/*!*******************************!*\
  !*** ./src/js/ControlNews.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ControlNews; }
/* harmony export */ });
class ControlNews {
  constructor(widget, communicator, inform) {
    this.widget = widget;
    this.communicator = communicator;
    this.inform = inform;
    this.updateNewsList = this.updateNewsList.bind(this);
  }
  activation() {
    this.widget.btnRefresh.addEventListener('click', this.updateNewsList);
    setTimeout(this.updateNewsList, 3000);
  }
  updateNewsList() {
    this.widget.clearNewsList();
    this.widget.preloadBox.classList.remove('hidden');
    this.communicator.getLastNews().then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось подключиться к серверу');
    }).then(data => {
      if (data) {
        this.widget.preloadBox.classList.add('hidden');
        data.forEach(el => this.widget.createNewsEl(el));
      } else {
        throw new Error('Не удалось получить список новостей');
      }
    }).catch(err => {
      console.log(err.message);
      this.inform.showInform('Не удалось загрузить данные. Проверьте подключение и обновите страницу');
    });
  }
}

/***/ }),

/***/ "./src/js/CreationElements.js":
/*!************************************!*\
  !*** ./src/js/CreationElements.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CreationElements; }
/* harmony export */ });
class CreationElements {
  static createElement(tag, classes, attributes) {
    const element = document.createElement(tag);
    if (classes) element.classList.add(...classes);
    if (attributes) {
      for (let i = 0; i < attributes.length; i += 1) {
        element.setAttribute(attributes[i].name, attributes[i].value);
      }
    }
    return element;
  }
}

/***/ }),

/***/ "./src/js/InformMassage.js":
/*!*********************************!*\
  !*** ./src/js/InformMassage.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ InformMessage; }
/* harmony export */ });
class InformMessage {
  constructor(messageBox) {
    this.messageBox = messageBox;
    this.messageTextEl = this.messageBox.querySelector('.inform_text');
  }
  showInform(message) {
    this.messageBox.classList.remove('hidden');
    this.messageTextEl.textContent = message;
  }
  hideInform() {
    this.messageBox.classList.add('hidden');
    this.messageTextEl.textContent = '';
  }
}

/***/ }),

/***/ "./src/js/NewsWidget.js":
/*!******************************!*\
  !*** ./src/js/NewsWidget.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NewsWidjet; }
/* harmony export */ });
/* harmony import */ var _CreationElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreationElements */ "./src/js/CreationElements.js");

class NewsWidjet {
  constructor(container) {
    this.container = container;
    this.btnRefresh = this.container.querySelector('.btn_refresh');
    this.newsList = this.container.querySelector('.news_list');
    this.preloadBox = this.container.querySelector('.preload_box');
  }
  createNewsEl(obj) {
    const news = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('li', ['news']);
    const newsTitle = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('h3', ['news-title']);
    newsTitle.textContent = obj.title;
    news.append(newsTitle);
    const preview = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['news_preview']);
    const image = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('img', ['news_image'], [{
      name: 'src',
      value: obj.imgSrc
    }, {
      name: 'alt',
      value: 'Изображение к новости'
    }]);
    const description = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('p', ['news_description']);
    description.textContent = obj.description;
    preview.append(image);
    preview.append(description);
    news.append(preview);
    this.newsList.append(news);
  }
  clearNewsList() {
    this.newsList.querySelectorAll('.news').forEach(n => n.remove());
  }
}

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommunicationServer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommunicationServer */ "./src/js/CommunicationServer.js");
/* harmony import */ var _ControlNews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ControlNews */ "./src/js/ControlNews.js");
/* harmony import */ var _InformMassage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InformMassage */ "./src/js/InformMassage.js");
/* harmony import */ var _NewsWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NewsWidget */ "./src/js/NewsWidget.js");




const container = document.querySelector('.container');
const informBox = document.querySelector('.inform_box');
const port = 'https://loading-styling-backend-pgpi.onrender.com';
const widget = new _NewsWidget__WEBPACK_IMPORTED_MODULE_3__["default"](container);
const communicator = new _CommunicationServer__WEBPACK_IMPORTED_MODULE_0__["default"](port);
const inform = new _InformMassage__WEBPACK_IMPORTED_MODULE_2__["default"](informBox);
const controller = new _ControlNews__WEBPACK_IMPORTED_MODULE_1__["default"](widget, communicator, inform);
controller.activation();
if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      if (navigator.serviceWorker) {
        await navigator.serviceWorker.register('/sw.js');
      }
    } catch (e) {
      console.log(e);
    }
  });
}

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n    <title>Loading Styling</title>\n</head>\n<body>\n    <div class=\"container\">\n        <div class=\"news_box\">\n            <div class=\"news_box_header\">\n                 <h2 class=\"news_box_title\">Новости мира кино</h2> <button type=\"button\" class=\"btn_refresh\">Обновить</button>\n            </div>\n            <ul class=\"news_list\"></ul>\n            <ul class=\"preload_box\">\n                <li class=\"news\">\n                    <h3 class=\"news-title preload_view\">A</h3>\n                    <div class=\"news_preview\">\n                        <div class=\"news_image preload_view\"></div>\n                        <p class=\"news_description preload_view\"></p>\n                    </div>\n                </li>\n                <li class=\"news\">\n                    <h3 class=\"news-title preload_view\">A</h3>\n                    <div class=\"news_preview\">\n                        <div class=\"news_image preload_view\"></div>\n                        <p class=\"news_description preload_view\"></p>\n                    </div>\n                </li>\n                <li class=\"news\">\n                    <h3 class=\"news-title preload_view\">A</h3>\n                    <div class=\"news_preview\">\n                        <div class=\"news_image preload_view\"></div>\n                        <p class=\"news_description preload_view\"></p>\n                    </div>\n                </li>\n            </ul>\n            <div class=\"inform_box hidden\">\n                <p class=\"inform_text\"></p>\n            </div>\n        </div>\n    </div>\n</body>\n</html>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/licenses.txt":
/*!**************************!*\
  !*** ./src/licenses.txt ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "licenses.txt";

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/app */ "./src/js/app.js");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _licenses_txt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./licenses.txt */ "./src/licenses.txt");




}();
/******/ })()
;
//# sourceMappingURL=main.js.map