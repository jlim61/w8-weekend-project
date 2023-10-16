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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n// ==================================================================================Classes==================================================================================\nclass InventoryItem {\n    _id;\n    _name;\n    _price;\n    _description;\n    _quantity;\n    constructor(_name, _price, _description) {\n        this._id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        this._name = _name;\n        this._price = _price;\n        this._description = _description;\n        this._quantity = 0;\n    }\n    // getters and setters\n    get id() {\n        return this._id;\n    }\n    // made a setter but I don't think it should be allowed to be set because it might not be unique\n    // anymore so I commented it out, but had it here to meet requirements\n    // public set id(id: string) {\n    //     this._id = id;\n    // }\n    get name() {\n        return this._name;\n    }\n    set name(name) {\n        this._name = name;\n    }\n    get price() {\n        return this._price;\n    }\n    set price(price) {\n        this._price = price;\n    }\n    get description() {\n        return this._description;\n    }\n    set description(description) {\n        this._description = description;\n    }\n    get quantity() {\n        return this._quantity;\n    }\n    set quantity(quantity) {\n        this._quantity = quantity;\n    }\n}\nclass Weapon extends InventoryItem {\n    _damage;\n    _range;\n    constructor(name, price, description, _damage, _range) {\n        super(name, price, description);\n        this._damage = _damage;\n        this._range = _range;\n    }\n    // getters and setters\n    get damage() {\n        return this._damage;\n    }\n    set damage(damage) {\n        this._damage = damage;\n    }\n    get range() {\n        return this._range;\n    }\n    set range(range) {\n        this._range = range;\n    }\n}\nclass Armor extends InventoryItem {\n    _defense;\n    constructor(name, price, description, _defense) {\n        super(name, price, description);\n        this._defense = _defense;\n    }\n    // getters and setters\n    get defense() {\n        return this._defense;\n    }\n    set defense(defense) {\n        this._defense = defense;\n    }\n}\nclass Character {\n    _id;\n    _name;\n    _archtype;\n    _fightingStyle;\n    _inventory;\n    container;\n    characterDiv;\n    constructor(_name, _archtype, _fightingStyle, _inventory = []) {\n        this._id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        this._name = _name;\n        this._archtype = _archtype;\n        this._fightingStyle = _fightingStyle;\n        this._inventory = _inventory;\n        this.container = document.querySelector('main');\n        this.characterDiv = document.querySelector('.character-div');\n    }\n    // getters amd setters\n    get id() {\n        return this._id;\n    }\n    // made a setter but I don't think it should be allowed to be set because it might not be unique\n    // anymore so I commented it out, but had it here to meet requirements\n    // public set id(id: string) {\n    //     this._id = id;\n    // }\n    get name() {\n        return this._name;\n    }\n    set name(name) {\n        this._name = name;\n    }\n    get archtype() {\n        return this._archtype;\n    }\n    set archtype(archtype) {\n        this._archtype = archtype;\n    }\n    get fightingStyle() {\n        return this._fightingStyle;\n    }\n    set fightingStyle(fightingStyle) {\n        this._fightingStyle = fightingStyle;\n    }\n    get inventory() {\n        return this._inventory;\n    }\n    set inventory(inventory) {\n        this._inventory = inventory;\n    }\n    // ========Character Class Methods========\n    static createRPGCharacter(name, archtype) {\n        return new Character(name, archtype, 'melee');\n    }\n    addToInventory(inventoryItem) {\n        const existingItem = this._inventory.find(item => item.name === inventoryItem.name);\n        if (existingItem) {\n            existingItem.quantity += 1;\n        }\n        else {\n            inventoryItem.quantity = 1;\n            this._inventory.push(inventoryItem);\n        }\n    }\n    removeFromInventory(inventoryItem) {\n        this._inventory = this._inventory.filter(item => item.name !== inventoryItem.name);\n    }\n    removeQuantityFromInventory(inventoryItem, quantityToRemove) {\n        const item = this._inventory.find(item => item.id === inventoryItem.id);\n        if (item && item.quantity >= quantityToRemove) {\n            item.quantity -= quantityToRemove;\n        }\n        else if (item && item.quantity === 0) {\n            this._inventory = this._inventory.filter(item => item.name !== inventoryItem.name);\n        }\n    }\n    inventoryValue() {\n        let total = 0;\n        this._inventory.forEach(item => {\n            total += item.price;\n        });\n        console.log(`Total Inventory Value: ${total} Coins`);\n        return total;\n    }\n    inventoryHTMLElement() {\n        this.characterDiv.innerHTML = '';\n        for (const item of this._inventory) {\n            const itemDiv = this.createItemDiv(item);\n            itemDiv.className = 'created-item-div';\n            this.characterDiv.appendChild(itemDiv);\n        }\n        return this.characterDiv;\n    }\n    createItemDiv(item) {\n        const itemDiv = document.createElement('div');\n        itemDiv.className = 'item-div';\n        const p = document.createElement('p');\n        this.updatePText(p, item);\n        itemDiv.appendChild(p);\n        this.addItemButtons(itemDiv, item);\n        return itemDiv;\n    }\n    updatePText(p, item) {\n        p.innerText = `${item.name}\r\n        Price: ${item.price} Coins\r\n        Description: ${item.description}\r\n        Quantity: ${item.quantity}`;\n    }\n    addItemButtons(div, item) {\n        const buttonContainer = document.createElement('div');\n        const removeOneItemButton = document.createElement('button');\n        removeOneItemButton.innerText = 'Remove One';\n        const removeAllItemButton = document.createElement('button');\n        removeAllItemButton.innerText = 'Remove All';\n        this.addRemoveEventListeners(item, removeOneItemButton, removeAllItemButton);\n        buttonContainer.append(removeOneItemButton, removeAllItemButton);\n        div.appendChild(buttonContainer);\n    }\n    addRemoveEventListeners(item, removeOneItemButton, removeAllItemButton) {\n        removeOneItemButton.addEventListener('click', () => {\n            this.removeQuantityFromInventory(item, 1);\n            this.inventoryHTMLElement();\n        });\n        removeAllItemButton.addEventListener('click', () => {\n            this.removeFromInventory(item);\n            this.inventoryHTMLElement();\n        });\n    }\n}\nclass Inventory {\n    _items;\n    container;\n    shopDiv;\n    inventoryDiv;\n    constructor(_items) {\n        this._items = _items;\n        this.container = document.querySelector('main');\n        this.shopDiv = document.querySelector('.shop-div');\n        this.inventoryDiv = document.querySelector('.inventory-div');\n    }\n    // getters and setters\n    get items() {\n        return this._items;\n    }\n    set items(items) {\n        this._items = items;\n    }\n    // ========Inventory Class Methods========\n    showItems() {\n        this.shopDiv.innerHTML = '';\n        for (const item of this._items) {\n            const inventoryItemDiv = this.createInventoryItemDiv(item);\n            inventoryItemDiv.className = 'inventory-item-div';\n            this.shopDiv.appendChild(inventoryItemDiv);\n        }\n        return this.shopDiv;\n    }\n    createInventoryItemDiv(item) {\n        const inventoryItemDiv = document.createElement('div');\n        const p = document.createElement('p');\n        this.updatePText(p, item);\n        inventoryItemDiv.appendChild(p);\n        return inventoryItemDiv;\n    }\n    updatePText(p, item) {\n        p.innerText = `${item.name}\r\n        Price: ${item.price} Coins\r\n        Description: ${item.description}\r\n        Quantity: ${item.quantity}`;\n    }\n    updateInventory() {\n        this.inventoryDiv.innerHTML = '';\n        if (this._items) {\n            for (const item of this._items) {\n                const inventoryItemDiv = this.createInventoryItemDivWithButtons(item);\n                inventoryItemDiv.className = 'inventory-item-div';\n                this.inventoryDiv.appendChild(inventoryItemDiv);\n            }\n        }\n        else {\n            this.inventoryDiv.innerHTML = 'Inventory is empty';\n        }\n        return this.inventoryDiv;\n    }\n    createInventoryItemDivWithButtons(item) {\n        const inventoryItemDiv = document.createElement('div');\n        const p = document.createElement('p');\n        this.updatePText(p, item);\n        inventoryItemDiv.appendChild(p);\n        this.addItemButtons(inventoryItemDiv, item);\n        return inventoryItemDiv;\n    }\n    addItemButtons(div, item) {\n        const buttonContainer = document.createElement('div');\n        const removeOneItemButton = document.createElement('button');\n        removeOneItemButton.innerText = 'Remove One';\n        const removeAllItemButton = document.createElement('button');\n        removeAllItemButton.innerText = 'Remove All';\n        this.addRemoveEventListeners(item, removeOneItemButton, removeAllItemButton);\n        buttonContainer.append(removeOneItemButton, removeAllItemButton);\n        div.appendChild(buttonContainer);\n    }\n    addRemoveEventListeners(item, removeOneItemButton, removeAllItemButton) {\n        removeOneItemButton.addEventListener('click', () => {\n            this.removeQuantityFromInventory(item, 1);\n            this.updateInventory();\n        });\n        removeAllItemButton.addEventListener('click', () => {\n            this.removeFromInventory(item);\n            this.updateInventory();\n        });\n    }\n    removeFromInventory(inventoryItem) {\n        this._items = this._items.filter(item => item.name !== inventoryItem.name);\n    }\n    removeQuantityFromInventory(inventoryItem, quantityToRemove) {\n        const item = this._items.find(item => item.id === inventoryItem.id);\n        if (item && item.quantity >= quantityToRemove) {\n            item.quantity -= quantityToRemove;\n        }\n        else if (item && item.quantity === 0) {\n            this._items = this._items.filter(item => item.name !== inventoryItem.name);\n        }\n    }\n    createRPGItems(character) {\n        const starterItem1 = new Weapon('Starter Sword', 1, 'A sword great for beginners', 5, false);\n        starterItem1.quantity += 1;\n        const starterItem2 = new Armor('Starter Platebody', 1, 'A great beginner armor', 5);\n        starterItem2.quantity += 1;\n        const starterItem3 = new Armor('Starter Platelegs', 1, 'A great beginner armor', 5);\n        starterItem3.quantity += 1;\n        character.addToInventory(starterItem1);\n        character.addToInventory(starterItem2);\n        character.addToInventory(starterItem3);\n        return character.inventory;\n    }\n}\nclass Shop {\n    _items;\n    constructor(_items) {\n        this._items = _items;\n    }\n    // getters and setters\n    get items() {\n        return this._items;\n    }\n    set items(items) {\n        this._items = items;\n    }\n    // ========Shop Class Methods========\n    shopConstructor(item1, item2, item3) {\n        const anItem = item1;\n        const anItem2 = item2;\n        const anItem3 = item3;\n        this._items.push(anItem, anItem2, anItem3);\n    }\n    autoConstructor() {\n        const anItem = new Armor('Justiciar Faceguard', 14442221, 'A helm that once belonged to a Justiciar, a loyal zealot of Saradomin.', 75);\n        const anItem2 = new Armor('Justiciar Chestguard', 18249491, \"A Justiciar's chestguard. They once roamed the land casting judgements on wrongdoers, their decisions were never questioned.\", 75);\n        const anItem3 = new Armor('Justiciar Legguards', 13744156, \"\tA Justiciar's platelegs. Their once bright colours have since faded.\", 75);\n        this._items.push(anItem, anItem2, anItem3);\n    }\n}\n// ==================================================================================Driver==================================================================================\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const character = Character.createRPGCharacter('Cow31337Killer', 'Warrior');\n    const shopInventory = new Inventory(character.inventory);\n    shopInventory.createRPGItems(character);\n    const item1 = new Weapon('Sword', 10, 'A basic sword', 15, false);\n    const item2 = new Weapon('Bow', 15, 'A ranged weapon', 10, true);\n    const item3 = new Armor('Chainmail', 20, 'Protective armor', 30);\n    const item4 = new Armor('Helmet', 15, 'No arrows to the head here', 20);\n    const item5 = new Weapon('Staff', 50, 'Make Gandalf proud', 40, true);\n    character.addToInventory(item1);\n    character.addToInventory(item2);\n    character.addToInventory(item3);\n    character.addToInventory(item3);\n    character.addToInventory(item3);\n    character.inventoryHTMLElement();\n    shopInventory.showItems();\n    character.addToInventory(item4);\n    character.addToInventory(item5);\n    shopInventory.updateInventory();\n    console.log(character);\n    console.log(shopInventory);\n});\n\n\n//# sourceURL=webpack://weekend-project/./src/index.ts?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  randomUUID\n});\n\n//# sourceURL=webpack://weekend-project/./node_modules/uuid/dist/esm-browser/native.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack://weekend-project/./node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\nlet getRandomValues;\nconst rnds8 = new Uint8Array(16);\nfunction rng() {\n  // lazy load so that environments that need to polyfill have a chance to do so\n  if (!getRandomValues) {\n    // getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation.\n    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);\n\n    if (!getRandomValues) {\n      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n    }\n  }\n\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://weekend-project/./node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nconst byteToHex = [];\n\nfor (let i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).slice(1));\n}\n\nfunction unsafeStringify(arr, offset = 0) {\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];\n}\n\nfunction stringify(arr, offset = 0) {\n  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack://weekend-project/./node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ \"./node_modules/uuid/dist/esm-browser/native.js\");\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\n\nfunction v4(options, buf, offset) {\n  if (_native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID && !buf && !options) {\n    return _native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID();\n  }\n\n  options = options || {};\n  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (let i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n//# sourceURL=webpack://weekend-project/./node_modules/uuid/dist/esm-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://weekend-project/./node_modules/uuid/dist/esm-browser/validate.js?");

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
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;