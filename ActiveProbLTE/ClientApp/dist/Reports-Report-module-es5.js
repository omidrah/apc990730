(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Reports-Report-module"],{

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a, true&&(module.exports=a)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ }),

/***/ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js":
/*!*******************************************************!*\
  !*** ./node_modules/ngx-spinner/fesm5/ngx-spinner.js ***!
  \*******************************************************/
/*! exports provided: NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxSpinnerComponent", function() { return NgxSpinnerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxSpinnerModule", function() { return NgxSpinnerModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxSpinnerService", function() { return NgxSpinnerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");







/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-spinner.enum.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var LOADERS = {
    'ball-8bits': 16,
    'ball-atom': 4,
    'ball-beat': 3,
    'ball-circus': 5,
    'ball-climbing-dot': 4,
    'ball-clip-rotate': 1,
    'ball-clip-rotate-multiple': 2,
    'ball-clip-rotate-pulse': 2,
    'ball-elastic-dots': 5,
    'ball-fall': 3,
    'ball-fussion': 4,
    'ball-grid-beat': 9,
    'ball-grid-pulse': 9,
    'ball-newton-cradle': 4,
    'ball-pulse': 3,
    'ball-pulse-rise': 5,
    'ball-pulse-sync': 3,
    'ball-rotate': 1,
    'ball-running-dots': 5,
    'ball-scale': 1,
    'ball-scale-multiple': 3,
    'ball-scale-pulse': 2,
    'ball-scale-ripple': 1,
    'ball-scale-ripple-multiple': 3,
    'ball-spin': 8,
    'ball-spin-clockwise': 8,
    'ball-spin-clockwise-fade': 8,
    'ball-spin-clockwise-fade-rotating': 8,
    'ball-spin-fade': 8,
    'ball-spin-fade-rotating': 8,
    'ball-spin-rotate': 2,
    'ball-square-clockwise-spin': 8,
    'ball-square-spin': 8,
    'ball-triangle-path': 3,
    'ball-zig-zag': 2,
    'ball-zig-zag-deflect': 2,
    'cog': 1,
    'cube-transition': 2,
    'fire': 3,
    'line-scale': 5,
    'line-scale-party': 5,
    'line-scale-pulse-out': 5,
    'line-scale-pulse-out-rapid': 5,
    'line-spin-clockwise-fade': 8,
    'line-spin-clockwise-fade-rotating': 8,
    'line-spin-fade': 8,
    'line-spin-fade-rotating': 8,
    'pacman': 6,
    'square-jelly-box': 2,
    'square-loader': 1,
    'square-spin': 1,
    'timer': 1,
    'triangle-skew-spin': 1
};
/** @type {?} */
var DEFAULTS = {
    BD_COLOR: 'rgba(51,51,51,0.8)',
    SPINNER_COLOR: '#fff',
    SPINNER_TYPE: 'ball-scale-multiple',
    Z_INDEX: 99999,
};
/** @type {?} */
var PRIMARY_SPINNER = 'primary';
/**
 * @record
 */
function Spinner() { }
if (false) {}
var NgxSpinner = /** @class */ (function () {
    function NgxSpinner(init) {
        Object.assign(this, init);
    }
    return NgxSpinner;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-spinner.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxSpinnerService = /** @class */ (function () {
    /**
     * Creates an instance of NgxSpinnerService.
     * @memberof NgxSpinnerService
     */
    function NgxSpinnerService() {
        /**
         * Spinner observable
         *
         * \@memberof NgxSpinnerService
         */
        this.spinnerObservable = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
    }
    /**
    * Get subscription of desired spinner
    * @memberof NgxSpinnerService
    **/
    /**
     * Get subscription of desired spinner
     * \@memberof NgxSpinnerService
     *
     * @param {?} name
     * @return {?}
     */
    NgxSpinnerService.prototype.getSpinner = /**
     * Get subscription of desired spinner
     * \@memberof NgxSpinnerService
     *
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.spinnerObservable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x && x.name === name; })));
    };
    /**
     * To show spinner
     *
     * @memberof NgxSpinnerService
     */
    /**
     * To show spinner
     *
     * \@memberof NgxSpinnerService
     * @param {?=} name
     * @param {?=} spinner
     * @return {?}
     */
    NgxSpinnerService.prototype.show = /**
     * To show spinner
     *
     * \@memberof NgxSpinnerService
     * @param {?=} name
     * @param {?=} spinner
     * @return {?}
     */
    function (name, spinner) {
        var _this = this;
        if (name === void 0) { name = PRIMARY_SPINNER; }
        /** @type {?} */
        var showPromise = new Promise((/**
         * @param {?} resolve
         * @param {?} _reject
         * @return {?}
         */
        function (resolve, _reject) {
            if (spinner && Object.keys(spinner).length) {
                spinner['name'] = name;
                _this.spinnerObservable.next(new NgxSpinner(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, spinner, { show: true })));
                resolve(true);
            }
            else {
                _this.spinnerObservable.next(new NgxSpinner({ name: name, show: true }));
                resolve(true);
            }
        }));
        return showPromise;
    };
    /**
    * To hide spinner
    *
    * @memberof NgxSpinnerService
    */
    /**
     * To hide spinner
     *
     * \@memberof NgxSpinnerService
     * @param {?=} name
     * @param {?=} debounce
     * @return {?}
     */
    NgxSpinnerService.prototype.hide = /**
     * To hide spinner
     *
     * \@memberof NgxSpinnerService
     * @param {?=} name
     * @param {?=} debounce
     * @return {?}
     */
    function (name, debounce) {
        var _this = this;
        if (name === void 0) { name = PRIMARY_SPINNER; }
        if (debounce === void 0) { debounce = 0; }
        /** @type {?} */
        var hidePromise = new Promise((/**
         * @param {?} resolve
         * @param {?} _reject
         * @return {?}
         */
        function (resolve, _reject) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.spinnerObservable.next(new NgxSpinner({ name: name, show: false }));
                resolve(true);
            }), debounce);
        }));
        return hidePromise;
    };
    NgxSpinnerService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxSpinnerService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxSpinnerService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function NgxSpinnerService_Factory() { return new NgxSpinnerService(); }, token: NgxSpinnerService, providedIn: "root" });
    return NgxSpinnerService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-spinner.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxSpinnerComponent = /** @class */ (function () {
    /**
     * Creates an instance of NgxSpinnerComponent.
     *
     * @memberof NgxSpinnerComponent
     */
    function NgxSpinnerComponent(spinnerService, changeDetector) {
        var _this = this;
        this.spinnerService = spinnerService;
        this.changeDetector = changeDetector;
        /**
         * Spinner Object
         *
         * \@memberof NgxSpinnerComponent
         */
        this.spinner = new NgxSpinner();
        /**
         * Unsubscribe from spinner's observable
         *
         * \@memberof NgxSpinnerComponent
         *
         */
        this.ngUnsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * To set default ngx-spinner options
         *
         * \@memberof NgxSpinnerComponent
         */
        this.setDefaultOptions = (/**
         * @return {?}
         */
        function () {
            _this.spinner = new NgxSpinner({
                name: _this.name,
                bdColor: _this.bdColor,
                size: _this.size,
                color: _this.color,
                type: _this.type,
                fullScreen: _this.fullScreen,
                divArray: _this.divArray,
                divCount: _this.divCount,
                show: _this.show,
                zIndex: _this.zIndex,
            });
        });
        this.bdColor = DEFAULTS.BD_COLOR;
        this.zIndex = DEFAULTS.Z_INDEX;
        this.color = DEFAULTS.SPINNER_COLOR;
        this.type = DEFAULTS.SPINNER_TYPE;
        this.size = 'large';
        this.fullScreen = true;
        this.name = PRIMARY_SPINNER;
        this.divArray = [];
        this.divCount = 0;
        this.show = false;
    }
    /**
     * Initialization method
     *
     * @memberof NgxSpinnerComponent
     */
    /**
     * Initialization method
     *
     * \@memberof NgxSpinnerComponent
     * @return {?}
     */
    NgxSpinnerComponent.prototype.ngOnInit = /**
     * Initialization method
     *
     * \@memberof NgxSpinnerComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this.setDefaultOptions();
        this.spinnerService.getSpinner(this.name)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.ngUnsubscribe))
            .subscribe((/**
         * @param {?} spinner
         * @return {?}
         */
        function (spinner) {
            _this.setDefaultOptions();
            Object.assign(_this.spinner, spinner);
            if (spinner.show) {
                _this.onInputChange();
            }
            _this.changeDetector.markForCheck();
        }));
    };
    /**
     * On changes event for input variables
     *
     * @memberof NgxSpinnerComponent
     */
    /**
     * On changes event for input variables
     *
     * \@memberof NgxSpinnerComponent
     * @param {?} changes
     * @return {?}
     */
    NgxSpinnerComponent.prototype.ngOnChanges = /**
     * On changes event for input variables
     *
     * \@memberof NgxSpinnerComponent
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        for (var propName in changes) {
            if (propName) {
                /** @type {?} */
                var changedProp = changes[propName];
                if (changedProp.isFirstChange()) {
                    return;
                }
                else if (typeof changedProp.currentValue !== 'undefined' && changedProp.currentValue !== changedProp.previousValue) {
                    if (changedProp.currentValue !== '') {
                        this.spinner[propName] = changedProp.currentValue;
                    }
                }
            }
        }
    };
    /**
     * To get class for spinner
     *
     * @memberof NgxSpinnerComponent
     */
    /**
     * To get class for spinner
     *
     * \@memberof NgxSpinnerComponent
     * @param {?} type
     * @param {?} size
     * @return {?}
     */
    NgxSpinnerComponent.prototype.getClass = /**
     * To get class for spinner
     *
     * \@memberof NgxSpinnerComponent
     * @param {?} type
     * @param {?} size
     * @return {?}
     */
    function (type, size) {
        this.spinner.divCount = LOADERS[type];
        this.spinner.divArray = Array(this.spinner.divCount).fill(0).map((/**
         * @param {?} x
         * @param {?} i
         * @return {?}
         */
        function (x, i) { return i; }));
        /** @type {?} */
        var sizeClass = '';
        switch (size.toLowerCase()) {
            case 'small':
                sizeClass = 'la-sm';
                break;
            case 'medium':
                sizeClass = 'la-2x';
                break;
            case 'large':
                sizeClass = 'la-3x';
                break;
            default:
                break;
        }
        return 'la-' + type + ' ' + sizeClass;
    };
    /**
     * Check if input variables have changed
     *
     * @memberof NgxSpinnerComponent
     */
    /**
     * Check if input variables have changed
     *
     * \@memberof NgxSpinnerComponent
     * @return {?}
     */
    NgxSpinnerComponent.prototype.onInputChange = /**
     * Check if input variables have changed
     *
     * \@memberof NgxSpinnerComponent
     * @return {?}
     */
    function () {
        this.spinner.class = this.getClass(this.spinner.type, this.spinner.size);
    };
    /**
     * Component destroy event
     *
     * @memberof NgxSpinnerComponent
     */
    /**
     * Component destroy event
     *
     * \@memberof NgxSpinnerComponent
     * @return {?}
     */
    NgxSpinnerComponent.prototype.ngOnDestroy = /**
     * Component destroy event
     *
     * \@memberof NgxSpinnerComponent
     * @return {?}
     */
    function () {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    };
    NgxSpinnerComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'ngx-spinner',
                    template: "<div [@fadeIn]=\"'in'\" *ngIf=\"spinner.show\" class=\"overlay\" [style.background-color]=\"spinner.bdColor\" [style.z-index]=\"spinner.zIndex\"\n  [style.position]=\"spinner.fullScreen ? 'fixed' : 'absolute'\">\n  <div [class]=\"spinner.class\" [style.color]=\"spinner.color\">\n    <div *ngFor=\"let index of spinner.divArray\"></div>\n  </div>\n  <div class=\"loading-text\" [style.z-index]=\"spinner.zIndex\">\n    <ng-content></ng-content>\n  </div>\n</div>",
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
                    animations: [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["trigger"])('fadeIn', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('in', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({ opacity: 1 })),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["transition"])(':enter', [
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({ opacity: 0 }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["animate"])(300)
                            ]),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["transition"])(':leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["animate"])(200, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({ opacity: 0 })))
                        ])
                    ],
                    styles: ["/*!\n * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)\n * Copyright 2015 Daniel Cardoso <@DanielCardoso>\n * Licensed under MIT\n */.la-ball-8bits,.la-ball-8bits>div{position:relative;box-sizing:border-box}.la-ball-8bits{display:block;font-size:0;color:#fff;width:12px;height:12px}.la-ball-8bits.la-dark{color:#333}.la-ball-8bits>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:4px;height:4px;border-radius:0;opacity:0;transform:translate(100%,100%);-webkit-animation:1s infinite ball-8bits;animation:1s infinite ball-8bits}.la-ball-8bits>div:nth-child(1){-webkit-animation-delay:-.9375s;animation-delay:-.9375s;top:-100%;left:0}.la-ball-8bits>div:nth-child(2){-webkit-animation-delay:-.875s;animation-delay:-.875s;top:-100%;left:33.3333333333%}.la-ball-8bits>div:nth-child(3){-webkit-animation-delay:-.8125s;animation-delay:-.8125s;top:-66.6666666667%;left:66.6666666667%}.la-ball-8bits>div:nth-child(4){-webkit-animation-delay:-.75s;animation-delay:-.75s;top:-33.3333333333%;left:100%}.la-ball-8bits>div:nth-child(5){-webkit-animation-delay:-.6875s;animation-delay:-.6875s;top:0;left:100%}.la-ball-8bits>div:nth-child(6){-webkit-animation-delay:-.625s;animation-delay:-.625s;top:33.3333333333%;left:100%}.la-ball-8bits>div:nth-child(7){-webkit-animation-delay:-.5625s;animation-delay:-.5625s;top:66.6666666667%;left:66.6666666667%}.la-ball-8bits>div:nth-child(8){-webkit-animation-delay:-.5s;animation-delay:-.5s;top:100%;left:33.3333333333%}.la-ball-8bits>div:nth-child(9){-webkit-animation-delay:-.4375s;animation-delay:-.4375s;top:100%;left:0}.la-ball-8bits>div:nth-child(10){-webkit-animation-delay:-.375s;animation-delay:-.375s;top:100%;left:-33.3333333333%}.la-ball-8bits>div:nth-child(11){-webkit-animation-delay:-.3125s;animation-delay:-.3125s;top:66.6666666667%;left:-66.6666666667%}.la-ball-8bits>div:nth-child(12){-webkit-animation-delay:-.25s;animation-delay:-.25s;top:33.3333333333%;left:-100%}.la-ball-8bits>div:nth-child(13){-webkit-animation-delay:-.1875s;animation-delay:-.1875s;top:0;left:-100%}.la-ball-8bits>div:nth-child(14){-webkit-animation-delay:-.125s;animation-delay:-.125s;top:-33.3333333333%;left:-100%}.la-ball-8bits>div:nth-child(15){-webkit-animation-delay:-.0625s;animation-delay:-.0625s;top:-66.6666666667%;left:-66.6666666667%}.la-ball-8bits>div:nth-child(16){-webkit-animation-delay:0s;animation-delay:0s;top:-100%;left:-33.3333333333%}.la-ball-8bits.la-sm{width:6px;height:6px}.la-ball-8bits.la-sm>div{width:2px;height:2px}.la-ball-8bits.la-2x{width:24px;height:24px}.la-ball-8bits.la-2x>div{width:8px;height:8px}.la-ball-8bits.la-3x{width:36px;height:36px}.la-ball-8bits.la-3x>div{width:12px;height:12px}@-webkit-keyframes ball-8bits{0%,50%{opacity:1}51%{opacity:0}}@keyframes ball-8bits{0%,50%{opacity:1}51%{opacity:0}}.la-ball-atom,.la-ball-atom>div{position:relative;box-sizing:border-box}.la-ball-atom{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-atom.la-dark{color:#333}.la-ball-atom>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-ball-atom>div:nth-child(1){position:absolute;top:50%;left:50%;z-index:1;width:60%;height:60%;background:#aaa;border-radius:100%;transform:translate(-50%,-50%);-webkit-animation:4.5s linear infinite ball-atom-shrink;animation:4.5s linear infinite ball-atom-shrink}.la-ball-atom>div:not(:nth-child(1)){position:absolute;left:0;z-index:0;width:100%;height:100%;background:0 0;-webkit-animation:1.5s steps(2,end) infinite ball-atom-zindex;animation:1.5s steps(2,end) infinite ball-atom-zindex}.la-ball-atom>div:not(:nth-child(1)):before{position:absolute;top:0;left:0;width:10px;height:10px;margin-top:-5px;margin-left:-5px;content:\"\";background:currentColor;border-radius:50%;opacity:.75;-webkit-animation:1.5s infinite ball-atom-position,1.5s infinite ball-atom-size;animation:1.5s infinite ball-atom-position,1.5s infinite ball-atom-size}.la-ball-atom>div:nth-child(2){-webkit-animation-delay:.75s;animation-delay:.75s}.la-ball-atom>div:nth-child(2):before{-webkit-animation-delay:0s,-1.125s;animation-delay:0s,-1.125s}.la-ball-atom>div:nth-child(3){transform:rotate(120deg);-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-atom>div:nth-child(3):before{-webkit-animation-delay:-1s,-.75s;animation-delay:-1s,-.75s}.la-ball-atom>div:nth-child(4){transform:rotate(240deg);-webkit-animation-delay:.25s;animation-delay:.25s}.la-ball-atom>div:nth-child(4):before{-webkit-animation-delay:-.5s,-125ms;animation-delay:-.5s,-125ms}.la-ball-atom.la-sm{width:16px;height:16px}.la-ball-atom.la-sm>div:not(:nth-child(1)):before{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-atom.la-2x{width:64px;height:64px}.la-ball-atom.la-2x>div:not(:nth-child(1)):before{width:20px;height:20px;margin-top:-10px;margin-left:-10px}.la-ball-atom.la-3x{width:96px;height:96px}.la-ball-atom.la-3x>div:not(:nth-child(1)):before{width:30px;height:30px;margin-top:-15px;margin-left:-15px}@-webkit-keyframes ball-atom-position{50%{top:100%;left:100%}}@keyframes ball-atom-position{50%{top:100%;left:100%}}@-webkit-keyframes ball-atom-size{50%{transform:scale(.5,.5)}}@keyframes ball-atom-size{50%{transform:scale(.5,.5)}}@-webkit-keyframes ball-atom-zindex{50%{z-index:10}}@keyframes ball-atom-zindex{50%{z-index:10}}@-webkit-keyframes ball-atom-shrink{50%{transform:translate(-50%,-50%) scale(.8,.8)}}@keyframes ball-atom-shrink{50%{transform:translate(-50%,-50%) scale(.8,.8)}}.la-ball-beat,.la-ball-beat>div{position:relative;box-sizing:border-box}.la-ball-beat{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-beat.la-dark{color:#333}.la-ball-beat>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;-webkit-animation:.7s linear -.15s infinite ball-beat;animation:.7s linear -.15s infinite ball-beat}.la-ball-beat>div:nth-child(2n-1){-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-beat.la-sm{width:26px;height:8px}.la-ball-beat.la-sm>div{width:4px;height:4px;margin:2px}.la-ball-beat.la-2x{width:108px;height:36px}.la-ball-beat.la-2x>div{width:20px;height:20px;margin:8px}.la-ball-beat.la-3x{width:162px;height:54px}.la-ball-beat.la-3x>div{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-beat{50%{opacity:.2;transform:scale(.75)}100%{opacity:1;transform:scale(1)}}@keyframes ball-beat{50%{opacity:.2;transform:scale(.75)}100%{opacity:1;transform:scale(1)}}.la-ball-circus,.la-ball-circus>div{position:relative;box-sizing:border-box}.la-ball-circus{display:block;font-size:0;color:#fff;width:16px;height:16px}.la-ball-circus.la-dark{color:#333}.la-ball-circus>div{float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:-100%;display:block;width:100%;height:100%;border-radius:100%;opacity:.5;-webkit-animation:2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-position,2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-size;animation:2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-position,2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-size}.la-ball-circus>div:nth-child(1){-webkit-animation-delay:0s,-.5s;animation-delay:0s,-.5s}.la-ball-circus>div:nth-child(2){-webkit-animation-delay:-.5s,-1s;animation-delay:-.5s,-1s}.la-ball-circus>div:nth-child(3){-webkit-animation-delay:-1s,-1.5s;animation-delay:-1s,-1.5s}.la-ball-circus>div:nth-child(4){-webkit-animation-delay:-1.5s,-2s;animation-delay:-1.5s,-2s}.la-ball-circus>div:nth-child(5){-webkit-animation-delay:-2s,-2.5s;animation-delay:-2s,-2.5s}.la-ball-circus.la-sm,.la-ball-circus.la-sm>div{width:8px;height:8px}.la-ball-circus.la-2x,.la-ball-circus.la-2x>div{width:32px;height:32px}.la-ball-circus.la-3x,.la-ball-circus.la-3x>div{width:48px;height:48px}@-webkit-keyframes ball-circus-position{50%{left:100%}}@keyframes ball-circus-position{50%{left:100%}}@-webkit-keyframes ball-circus-size{50%{transform:scale(.3,.3)}}@keyframes ball-circus-size{50%{transform:scale(.3,.3)}}.la-ball-climbing-dot,.la-ball-climbing-dot>div{position:relative;box-sizing:border-box}.la-ball-climbing-dot{display:block;font-size:0;color:#fff;width:42px;height:32px}.la-ball-climbing-dot.la-dark{color:#333}.la-ball-climbing-dot>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-ball-climbing-dot>div:nth-child(1){position:absolute;bottom:32%;left:18%;width:14px;height:14px;border-radius:100%;transform-origin:center bottom;-webkit-animation:.6s ease-in-out infinite ball-climbing-dot-jump;animation:.6s ease-in-out infinite ball-climbing-dot-jump}.la-ball-climbing-dot>div:not(:nth-child(1)){position:absolute;top:0;right:0;width:14px;height:2px;border-radius:0;transform:translate(60%,0);-webkit-animation:1.8s linear infinite ball-climbing-dot-steps;animation:1.8s linear infinite ball-climbing-dot-steps}.la-ball-climbing-dot>div:not(:nth-child(1)):nth-child(2){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-climbing-dot>div:not(:nth-child(1)):nth-child(3){-webkit-animation-delay:-.6s;animation-delay:-.6s}.la-ball-climbing-dot>div:not(:nth-child(1)):nth-child(4){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.la-ball-climbing-dot.la-sm{width:20px;height:16px}.la-ball-climbing-dot.la-sm>div:nth-child(1){width:6px;height:6px}.la-ball-climbing-dot.la-sm>div:not(:nth-child(1)){width:6px;height:1px}.la-ball-climbing-dot.la-2x{width:84px;height:64px}.la-ball-climbing-dot.la-2x>div:nth-child(1){width:28px;height:28px}.la-ball-climbing-dot.la-2x>div:not(:nth-child(1)){width:28px;height:4px}.la-ball-climbing-dot.la-3x{width:126px;height:96px}.la-ball-climbing-dot.la-3x>div:nth-child(1){width:42px;height:42px}.la-ball-climbing-dot.la-3x>div:not(:nth-child(1)){width:42px;height:6px}@-webkit-keyframes ball-climbing-dot-jump{0%,100%{transform:scale(1,.7)}20%,80%,90%{transform:scale(.7,1.2)}40%,46%{transform:scale(1,1)}50%{bottom:125%}}@keyframes ball-climbing-dot-jump{0%,100%{transform:scale(1,.7)}20%,80%,90%{transform:scale(.7,1.2)}40%,46%{transform:scale(1,1)}50%{bottom:125%}}@-webkit-keyframes ball-climbing-dot-steps{0%{top:0;right:0;opacity:0}50%{opacity:1}100%{top:100%;right:100%;opacity:0}}@keyframes ball-climbing-dot-steps{0%{top:0;right:0;opacity:0}50%{opacity:1}100%{top:100%;right:100%;opacity:0}}.la-ball-clip-rotate-multiple,.la-ball-clip-rotate-multiple>div{position:relative;box-sizing:border-box}.la-ball-clip-rotate-multiple{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-clip-rotate-multiple.la-dark{color:#333}.la-ball-clip-rotate-multiple>div{display:inline-block;float:none;border:2px solid currentColor;position:absolute;top:50%;left:50%;background:0 0;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-clip-rotate-multiple-rotate;animation:1s ease-in-out infinite ball-clip-rotate-multiple-rotate}.la-ball-clip-rotate-multiple>div:first-child{position:absolute;width:32px;height:32px;border-right-color:transparent;border-left-color:transparent}.la-ball-clip-rotate-multiple>div:last-child{width:16px;height:16px;border-top-color:transparent;border-bottom-color:transparent;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-direction:reverse;animation-direction:reverse}.la-ball-clip-rotate-multiple.la-sm{width:16px;height:16px}.la-ball-clip-rotate-multiple.la-sm>div{border-width:1px}.la-ball-clip-rotate-multiple.la-sm>div:first-child{width:16px;height:16px}.la-ball-clip-rotate-multiple.la-sm>div:last-child{width:8px;height:8px}.la-ball-clip-rotate-multiple.la-2x{width:64px;height:64px}.la-ball-clip-rotate-multiple.la-2x>div{border-width:4px}.la-ball-clip-rotate-multiple.la-2x>div:first-child{width:64px;height:64px}.la-ball-clip-rotate-multiple.la-2x>div:last-child{width:32px;height:32px}.la-ball-clip-rotate-multiple.la-3x{width:96px;height:96px}.la-ball-clip-rotate-multiple.la-3x>div{border-width:6px}.la-ball-clip-rotate-multiple.la-3x>div:first-child{width:96px;height:96px}.la-ball-clip-rotate-multiple.la-3x>div:last-child{width:48px;height:48px}@-webkit-keyframes ball-clip-rotate-multiple-rotate{0%{transform:translate(-50%,-50%) rotate(0)}50%{transform:translate(-50%,-50%) rotate(180deg)}100%{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes ball-clip-rotate-multiple-rotate{0%{transform:translate(-50%,-50%) rotate(0)}50%{transform:translate(-50%,-50%) rotate(180deg)}100%{transform:translate(-50%,-50%) rotate(360deg)}}.la-ball-clip-rotate-pulse,.la-ball-clip-rotate-pulse>div{position:relative;box-sizing:border-box}.la-ball-clip-rotate-pulse{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-clip-rotate-pulse.la-dark{color:#333}.la-ball-clip-rotate-pulse>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;border-radius:100%}.la-ball-clip-rotate-pulse>div:first-child{position:absolute;width:32px;height:32px;background:0 0;border-style:solid;border-width:2px;border-right-color:transparent;border-left-color:transparent;-webkit-animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-rotate;animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-rotate}.la-ball-clip-rotate-pulse>div:last-child{width:16px;height:16px;-webkit-animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-scale;animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-scale}.la-ball-clip-rotate-pulse.la-sm{width:16px;height:16px}.la-ball-clip-rotate-pulse.la-sm>div:first-child{width:16px;height:16px;border-width:1px}.la-ball-clip-rotate-pulse.la-sm>div:last-child{width:8px;height:8px}.la-ball-clip-rotate-pulse.la-2x{width:64px;height:64px}.la-ball-clip-rotate-pulse.la-2x>div:first-child{width:64px;height:64px;border-width:4px}.la-ball-clip-rotate-pulse.la-2x>div:last-child{width:32px;height:32px}.la-ball-clip-rotate-pulse.la-3x{width:96px;height:96px}.la-ball-clip-rotate-pulse.la-3x>div:first-child{width:96px;height:96px;border-width:6px}.la-ball-clip-rotate-pulse.la-3x>div:last-child{width:48px;height:48px}@-webkit-keyframes ball-clip-rotate-pulse-rotate{0%{transform:translate(-50%,-50%) rotate(0)}50%{transform:translate(-50%,-50%) rotate(180deg)}100%{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes ball-clip-rotate-pulse-rotate{0%{transform:translate(-50%,-50%) rotate(0)}50%{transform:translate(-50%,-50%) rotate(180deg)}100%{transform:translate(-50%,-50%) rotate(360deg)}}@-webkit-keyframes ball-clip-rotate-pulse-scale{0%,100%{opacity:1;transform:translate(-50%,-50%) scale(1)}30%{opacity:.3;transform:translate(-50%,-50%) scale(.15)}}@keyframes ball-clip-rotate-pulse-scale{0%,100%{opacity:1;transform:translate(-50%,-50%) scale(1)}30%{opacity:.3;transform:translate(-50%,-50%) scale(.15)}}.la-ball-clip-rotate,.la-ball-clip-rotate>div{position:relative;box-sizing:border-box}.la-ball-clip-rotate{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-clip-rotate.la-dark{color:#333}.la-ball-clip-rotate>div{display:inline-block;float:none;border:2px solid currentColor;width:32px;height:32px;background:0 0;border-bottom-color:transparent;border-radius:100%;-webkit-animation:.75s linear infinite ball-clip-rotate;animation:.75s linear infinite ball-clip-rotate}.la-ball-clip-rotate.la-sm{width:16px;height:16px}.la-ball-clip-rotate.la-sm>div{width:16px;height:16px;border-width:1px}.la-ball-clip-rotate.la-2x{width:64px;height:64px}.la-ball-clip-rotate.la-2x>div{width:64px;height:64px;border-width:4px}.la-ball-clip-rotate.la-3x{width:96px;height:96px}.la-ball-clip-rotate.la-3x>div{width:96px;height:96px;border-width:6px}@-webkit-keyframes ball-clip-rotate{0%{transform:rotate(0)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}@keyframes ball-clip-rotate{0%{transform:rotate(0)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}.la-ball-elastic-dots,.la-ball-elastic-dots>div{position:relative;box-sizing:border-box}.la-ball-elastic-dots{display:block;color:#fff;width:120px;height:10px;font-size:0;text-align:center}.la-ball-elastic-dots.la-dark{color:#333}.la-ball-elastic-dots>div{float:none;background-color:currentColor;border:0 solid currentColor;display:inline-block;width:10px;height:10px;white-space:nowrap;border-radius:100%;-webkit-animation:1s infinite ball-elastic-dots-anim;animation:1s infinite ball-elastic-dots-anim}.la-ball-elastic-dots.la-sm{width:60px;height:4px}.la-ball-elastic-dots.la-sm>div{width:4px;height:4px}.la-ball-elastic-dots.la-2x{width:240px;height:20px}.la-ball-elastic-dots.la-2x>div{width:20px;height:20px}.la-ball-elastic-dots.la-3x{width:360px;height:30px}.la-ball-elastic-dots.la-3x>div{width:30px;height:30px}@-webkit-keyframes ball-elastic-dots-anim{0%,100%{margin:0;transform:scale(1)}50%{margin:0 5%;transform:scale(.65)}}@keyframes ball-elastic-dots-anim{0%,100%{margin:0;transform:scale(1)}50%{margin:0 5%;transform:scale(.65)}}.la-ball-fall,.la-ball-fall>div{position:relative;box-sizing:border-box}.la-ball-fall{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-fall.la-dark{color:#333}.la-ball-fall>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;opacity:0;-webkit-animation:1s ease-in-out infinite ball-fall;animation:1s ease-in-out infinite ball-fall}.la-ball-fall>div:nth-child(1){-webkit-animation-delay:-.2s;animation-delay:-.2s}.la-ball-fall>div:nth-child(2){-webkit-animation-delay:-.1s;animation-delay:-.1s}.la-ball-fall>div:nth-child(3){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-fall.la-sm{width:26px;height:8px}.la-ball-fall.la-sm>div{width:4px;height:4px;margin:2px}.la-ball-fall.la-2x{width:108px;height:36px}.la-ball-fall.la-2x>div{width:20px;height:20px;margin:8px}.la-ball-fall.la-3x{width:162px;height:54px}.la-ball-fall.la-3x>div{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-fall{0%{opacity:0;transform:translateY(-145%)}10%,90%{opacity:.5}20%,80%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(145%)}}@keyframes ball-fall{0%{opacity:0;transform:translateY(-145%)}10%,90%{opacity:.5}20%,80%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(145%)}}.la-ball-fussion,.la-ball-fussion>div{position:relative;box-sizing:border-box}.la-ball-fussion{display:block;font-size:0;color:#fff;width:8px;height:8px}.la-ball-fussion.la-dark{color:#333}.la-ball-fussion>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:12px;height:12px;border-radius:100%;transform:translate(-50%,-50%);-webkit-animation:1s infinite ball-fussion-ball1;animation:1s infinite ball-fussion-ball1}.la-ball-fussion>div:nth-child(1){top:0;left:50%;z-index:1}.la-ball-fussion>div:nth-child(2){top:50%;left:100%;z-index:2;-webkit-animation-name:ball-fussion-ball2;animation-name:ball-fussion-ball2}.la-ball-fussion>div:nth-child(3){top:100%;left:50%;z-index:1;-webkit-animation-name:ball-fussion-ball3;animation-name:ball-fussion-ball3}.la-ball-fussion>div:nth-child(4){top:50%;left:0;z-index:2;-webkit-animation-name:ball-fussion-ball4;animation-name:ball-fussion-ball4}.la-ball-fussion.la-sm{width:4px;height:4px}.la-ball-fussion.la-sm>div{width:6px;height:6px}.la-ball-fussion.la-2x{width:16px;height:16px}.la-ball-fussion.la-2x>div,.la-ball-fussion.la-3x{width:24px;height:24px}.la-ball-fussion.la-3x>div{width:36px;height:36px}@-webkit-keyframes ball-fussion-ball1{0%{opacity:.35}50%{top:-100%;left:200%;opacity:1}100%{top:50%;left:100%;z-index:2;opacity:.35}}@keyframes ball-fussion-ball1{0%{opacity:.35}50%{top:-100%;left:200%;opacity:1}100%{top:50%;left:100%;z-index:2;opacity:.35}}@-webkit-keyframes ball-fussion-ball2{0%{opacity:.35}50%{top:200%;left:200%;opacity:1}100%{top:100%;left:50%;z-index:1;opacity:.35}}@keyframes ball-fussion-ball2{0%{opacity:.35}50%{top:200%;left:200%;opacity:1}100%{top:100%;left:50%;z-index:1;opacity:.35}}@-webkit-keyframes ball-fussion-ball3{0%{opacity:.35}50%{top:200%;left:-100%;opacity:1}100%{top:50%;left:0;z-index:2;opacity:.35}}@keyframes ball-fussion-ball3{0%{opacity:.35}50%{top:200%;left:-100%;opacity:1}100%{top:50%;left:0;z-index:2;opacity:.35}}@-webkit-keyframes ball-fussion-ball4{0%{opacity:.35}50%{top:-100%;left:-100%;opacity:1}100%{top:0;left:50%;z-index:1;opacity:.35}}@keyframes ball-fussion-ball4{0%{opacity:.35}50%{top:-100%;left:-100%;opacity:1}100%{top:0;left:50%;z-index:1;opacity:.35}}.la-ball-grid-beat,.la-ball-grid-beat>div{position:relative;box-sizing:border-box}.la-ball-grid-beat{display:block;font-size:0;color:#fff;width:36px;height:36px}.la-ball-grid-beat.la-dark{color:#333}.la-ball-grid-beat>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:8px;height:8px;margin:2px;border-radius:100%;-webkit-animation-name:ball-grid-beat;animation-name:ball-grid-beat;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.la-ball-grid-beat>div:nth-child(1){-webkit-animation-duration:.65s;animation-duration:.65s;-webkit-animation-delay:.03s;animation-delay:.03s}.la-ball-grid-beat>div:nth-child(2){-webkit-animation-duration:1.02s;animation-duration:1.02s;-webkit-animation-delay:.09s;animation-delay:.09s}.la-ball-grid-beat>div:nth-child(3){-webkit-animation-duration:1.06s;animation-duration:1.06s;-webkit-animation-delay:-.69s;animation-delay:-.69s}.la-ball-grid-beat>div:nth-child(4){-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-delay:-.41s;animation-delay:-.41s}.la-ball-grid-beat>div:nth-child(5){-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-delay:.04s;animation-delay:.04s}.la-ball-grid-beat>div:nth-child(6){-webkit-animation-duration:.84s;animation-duration:.84s;-webkit-animation-delay:.07s;animation-delay:.07s}.la-ball-grid-beat>div:nth-child(7){-webkit-animation-duration:.68s;animation-duration:.68s;-webkit-animation-delay:-.66s;animation-delay:-.66s}.la-ball-grid-beat>div:nth-child(8){-webkit-animation-duration:.93s;animation-duration:.93s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-beat>div:nth-child(9){-webkit-animation-duration:1.24s;animation-duration:1.24s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-beat.la-sm{width:18px;height:18px}.la-ball-grid-beat.la-sm>div{width:4px;height:4px;margin:1px}.la-ball-grid-beat.la-2x{width:72px;height:72px}.la-ball-grid-beat.la-2x>div{width:16px;height:16px;margin:4px}.la-ball-grid-beat.la-3x{width:108px;height:108px}.la-ball-grid-beat.la-3x>div{width:24px;height:24px;margin:6px}@-webkit-keyframes ball-grid-beat{0%,100%{opacity:1}50%{opacity:.35}}@keyframes ball-grid-beat{0%,100%{opacity:1}50%{opacity:.35}}.la-ball-grid-pulse,.la-ball-grid-pulse>div{position:relative;box-sizing:border-box}.la-ball-grid-pulse{display:block;font-size:0;color:#fff;width:36px;height:36px}.la-ball-grid-pulse.la-dark{color:#333}.la-ball-grid-pulse>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:8px;height:8px;margin:2px;border-radius:100%;-webkit-animation-name:ball-grid-pulse;animation-name:ball-grid-pulse;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.la-ball-grid-pulse>div:nth-child(1){-webkit-animation-duration:.65s;animation-duration:.65s;-webkit-animation-delay:.03s;animation-delay:.03s}.la-ball-grid-pulse>div:nth-child(2){-webkit-animation-duration:1.02s;animation-duration:1.02s;-webkit-animation-delay:.09s;animation-delay:.09s}.la-ball-grid-pulse>div:nth-child(3){-webkit-animation-duration:1.06s;animation-duration:1.06s;-webkit-animation-delay:-.69s;animation-delay:-.69s}.la-ball-grid-pulse>div:nth-child(4){-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-delay:-.41s;animation-delay:-.41s}.la-ball-grid-pulse>div:nth-child(5){-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-delay:.04s;animation-delay:.04s}.la-ball-grid-pulse>div:nth-child(6){-webkit-animation-duration:.84s;animation-duration:.84s;-webkit-animation-delay:.07s;animation-delay:.07s}.la-ball-grid-pulse>div:nth-child(7){-webkit-animation-duration:.68s;animation-duration:.68s;-webkit-animation-delay:-.66s;animation-delay:-.66s}.la-ball-grid-pulse>div:nth-child(8){-webkit-animation-duration:.93s;animation-duration:.93s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-pulse>div:nth-child(9){-webkit-animation-duration:1.24s;animation-duration:1.24s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-pulse.la-sm{width:18px;height:18px}.la-ball-grid-pulse.la-sm>div{width:4px;height:4px;margin:1px}.la-ball-grid-pulse.la-2x{width:72px;height:72px}.la-ball-grid-pulse.la-2x>div{width:16px;height:16px;margin:4px}.la-ball-grid-pulse.la-3x{width:108px;height:108px}.la-ball-grid-pulse.la-3x>div{width:24px;height:24px;margin:6px}@-webkit-keyframes ball-grid-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.45)}}@keyframes ball-grid-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.45)}}.la-ball-newton-cradle,.la-ball-newton-cradle>div{position:relative;box-sizing:border-box}.la-ball-newton-cradle{display:block;font-size:0;color:#fff;width:40px;height:10px}.la-ball-newton-cradle.la-dark{color:#333}.la-ball-newton-cradle>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;border-radius:100%}.la-ball-newton-cradle>div:first-child{transform:translateX(0);-webkit-animation:1s ease-out infinite ball-newton-cradle-left;animation:1s ease-out infinite ball-newton-cradle-left}.la-ball-newton-cradle>div:last-child{transform:translateX(0);-webkit-animation:1s ease-out infinite ball-newton-cradle-right;animation:1s ease-out infinite ball-newton-cradle-right}.la-ball-newton-cradle.la-sm{width:20px;height:4px}.la-ball-newton-cradle.la-sm>div{width:4px;height:4px}.la-ball-newton-cradle.la-2x{width:80px;height:20px}.la-ball-newton-cradle.la-2x>div{width:20px;height:20px}.la-ball-newton-cradle.la-3x{width:120px;height:30px}.la-ball-newton-cradle.la-3x>div{width:30px;height:30px}@-webkit-keyframes ball-newton-cradle-left{25%{transform:translateX(-100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{transform:translateX(0)}}@keyframes ball-newton-cradle-left{25%{transform:translateX(-100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{transform:translateX(0)}}@-webkit-keyframes ball-newton-cradle-right{100%,50%{transform:translateX(0)}75%{transform:translateX(100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}@keyframes ball-newton-cradle-right{100%,50%{transform:translateX(0)}75%{transform:translateX(100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}.la-ball-pulse-rise,.la-ball-pulse-rise>div{position:relative;box-sizing:border-box}.la-ball-pulse-rise{display:block;font-size:0;color:#fff;width:70px;height:14px}.la-ball-pulse-rise.la-dark{color:#333}.la-ball-pulse-rise>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:2px;border-radius:100%;-webkit-animation:1s cubic-bezier(.15,.36,.9,.6) infinite ball-pulse-rise-even;animation:1s cubic-bezier(.15,.36,.9,.6) infinite ball-pulse-rise-even}.la-ball-pulse-rise>div:nth-child(2n-1){-webkit-animation-name:ball-pulse-rise-odd;animation-name:ball-pulse-rise-odd}.la-ball-pulse-rise.la-sm{width:34px;height:6px}.la-ball-pulse-rise.la-sm>div{width:4px;height:4px;margin:1px}.la-ball-pulse-rise.la-2x{width:140px;height:28px}.la-ball-pulse-rise.la-2x>div{width:20px;height:20px;margin:4px}.la-ball-pulse-rise.la-3x{width:210px;height:42px}.la-ball-pulse-rise.la-3x>div{width:30px;height:30px;margin:6px}@-webkit-keyframes ball-pulse-rise-even{0%{opacity:1;transform:scale(1.1)}25%{transform:translateY(-200%)}50%{opacity:.35;transform:scale(.3)}75%{transform:translateY(200%)}100%{opacity:1;transform:translateY(0);transform:scale(1)}}@keyframes ball-pulse-rise-even{0%{opacity:1;transform:scale(1.1)}25%{transform:translateY(-200%)}50%{opacity:.35;transform:scale(.3)}75%{transform:translateY(200%)}100%{opacity:1;transform:translateY(0);transform:scale(1)}}@-webkit-keyframes ball-pulse-rise-odd{0%{opacity:.35;transform:scale(.4)}25%{transform:translateY(200%)}50%{opacity:1;transform:scale(1.1)}75%{transform:translateY(-200%)}100%{opacity:.35;transform:translateY(0);transform:scale(.75)}}@keyframes ball-pulse-rise-odd{0%{opacity:.35;transform:scale(.4)}25%{transform:translateY(200%)}50%{opacity:1;transform:scale(1.1)}75%{transform:translateY(-200%)}100%{opacity:.35;transform:translateY(0);transform:scale(.75)}}.la-ball-pulse-sync,.la-ball-pulse-sync>div{position:relative;box-sizing:border-box}.la-ball-pulse-sync{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-pulse-sync.la-dark{color:#333}.la-ball-pulse-sync>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;-webkit-animation:.6s ease-in-out infinite ball-pulse-sync;animation:.6s ease-in-out infinite ball-pulse-sync}.la-ball-pulse-sync>div:nth-child(1){-webkit-animation-delay:-.14s;animation-delay:-.14s}.la-ball-pulse-sync>div:nth-child(2){-webkit-animation-delay:-.07s;animation-delay:-.07s}.la-ball-pulse-sync>div:nth-child(3){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-pulse-sync.la-sm{width:26px;height:8px}.la-ball-pulse-sync.la-sm>div{width:4px;height:4px;margin:2px}.la-ball-pulse-sync.la-2x{width:108px;height:36px}.la-ball-pulse-sync.la-2x>div{width:20px;height:20px;margin:8px}.la-ball-pulse-sync.la-3x{width:162px;height:54px}.la-ball-pulse-sync.la-3x>div{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-pulse-sync{33%{transform:translateY(100%)}66%{transform:translateY(-100%)}100%{transform:translateY(0)}}@keyframes ball-pulse-sync{33%{transform:translateY(100%)}66%{transform:translateY(-100%)}100%{transform:translateY(0)}}.la-ball-pulse,.la-ball-pulse>div{position:relative;box-sizing:border-box}.la-ball-pulse{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-pulse.la-dark{color:#333}.la-ball-pulse>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;-webkit-animation:1s infinite ball-pulse;animation:1s infinite ball-pulse}.la-ball-pulse>div:nth-child(1){-webkit-animation-delay:-.2s;animation-delay:-.2s}.la-ball-pulse>div:nth-child(2){-webkit-animation-delay:-.1s;animation-delay:-.1s}.la-ball-pulse>div:nth-child(3){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-pulse.la-sm{width:26px;height:8px}.la-ball-pulse.la-sm>div{width:4px;height:4px;margin:2px}.la-ball-pulse.la-2x{width:108px;height:36px}.la-ball-pulse.la-2x>div{width:20px;height:20px;margin:8px}.la-ball-pulse.la-3x{width:162px;height:54px}.la-ball-pulse.la-3x>div{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-pulse{0%,100%,60%{opacity:1;transform:scale(1)}30%{opacity:.1;transform:scale(.01)}}@keyframes ball-pulse{0%,100%,60%{opacity:1;transform:scale(1)}30%{opacity:.1;transform:scale(.01)}}.la-ball-rotate,.la-ball-rotate>div{position:relative;box-sizing:border-box}.la-ball-rotate{display:block;font-size:0;color:#fff;width:10px;height:10px}.la-ball-rotate.la-dark{color:#333}.la-ball-rotate>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;border-radius:100%;-webkit-animation:1s cubic-bezier(.7,-.13,.22,.86) infinite ball-rotate-animation;animation:1s cubic-bezier(.7,-.13,.22,.86) infinite ball-rotate-animation}.la-ball-rotate>div:after,.la-ball-rotate>div:before{position:absolute;width:inherit;height:inherit;margin:inherit;content:\"\";background:currentColor;border-radius:inherit;opacity:.8}.la-ball-rotate>div:before{top:0;left:-150%}.la-ball-rotate>div:after{top:0;left:150%}.la-ball-rotate.la-sm,.la-ball-rotate.la-sm>div{width:4px;height:4px}.la-ball-rotate.la-2x,.la-ball-rotate.la-2x>div{width:20px;height:20px}.la-ball-rotate.la-3x,.la-ball-rotate.la-3x>div{width:30px;height:30px}@-webkit-keyframes ball-rotate-animation{0%{transform:rotate(0)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}@keyframes ball-rotate-animation{0%{transform:rotate(0)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}.la-ball-running-dots,.la-ball-running-dots>div{position:relative;box-sizing:border-box}.la-ball-running-dots{display:block;font-size:0;color:#fff;width:10px;height:10px}.la-ball-running-dots.la-dark{color:#333}.la-ball-running-dots>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:10px;height:10px;margin-left:-25px;border-radius:100%;-webkit-animation:2s linear infinite ball-running-dots-animate;animation:2s linear infinite ball-running-dots-animate}.la-ball-running-dots>div:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-running-dots>div:nth-child(2){-webkit-animation-delay:-.4s;animation-delay:-.4s}.la-ball-running-dots>div:nth-child(3){-webkit-animation-delay:-.8s;animation-delay:-.8s}.la-ball-running-dots>div:nth-child(4){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.la-ball-running-dots>div:nth-child(5){-webkit-animation-delay:-1.6s;animation-delay:-1.6s}.la-ball-running-dots>div:nth-child(6){-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-running-dots>div:nth-child(7){-webkit-animation-delay:-2.4s;animation-delay:-2.4s}.la-ball-running-dots>div:nth-child(8){-webkit-animation-delay:-2.8s;animation-delay:-2.8s}.la-ball-running-dots>div:nth-child(9){-webkit-animation-delay:-3.2s;animation-delay:-3.2s}.la-ball-running-dots>div:nth-child(10){-webkit-animation-delay:-3.6s;animation-delay:-3.6s}.la-ball-running-dots.la-sm{width:4px;height:4px}.la-ball-running-dots.la-sm>div{width:4px;height:4px;margin-left:-12px}.la-ball-running-dots.la-2x{width:20px;height:20px}.la-ball-running-dots.la-2x>div{width:20px;height:20px;margin-left:-50px}.la-ball-running-dots.la-3x{width:30px;height:30px}.la-ball-running-dots.la-3x>div{width:30px;height:30px;margin-left:-75px}@-webkit-keyframes ball-running-dots-animate{0%,100%{width:100%;height:100%;transform:translateY(0) translateX(500%)}80%{transform:translateY(0) translateX(0)}85%{width:100%;height:100%;transform:translateY(-125%) translateX(0)}90%{width:200%;height:75%}95%{width:100%;height:100%;transform:translateY(-100%) translateX(500%)}}@keyframes ball-running-dots-animate{0%,100%{width:100%;height:100%;transform:translateY(0) translateX(500%)}80%{transform:translateY(0) translateX(0)}85%{width:100%;height:100%;transform:translateY(-125%) translateX(0)}90%{width:200%;height:75%}95%{width:100%;height:100%;transform:translateY(-100%) translateX(500%)}}.la-ball-scale-multiple,.la-ball-scale-multiple>div{position:relative;box-sizing:border-box}.la-ball-scale-multiple{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-multiple.la-dark{color:#333}.la-ball-scale-multiple>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:32px;height:32px;border-radius:100%;opacity:0;-webkit-animation:1s linear infinite ball-scale-multiple;animation:1s linear infinite ball-scale-multiple}.la-ball-scale-multiple>div:nth-child(2){-webkit-animation-delay:.2s;animation-delay:.2s}.la-ball-scale-multiple>div:nth-child(3){-webkit-animation-delay:.4s;animation-delay:.4s}.la-ball-scale-multiple.la-sm,.la-ball-scale-multiple.la-sm>div{width:16px;height:16px}.la-ball-scale-multiple.la-2x,.la-ball-scale-multiple.la-2x>div{width:64px;height:64px}.la-ball-scale-multiple.la-3x,.la-ball-scale-multiple.la-3x>div{width:96px;height:96px}@-webkit-keyframes ball-scale-multiple{0%{opacity:0;transform:scale(0)}5%{opacity:.75}100%{opacity:0;transform:scale(1)}}@keyframes ball-scale-multiple{0%{opacity:0;transform:scale(0)}5%{opacity:.75}100%{opacity:0;transform:scale(1)}}.la-ball-scale-pulse,.la-ball-scale-pulse>div{position:relative;box-sizing:border-box}.la-ball-scale-pulse{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-pulse.la-dark{color:#333}.la-ball-scale-pulse>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:32px;height:32px;border-radius:100%;opacity:.5;-webkit-animation:2s ease-in-out infinite ball-scale-pulse;animation:2s ease-in-out infinite ball-scale-pulse}.la-ball-scale-pulse>div:last-child{-webkit-animation-delay:-1s;animation-delay:-1s}.la-ball-scale-pulse.la-sm,.la-ball-scale-pulse.la-sm>div{width:16px;height:16px}.la-ball-scale-pulse.la-2x,.la-ball-scale-pulse.la-2x>div{width:64px;height:64px}.la-ball-scale-pulse.la-3x,.la-ball-scale-pulse.la-3x>div{width:96px;height:96px}@-webkit-keyframes ball-scale-pulse{0%,100%{transform:scale(0)}50%{transform:scale(1)}}@keyframes ball-scale-pulse{0%,100%{transform:scale(0)}50%{transform:scale(1)}}.la-ball-scale-ripple-multiple,.la-ball-scale-ripple-multiple>div{position:relative;box-sizing:border-box}.la-ball-scale-ripple-multiple{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-ripple-multiple.la-dark{color:#333}.la-ball-scale-ripple-multiple>div{display:inline-block;float:none;border:2px solid currentColor;position:absolute;top:0;left:0;width:32px;height:32px;background:0 0;border-radius:100%;opacity:0;-webkit-animation:1.25s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple-multiple;animation:1.25s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple-multiple}.la-ball-scale-ripple-multiple>div:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-scale-ripple-multiple>div:nth-child(2){-webkit-animation-delay:.25s;animation-delay:.25s}.la-ball-scale-ripple-multiple>div:nth-child(3){-webkit-animation-delay:.5s;animation-delay:.5s}.la-ball-scale-ripple-multiple.la-sm{width:16px;height:16px}.la-ball-scale-ripple-multiple.la-sm>div{width:16px;height:16px;border-width:1px}.la-ball-scale-ripple-multiple.la-2x{width:64px;height:64px}.la-ball-scale-ripple-multiple.la-2x>div{width:64px;height:64px;border-width:4px}.la-ball-scale-ripple-multiple.la-3x{width:96px;height:96px}.la-ball-scale-ripple-multiple.la-3x>div{width:96px;height:96px;border-width:6px}@-webkit-keyframes ball-scale-ripple-multiple{0%{opacity:1;transform:scale(.1)}70%{opacity:.5;transform:scale(1)}95%{opacity:0}}@keyframes ball-scale-ripple-multiple{0%{opacity:1;transform:scale(.1)}70%{opacity:.5;transform:scale(1)}95%{opacity:0}}.la-ball-scale-ripple,.la-ball-scale-ripple>div{position:relative;box-sizing:border-box}.la-ball-scale-ripple{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-ripple.la-dark{color:#333}.la-ball-scale-ripple>div{display:inline-block;float:none;border:2px solid currentColor;width:32px;height:32px;background:0 0;border-radius:100%;opacity:0;-webkit-animation:1s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple;animation:1s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple}.la-ball-scale-ripple.la-sm{width:16px;height:16px}.la-ball-scale-ripple.la-sm>div{width:16px;height:16px;border-width:1px}.la-ball-scale-ripple.la-2x{width:64px;height:64px}.la-ball-scale-ripple.la-2x>div{width:64px;height:64px;border-width:4px}.la-ball-scale-ripple.la-3x{width:96px;height:96px}.la-ball-scale-ripple.la-3x>div{width:96px;height:96px;border-width:6px}@-webkit-keyframes ball-scale-ripple{0%{opacity:1;transform:scale(.1)}70%{opacity:.65;transform:scale(1)}100%{opacity:0}}@keyframes ball-scale-ripple{0%{opacity:1;transform:scale(.1)}70%{opacity:.65;transform:scale(1)}100%{opacity:0}}.la-ball-scale,.la-ball-scale>div{position:relative;box-sizing:border-box}.la-ball-scale{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale.la-dark{color:#333}.la-ball-scale>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:32px;height:32px;border-radius:100%;opacity:0;-webkit-animation:1s ease-in-out infinite ball-scale;animation:1s ease-in-out infinite ball-scale}.la-ball-scale.la-sm,.la-ball-scale.la-sm>div{width:16px;height:16px}.la-ball-scale.la-2x,.la-ball-scale.la-2x>div{width:64px;height:64px}.la-ball-scale.la-3x,.la-ball-scale.la-3x>div{width:96px;height:96px}@-webkit-keyframes ball-scale{0%{opacity:1;transform:scale(0)}100%{opacity:0;transform:scale(1)}}@keyframes ball-scale{0%{opacity:1;transform:scale(0)}100%{opacity:0;transform:scale(1)}}.la-ball-spin-clockwise-fade-rotating,.la-ball-spin-clockwise-fade-rotating>div{position:relative;box-sizing:border-box}.la-ball-spin-clockwise-fade-rotating{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite ball-spin-clockwise-fade-rotating-rotate;animation:6s linear infinite ball-spin-clockwise-fade-rotating-rotate}.la-ball-spin-clockwise-fade-rotating.la-dark{color:#333}.la-ball-spin-clockwise-fade-rotating>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-clockwise-fade-rotating;animation:1s linear infinite ball-spin-clockwise-fade-rotating}.la-ball-spin-clockwise-fade-rotating>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-spin-clockwise-fade-rotating.la-sm{width:16px;height:16px}.la-ball-spin-clockwise-fade-rotating.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-clockwise-fade-rotating.la-2x{width:64px;height:64px}.la-ball-spin-clockwise-fade-rotating.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-clockwise-fade-rotating.la-3x{width:96px;height:96px}.la-ball-spin-clockwise-fade-rotating.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-clockwise-fade-rotating-rotate{100%{transform:rotate(-360deg)}}@keyframes ball-spin-clockwise-fade-rotating-rotate{100%{transform:rotate(-360deg)}}@-webkit-keyframes ball-spin-clockwise-fade-rotating{50%{opacity:.25;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}@keyframes ball-spin-clockwise-fade-rotating{50%{opacity:.25;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}.la-ball-spin-clockwise-fade,.la-ball-spin-clockwise-fade>div{position:relative;box-sizing:border-box}.la-ball-spin-clockwise-fade{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin-clockwise-fade.la-dark{color:#333}.la-ball-spin-clockwise-fade>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-clockwise-fade;animation:1s linear infinite ball-spin-clockwise-fade}.la-ball-spin-clockwise-fade>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-spin-clockwise-fade>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-spin-clockwise-fade>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-spin-clockwise-fade>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-spin-clockwise-fade>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-spin-clockwise-fade>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-spin-clockwise-fade>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-spin-clockwise-fade>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-spin-clockwise-fade.la-sm{width:16px;height:16px}.la-ball-spin-clockwise-fade.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-clockwise-fade.la-2x{width:64px;height:64px}.la-ball-spin-clockwise-fade.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-clockwise-fade.la-3x{width:96px;height:96px}.la-ball-spin-clockwise-fade.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-clockwise-fade{50%{opacity:.25;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}@keyframes ball-spin-clockwise-fade{50%{opacity:.25;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}.la-ball-spin-clockwise,.la-ball-spin-clockwise>div{position:relative;box-sizing:border-box}.la-ball-spin-clockwise{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin-clockwise.la-dark{color:#333}.la-ball-spin-clockwise>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-spin-clockwise;animation:1s ease-in-out infinite ball-spin-clockwise}.la-ball-spin-clockwise>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-spin-clockwise>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-spin-clockwise>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-spin-clockwise>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-spin-clockwise>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-spin-clockwise>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-spin-clockwise>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-spin-clockwise>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-spin-clockwise.la-sm{width:16px;height:16px}.la-ball-spin-clockwise.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-clockwise.la-2x{width:64px;height:64px}.la-ball-spin-clockwise.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-clockwise.la-3x{width:96px;height:96px}.la-ball-spin-clockwise.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-clockwise{0%,100%{opacity:1;transform:scale(1)}20%{opacity:1}80%{opacity:0;transform:scale(0)}}@keyframes ball-spin-clockwise{0%,100%{opacity:1;transform:scale(1)}20%{opacity:1}80%{opacity:0;transform:scale(0)}}.la-ball-spin-fade-rotating,.la-ball-spin-fade-rotating>div{position:relative;box-sizing:border-box}.la-ball-spin-fade-rotating{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite ball-spin-fade-rotate;animation:6s linear infinite ball-spin-fade-rotate}.la-ball-spin-fade-rotating.la-dark{color:#333}.la-ball-spin-fade-rotating>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-fade;animation:1s linear infinite ball-spin-fade}.la-ball-spin-fade-rotating>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-spin-fade-rotating>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-spin-fade-rotating>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-spin-fade-rotating>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-spin-fade-rotating>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-spin-fade-rotating>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-spin-fade-rotating>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-spin-fade-rotating>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-spin-fade-rotating.la-sm{width:16px;height:16px}.la-ball-spin-fade-rotating.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-fade-rotating.la-2x{width:64px;height:64px}.la-ball-spin-fade-rotating.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-fade-rotating.la-3x{width:96px;height:96px}.la-ball-spin-fade-rotating.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-fade-rotate{100%{transform:rotate(360deg)}}@keyframes ball-spin-fade-rotate{100%{transform:rotate(360deg)}}.la-ball-spin-fade,.la-ball-spin-fade>div{position:relative;box-sizing:border-box}.la-ball-spin-fade{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin-fade.la-dark{color:#333}.la-ball-spin-fade>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-fade;animation:1s linear infinite ball-spin-fade}.la-ball-spin-fade>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-spin-fade>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-spin-fade>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-spin-fade>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-spin-fade>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-spin-fade>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-spin-fade>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-spin-fade>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-spin-fade.la-sm{width:16px;height:16px}.la-ball-spin-fade.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-fade.la-2x{width:64px;height:64px}.la-ball-spin-fade.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-fade.la-3x{width:96px;height:96px}.la-ball-spin-fade.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-fade{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.5)}}@keyframes ball-spin-fade{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.5)}}.la-ball-spin-rotate,.la-ball-spin-rotate>div{position:relative;box-sizing:border-box}.la-ball-spin-rotate{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:2s linear infinite ball-spin-rotate;animation:2s linear infinite ball-spin-rotate}.la-ball-spin-rotate.la-dark{color:#333}.la-ball-spin-rotate>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;width:60%;height:60%;border-radius:100%;-webkit-animation:2s ease-in-out infinite ball-spin-bounce;animation:2s ease-in-out infinite ball-spin-bounce}.la-ball-spin-rotate>div:last-child{top:auto;bottom:0;-webkit-animation-delay:-1s;animation-delay:-1s}.la-ball-spin-rotate.la-sm{width:16px;height:16px}.la-ball-spin-rotate.la-2x{width:64px;height:64px}.la-ball-spin-rotate.la-3x{width:96px;height:96px}@-webkit-keyframes ball-spin-rotate{100%{transform:rotate(360deg)}}@keyframes ball-spin-rotate{100%{transform:rotate(360deg)}}@-webkit-keyframes ball-spin-bounce{0%,100%{transform:scale(0)}50%{transform:scale(1)}}@keyframes ball-spin-bounce{0%,100%{transform:scale(0)}50%{transform:scale(1)}}.la-ball-spin,.la-ball-spin>div{position:relative;box-sizing:border-box}.la-ball-spin{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin.la-dark{color:#333}.la-ball-spin>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-spin;animation:1s ease-in-out infinite ball-spin}.la-ball-spin>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-spin>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-spin>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-spin>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-spin>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-spin>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-spin>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-spin>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-spin.la-sm{width:16px;height:16px}.la-ball-spin.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin.la-2x{width:64px;height:64px}.la-ball-spin.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin.la-3x{width:96px;height:96px}.la-ball-spin.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin{0%,100%{opacity:1;transform:scale(1)}20%{opacity:1}80%{opacity:0;transform:scale(0)}}@keyframes ball-spin{0%,100%{opacity:1;transform:scale(1)}20%{opacity:1}80%{opacity:0;transform:scale(0)}}.la-ball-square-clockwise-spin,.la-ball-square-clockwise-spin>div{position:relative;box-sizing:border-box}.la-ball-square-clockwise-spin{display:block;font-size:0;color:#fff;width:26px;height:26px}.la-ball-square-clockwise-spin.la-dark{color:#333}.la-ball-square-clockwise-spin>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:12px;height:12px;margin-top:-6px;margin-left:-6px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-square-clockwise-spin;animation:1s ease-in-out infinite ball-square-clockwise-spin}.la-ball-square-clockwise-spin>div:nth-child(1){top:0;left:0;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-square-clockwise-spin>div:nth-child(2){top:0;left:50%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-square-clockwise-spin>div:nth-child(3){top:0;left:100%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-square-clockwise-spin>div:nth-child(4){top:50%;left:100%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-square-clockwise-spin>div:nth-child(5){top:100%;left:100%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-square-clockwise-spin>div:nth-child(6){top:100%;left:50%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-square-clockwise-spin>div:nth-child(7){top:100%;left:0;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-square-clockwise-spin>div:nth-child(8){top:50%;left:0;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-square-clockwise-spin.la-sm{width:12px;height:12px}.la-ball-square-clockwise-spin.la-sm>div{width:6px;height:6px;margin-top:-3px;margin-left:-3px}.la-ball-square-clockwise-spin.la-2x{width:52px;height:52px}.la-ball-square-clockwise-spin.la-2x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}.la-ball-square-clockwise-spin.la-3x{width:78px;height:78px}.la-ball-square-clockwise-spin.la-3x>div{width:36px;height:36px;margin-top:-18px;margin-left:-18px}@-webkit-keyframes ball-square-clockwise-spin{0%,100%,40%{transform:scale(.4)}70%{transform:scale(1)}}@keyframes ball-square-clockwise-spin{0%,100%,40%{transform:scale(.4)}70%{transform:scale(1)}}.la-ball-square-spin,.la-ball-square-spin>div{position:relative;box-sizing:border-box}.la-ball-square-spin{display:block;font-size:0;color:#fff;width:26px;height:26px}.la-ball-square-spin.la-dark{color:#333}.la-ball-square-spin>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:12px;height:12px;margin-top:-6px;margin-left:-6px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-square-spin;animation:1s ease-in-out infinite ball-square-spin}.la-ball-square-spin>div:nth-child(1){top:0;left:0;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-square-spin>div:nth-child(2){top:0;left:50%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-square-spin>div:nth-child(3){top:0;left:100%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-square-spin>div:nth-child(4){top:50%;left:100%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-square-spin>div:nth-child(5){top:100%;left:100%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-square-spin>div:nth-child(6){top:100%;left:50%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-square-spin>div:nth-child(7){top:100%;left:0;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-square-spin>div:nth-child(8){top:50%;left:0;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-square-spin.la-sm{width:12px;height:12px}.la-ball-square-spin.la-sm>div{width:6px;height:6px;margin-top:-3px;margin-left:-3px}.la-ball-square-spin.la-2x{width:52px;height:52px}.la-ball-square-spin.la-2x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}.la-ball-square-spin.la-3x{width:78px;height:78px}.la-ball-square-spin.la-3x>div{width:36px;height:36px;margin-top:-18px;margin-left:-18px}@-webkit-keyframes ball-square-spin{0%,100%,40%{transform:scale(.4)}70%{transform:scale(1)}}@keyframes ball-square-spin{0%,100%,40%{transform:scale(.4)}70%{transform:scale(1)}}.la-ball-triangle-path,.la-ball-triangle-path>div{position:relative;box-sizing:border-box}.la-ball-triangle-path{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-triangle-path.la-dark{color:#333}.la-ball-triangle-path>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:10px;height:10px;border-radius:100%}.la-ball-triangle-path>div:nth-child(1){-webkit-animation:2s ease-in-out infinite ball-triangle-path-ball-one;animation:2s ease-in-out infinite ball-triangle-path-ball-one}.la-ball-triangle-path>div:nth-child(2){-webkit-animation:2s ease-in-out infinite ball-triangle-path-ball-two;animation:2s ease-in-out infinite ball-triangle-path-ball-two}.la-ball-triangle-path>div:nth-child(3){-webkit-animation:2s ease-in-out infinite ball-triangle-path-ball-tree;animation:2s ease-in-out infinite ball-triangle-path-ball-tree}.la-ball-triangle-path.la-sm{width:16px;height:16px}.la-ball-triangle-path.la-sm>div{width:4px;height:4px}.la-ball-triangle-path.la-2x{width:64px;height:64px}.la-ball-triangle-path.la-2x>div{width:20px;height:20px}.la-ball-triangle-path.la-3x{width:96px;height:96px}.la-ball-triangle-path.la-3x>div{width:30px;height:30px}@-webkit-keyframes ball-triangle-path-ball-one{0%{transform:translate(0,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(110%,0)}66%{opacity:1;transform:translate(220%,220%)}100%{opacity:1;transform:translate(0,220%)}}@keyframes ball-triangle-path-ball-one{0%{transform:translate(0,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(110%,0)}66%{opacity:1;transform:translate(220%,220%)}100%{opacity:1;transform:translate(0,220%)}}@-webkit-keyframes ball-triangle-path-ball-two{0%{transform:translate(110%,0)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(220%,220%)}66%{opacity:1;transform:translate(0,220%)}100%{opacity:1;transform:translate(110%,0)}}@keyframes ball-triangle-path-ball-two{0%{transform:translate(110%,0)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(220%,220%)}66%{opacity:1;transform:translate(0,220%)}100%{opacity:1;transform:translate(110%,0)}}@-webkit-keyframes ball-triangle-path-ball-tree{0%{transform:translate(220%,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(0,220%)}66%{opacity:1;transform:translate(110%,0)}100%{opacity:1;transform:translate(220%,220%)}}@keyframes ball-triangle-path-ball-tree{0%{transform:translate(220%,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(0,220%)}66%{opacity:1;transform:translate(110%,0)}100%{opacity:1;transform:translate(220%,220%)}}.la-ball-zig-zag-deflect,.la-ball-zig-zag-deflect>div{box-sizing:border-box}.la-ball-zig-zag-deflect{display:block;font-size:0;color:#fff;position:relative;width:32px;height:32px}.la-ball-zig-zag-deflect.la-dark{color:#333}.la-ball-zig-zag-deflect>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:10px;height:10px;margin-top:-5px;margin-left:-5px;border-radius:100%}.la-ball-zig-zag-deflect>div:first-child{-webkit-animation:1.5s linear infinite ball-zig-deflect;animation:1.5s linear infinite ball-zig-deflect}.la-ball-zig-zag-deflect>div:last-child{-webkit-animation:1.5s linear infinite ball-zag-deflect;animation:1.5s linear infinite ball-zag-deflect}.la-ball-zig-zag-deflect.la-sm{width:16px;height:16px}.la-ball-zig-zag-deflect.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-zig-zag-deflect.la-2x{width:64px;height:64px}.la-ball-zig-zag-deflect.la-2x>div{width:20px;height:20px;margin-top:-10px;margin-left:-10px}.la-ball-zig-zag-deflect.la-3x{width:96px;height:96px}.la-ball-zig-zag-deflect.la-3x>div{width:30px;height:30px;margin-top:-15px;margin-left:-15px}@-webkit-keyframes ball-zig-deflect{17%,84%{transform:translate(-80%,-160%)}34%,67%{transform:translate(80%,-160%)}100%,50%{transform:translate(0,0)}}@keyframes ball-zig-deflect{17%,84%{transform:translate(-80%,-160%)}34%,67%{transform:translate(80%,-160%)}100%,50%{transform:translate(0,0)}}@-webkit-keyframes ball-zag-deflect{17%,84%{transform:translate(80%,160%)}34%,67%{transform:translate(-80%,160%)}100%,50%{transform:translate(0,0)}}@keyframes ball-zag-deflect{17%,84%{transform:translate(80%,160%)}34%,67%{transform:translate(-80%,160%)}100%,50%{transform:translate(0,0)}}.la-ball-zig-zag,.la-ball-zig-zag>div{box-sizing:border-box}.la-ball-zig-zag{display:block;font-size:0;color:#fff;position:relative;width:32px;height:32px}.la-ball-zig-zag.la-dark{color:#333}.la-ball-zig-zag>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:10px;height:10px;margin-top:-5px;margin-left:-5px;border-radius:100%}.la-ball-zig-zag>div:first-child{-webkit-animation:.7s linear infinite ball-zig-effect;animation:.7s linear infinite ball-zig-effect}.la-ball-zig-zag>div:last-child{-webkit-animation:.7s linear infinite ball-zag-effect;animation:.7s linear infinite ball-zag-effect}.la-ball-zig-zag.la-sm{width:16px;height:16px}.la-ball-zig-zag.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-zig-zag.la-2x{width:64px;height:64px}.la-ball-zig-zag.la-2x>div{width:20px;height:20px;margin-top:-10px;margin-left:-10px}.la-ball-zig-zag.la-3x{width:96px;height:96px}.la-ball-zig-zag.la-3x>div{width:30px;height:30px;margin-top:-15px;margin-left:-15px}@-webkit-keyframes ball-zig-effect{0%,100%{transform:translate(0,0)}33%{transform:translate(-75%,-150%)}66%{transform:translate(75%,-150%)}}@keyframes ball-zig-effect{0%,100%{transform:translate(0,0)}33%{transform:translate(-75%,-150%)}66%{transform:translate(75%,-150%)}}@-webkit-keyframes ball-zag-effect{0%,100%{transform:translate(0,0)}33%{transform:translate(75%,150%)}66%{transform:translate(-75%,150%)}}@keyframes ball-zag-effect{0%,100%{transform:translate(0,0)}33%{transform:translate(75%,150%)}66%{transform:translate(-75%,150%)}}.la-cog,.la-cog>div{position:relative;box-sizing:border-box}.la-cog{display:block;font-size:0;color:#fff;width:31px;height:31px}.la-cog.la-dark{color:#333}.la-cog>div{display:inline-block;float:none;border:2px dashed currentColor;width:100%;height:100%;background-color:transparent;border-radius:100%;-webkit-animation:4s linear infinite cog-rotate;animation:4s linear infinite cog-rotate}.la-cog>div:after{position:absolute;top:0;left:0;width:100%;height:100%;content:\"\";border:2px solid currentColor;border-radius:100%}.la-cog.la-sm{width:15px;height:15px}.la-cog.la-sm>div,.la-cog.la-sm>div:after{border-width:1px}.la-cog.la-2x{width:61px;height:61px}.la-cog.la-2x>div,.la-cog.la-2x>div:after{border-width:4px}.la-cog.la-3x{width:91px;height:91px}.la-cog.la-3x>div,.la-cog.la-3x>div:after{border-width:6px}@-webkit-keyframes cog-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes cog-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.la-cube-transition,.la-cube-transition>div{position:relative;box-sizing:border-box}.la-cube-transition{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-cube-transition.la-dark{color:#333}.la-cube-transition>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:14px;height:14px;margin-top:-7px;margin-left:-7px;border-radius:0;-webkit-animation:1.6s ease-in-out infinite cube-transition;animation:1.6s ease-in-out infinite cube-transition}.la-cube-transition>div:last-child{-webkit-animation-delay:-.8s;animation-delay:-.8s}.la-cube-transition.la-sm{width:16px;height:16px}.la-cube-transition.la-sm>div{width:6px;height:6px;margin-top:-3px;margin-left:-3px}.la-cube-transition.la-2x{width:64px;height:64px}.la-cube-transition.la-2x>div{width:28px;height:28px;margin-top:-14px;margin-left:-14px}.la-cube-transition.la-3x{width:96px;height:96px}.la-cube-transition.la-3x>div{width:42px;height:42px;margin-top:-21px;margin-left:-21px}@-webkit-keyframes cube-transition{25%{top:0;left:100%;transform:scale(.5) rotate(-90deg)}50%{top:100%;left:100%;transform:scale(1) rotate(-180deg)}75%{top:100%;left:0;transform:scale(.5) rotate(-270deg)}100%{top:0;left:0;transform:scale(1) rotate(-360deg)}}@keyframes cube-transition{25%{top:0;left:100%;transform:scale(.5) rotate(-90deg)}50%{top:100%;left:100%;transform:scale(1) rotate(-180deg)}75%{top:100%;left:0;transform:scale(.5) rotate(-270deg)}100%{top:0;left:0;transform:scale(1) rotate(-360deg)}}.la-fire,.la-fire>div{position:relative;box-sizing:border-box}.la-fire{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-fire.la-dark{color:#333}.la-fire>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;bottom:0;left:50%;width:12px;height:12px;border-radius:2px;transform:translateY(0) translateX(-50%) rotate(45deg) scale(0);-webkit-animation:1.5s linear infinite fire-diamonds;animation:1.5s linear infinite fire-diamonds}.la-fire>div:nth-child(1){-webkit-animation-delay:-.85s;animation-delay:-.85s}.la-fire>div:nth-child(2){-webkit-animation-delay:-1.85s;animation-delay:-1.85s}.la-fire>div:nth-child(3){-webkit-animation-delay:-2.85s;animation-delay:-2.85s}.la-fire.la-sm{width:16px;height:16px}.la-fire.la-sm>div{width:6px;height:6px}.la-fire.la-2x{width:64px;height:64px}.la-fire.la-2x>div{width:24px;height:24px}.la-fire.la-3x{width:96px;height:96px}.la-fire.la-3x>div{width:36px;height:36px}@-webkit-keyframes fire-diamonds{0%{transform:translateY(75%) translateX(-50%) rotate(45deg) scale(0)}50%{transform:translateY(-87.5%) translateX(-50%) rotate(45deg) scale(1)}100%{transform:translateY(-212.5%) translateX(-50%) rotate(45deg) scale(0)}}@keyframes fire-diamonds{0%{transform:translateY(75%) translateX(-50%) rotate(45deg) scale(0)}50%{transform:translateY(-87.5%) translateX(-50%) rotate(45deg) scale(1)}100%{transform:translateY(-212.5%) translateX(-50%) rotate(45deg) scale(0)}}.la-line-scale-party,.la-line-scale-party>div{position:relative;box-sizing:border-box}.la-line-scale-party{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale-party.la-dark{color:#333}.la-line-scale-party>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation-name:line-scale-party;animation-name:line-scale-party;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.la-line-scale-party>div:nth-child(1){-webkit-animation-duration:.43s;animation-duration:.43s;-webkit-animation-delay:-.23s;animation-delay:-.23s}.la-line-scale-party>div:nth-child(2){-webkit-animation-duration:.62s;animation-duration:.62s;-webkit-animation-delay:-.32s;animation-delay:-.32s}.la-line-scale-party>div:nth-child(3){-webkit-animation-duration:.43s;animation-duration:.43s;-webkit-animation-delay:-.44s;animation-delay:-.44s}.la-line-scale-party>div:nth-child(4){-webkit-animation-duration:.8s;animation-duration:.8s;-webkit-animation-delay:-.31s;animation-delay:-.31s}.la-line-scale-party>div:nth-child(5){-webkit-animation-duration:.74s;animation-duration:.74s;-webkit-animation-delay:-.24s;animation-delay:-.24s}.la-line-scale-party.la-sm{width:20px;height:16px}.la-line-scale-party.la-sm>div{width:2px;height:16px;margin:0 1px}.la-line-scale-party.la-2x{width:80px;height:64px}.la-line-scale-party.la-2x>div{width:8px;height:64px;margin:0 4px}.la-line-scale-party.la-3x{width:120px;height:96px}.la-line-scale-party.la-3x>div{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale-party{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.3)}}@keyframes line-scale-party{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.3)}}.la-line-scale-pulse-out-rapid,.la-line-scale-pulse-out-rapid>div{position:relative;box-sizing:border-box}.la-line-scale-pulse-out-rapid{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale-pulse-out-rapid.la-dark{color:#333}.la-line-scale-pulse-out-rapid>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation:.9s cubic-bezier(.11,.49,.38,.78) infinite line-scale-pulse-out-rapid;animation:.9s cubic-bezier(.11,.49,.38,.78) infinite line-scale-pulse-out-rapid}.la-line-scale-pulse-out-rapid>div:nth-child(3){-webkit-animation-delay:-.9s;animation-delay:-.9s}.la-line-scale-pulse-out-rapid>div:nth-child(2),.la-line-scale-pulse-out-rapid>div:nth-child(4){-webkit-animation-delay:-.65s;animation-delay:-.65s}.la-line-scale-pulse-out-rapid>div:nth-child(1),.la-line-scale-pulse-out-rapid>div:nth-child(5){-webkit-animation-delay:-.4s;animation-delay:-.4s}.la-line-scale-pulse-out-rapid.la-sm{width:20px;height:16px}.la-line-scale-pulse-out-rapid.la-sm>div{width:2px;height:16px;margin:0 1px}.la-line-scale-pulse-out-rapid.la-2x{width:80px;height:64px}.la-line-scale-pulse-out-rapid.la-2x>div{width:8px;height:64px;margin:0 4px}.la-line-scale-pulse-out-rapid.la-3x{width:120px;height:96px}.la-line-scale-pulse-out-rapid.la-3x>div{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale-pulse-out-rapid{0%,90%{transform:scaley(1)}80%{transform:scaley(.3)}}@keyframes line-scale-pulse-out-rapid{0%,90%{transform:scaley(1)}80%{transform:scaley(.3)}}.la-line-scale-pulse-out,.la-line-scale-pulse-out>div{position:relative;box-sizing:border-box}.la-line-scale-pulse-out{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale-pulse-out.la-dark{color:#333}.la-line-scale-pulse-out>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation:.9s cubic-bezier(.85,.25,.37,.85) infinite line-scale-pulse-out;animation:.9s cubic-bezier(.85,.25,.37,.85) infinite line-scale-pulse-out}.la-line-scale-pulse-out>div:nth-child(3){-webkit-animation-delay:-.9s;animation-delay:-.9s}.la-line-scale-pulse-out>div:nth-child(2),.la-line-scale-pulse-out>div:nth-child(4){-webkit-animation-delay:-.7s;animation-delay:-.7s}.la-line-scale-pulse-out>div:nth-child(1),.la-line-scale-pulse-out>div:nth-child(5){-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-line-scale-pulse-out.la-sm{width:20px;height:16px}.la-line-scale-pulse-out.la-sm>div{width:2px;height:16px;margin:0 1px}.la-line-scale-pulse-out.la-2x{width:80px;height:64px}.la-line-scale-pulse-out.la-2x>div{width:8px;height:64px;margin:0 4px}.la-line-scale-pulse-out.la-3x{width:120px;height:96px}.la-line-scale-pulse-out.la-3x>div{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale-pulse-out{0%,100%{transform:scaley(1)}50%{transform:scaley(.3)}}@keyframes line-scale-pulse-out{0%,100%{transform:scaley(1)}50%{transform:scaley(.3)}}.la-line-scale,.la-line-scale>div{position:relative;box-sizing:border-box}.la-line-scale{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale.la-dark{color:#333}.la-line-scale>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation:1.2s infinite line-scale;animation:1.2s infinite line-scale}.la-line-scale>div:nth-child(1){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.la-line-scale>div:nth-child(2){-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.la-line-scale>div:nth-child(3){-webkit-animation-delay:-1s;animation-delay:-1s}.la-line-scale>div:nth-child(4){-webkit-animation-delay:-.9s;animation-delay:-.9s}.la-line-scale>div:nth-child(5){-webkit-animation-delay:-.8s;animation-delay:-.8s}.la-line-scale.la-sm{width:20px;height:16px}.la-line-scale.la-sm>div{width:2px;height:16px;margin:0 1px}.la-line-scale.la-2x{width:80px;height:64px}.la-line-scale.la-2x>div{width:8px;height:64px;margin:0 4px}.la-line-scale.la-3x{width:120px;height:96px}.la-line-scale.la-3x>div{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale{0%,100%,40%{transform:scaleY(.4)}20%{transform:scaleY(1)}}@keyframes line-scale{0%,100%,40%{transform:scaleY(.4)}20%{transform:scaleY(1)}}.la-line-spin-clockwise-fade-rotating,.la-line-spin-clockwise-fade-rotating>div{position:relative;box-sizing:border-box}.la-line-spin-clockwise-fade-rotating{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite line-spin-clockwise-fade-rotating-rotate;animation:6s linear infinite line-spin-clockwise-fade-rotating-rotate}.la-line-spin-clockwise-fade-rotating.la-dark{color:#333}.la-line-spin-clockwise-fade-rotating>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-clockwise-fade-rotating;animation:1s ease-in-out infinite line-spin-clockwise-fade-rotating}.la-line-spin-clockwise-fade-rotating>div:nth-child(1){top:15%;left:50%;transform:rotate(0);-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-line-spin-clockwise-fade-rotating>div:nth-child(2){top:25.2512626585%;left:74.7487373415%;transform:rotate(45deg);-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-line-spin-clockwise-fade-rotating>div:nth-child(3){top:50%;left:85%;transform:rotate(90deg);-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-line-spin-clockwise-fade-rotating>div:nth-child(4){top:74.7487373415%;left:74.7487373415%;transform:rotate(135deg);-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-line-spin-clockwise-fade-rotating>div:nth-child(5){top:84.9999999974%;left:50.0000000004%;transform:rotate(180deg);-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-line-spin-clockwise-fade-rotating>div:nth-child(6){top:74.7487369862%;left:25.2512627193%;transform:rotate(225deg);-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-line-spin-clockwise-fade-rotating>div:nth-child(7){top:49.9999806189%;left:15.0000039834%;transform:rotate(270deg);-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-line-spin-clockwise-fade-rotating>div:nth-child(8){top:25.2506949798%;left:25.2513989292%;transform:rotate(315deg);-webkit-animation-delay:0s;animation-delay:0s}.la-line-spin-clockwise-fade-rotating.la-sm{width:16px;height:16px}.la-line-spin-clockwise-fade-rotating.la-sm>div{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-clockwise-fade-rotating.la-2x{width:64px;height:64px}.la-line-spin-clockwise-fade-rotating.la-2x>div{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-clockwise-fade-rotating.la-3x{width:96px;height:96px}.la-line-spin-clockwise-fade-rotating.la-3x>div{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes line-spin-clockwise-fade-rotating-rotate{100%{transform:rotate(-360deg)}}@keyframes line-spin-clockwise-fade-rotating-rotate{100%{transform:rotate(-360deg)}}@-webkit-keyframes line-spin-clockwise-fade-rotating{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-clockwise-fade-rotating{50%{opacity:.2}100%{opacity:1}}.la-line-spin-clockwise-fade,.la-line-spin-clockwise-fade>div{position:relative;box-sizing:border-box}.la-line-spin-clockwise-fade{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-line-spin-clockwise-fade.la-dark{color:#333}.la-line-spin-clockwise-fade>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-clockwise-fade;animation:1s ease-in-out infinite line-spin-clockwise-fade}.la-line-spin-clockwise-fade>div:nth-child(1){top:15%;left:50%;transform:rotate(0);-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-line-spin-clockwise-fade>div:nth-child(2){top:25.2512626585%;left:74.7487373415%;transform:rotate(45deg);-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-line-spin-clockwise-fade>div:nth-child(3){top:50%;left:85%;transform:rotate(90deg);-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-line-spin-clockwise-fade>div:nth-child(4){top:74.7487373415%;left:74.7487373415%;transform:rotate(135deg);-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-line-spin-clockwise-fade>div:nth-child(5){top:84.9999999974%;left:50.0000000004%;transform:rotate(180deg);-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-line-spin-clockwise-fade>div:nth-child(6){top:74.7487369862%;left:25.2512627193%;transform:rotate(225deg);-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-line-spin-clockwise-fade>div:nth-child(7){top:49.9999806189%;left:15.0000039834%;transform:rotate(270deg);-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-line-spin-clockwise-fade>div:nth-child(8){top:25.2506949798%;left:25.2513989292%;transform:rotate(315deg);-webkit-animation-delay:0s;animation-delay:0s}.la-line-spin-clockwise-fade.la-sm{width:16px;height:16px}.la-line-spin-clockwise-fade.la-sm>div{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-clockwise-fade.la-2x{width:64px;height:64px}.la-line-spin-clockwise-fade.la-2x>div{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-clockwise-fade.la-3x{width:96px;height:96px}.la-line-spin-clockwise-fade.la-3x>div{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes line-spin-clockwise-fade{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-clockwise-fade{50%{opacity:.2}100%{opacity:1}}.la-line-spin-fade-rotating,.la-line-spin-fade-rotating>div{position:relative;box-sizing:border-box}.la-line-spin-fade-rotating{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite ball-spin-fade-rotating-rotate;animation:6s linear infinite ball-spin-fade-rotating-rotate}.la-line-spin-fade-rotating.la-dark{color:#333}.la-line-spin-fade-rotating>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-fade-rotating;animation:1s ease-in-out infinite line-spin-fade-rotating}.la-line-spin-fade-rotating>div:nth-child(1){top:15%;left:50%;transform:rotate(0);-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-line-spin-fade-rotating>div:nth-child(2){top:25.2512626585%;left:74.7487373415%;transform:rotate(45deg);-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-line-spin-fade-rotating>div:nth-child(3){top:50%;left:85%;transform:rotate(90deg);-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-line-spin-fade-rotating>div:nth-child(4){top:74.7487373415%;left:74.7487373415%;transform:rotate(135deg);-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-line-spin-fade-rotating>div:nth-child(5){top:84.9999999974%;left:50.0000000004%;transform:rotate(180deg);-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-line-spin-fade-rotating>div:nth-child(6){top:74.7487369862%;left:25.2512627193%;transform:rotate(225deg);-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-line-spin-fade-rotating>div:nth-child(7){top:49.9999806189%;left:15.0000039834%;transform:rotate(270deg);-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-line-spin-fade-rotating>div:nth-child(8){top:25.2506949798%;left:25.2513989292%;transform:rotate(315deg);-webkit-animation-delay:-2s;animation-delay:-2s}.la-line-spin-fade-rotating.la-sm{width:16px;height:16px}.la-line-spin-fade-rotating.la-sm>div{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-fade-rotating.la-2x{width:64px;height:64px}.la-line-spin-fade-rotating.la-2x>div{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-fade-rotating.la-3x{width:96px;height:96px}.la-line-spin-fade-rotating.la-3x>div{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes ball-spin-fade-rotating-rotate{100%{transform:rotate(360deg)}}@keyframes ball-spin-fade-rotating-rotate{100%{transform:rotate(360deg)}}@-webkit-keyframes line-spin-fade-rotating{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-fade-rotating{50%{opacity:.2}100%{opacity:1}}.la-line-spin-fade,.la-line-spin-fade>div{position:relative;box-sizing:border-box}.la-line-spin-fade{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-line-spin-fade.la-dark{color:#333}.la-line-spin-fade>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-fade;animation:1s ease-in-out infinite line-spin-fade}.la-line-spin-fade>div:nth-child(1){top:15%;left:50%;transform:rotate(0);-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-line-spin-fade>div:nth-child(2){top:25.2512626585%;left:74.7487373415%;transform:rotate(45deg);-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-line-spin-fade>div:nth-child(3){top:50%;left:85%;transform:rotate(90deg);-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-line-spin-fade>div:nth-child(4){top:74.7487373415%;left:74.7487373415%;transform:rotate(135deg);-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-line-spin-fade>div:nth-child(5){top:84.9999999974%;left:50.0000000004%;transform:rotate(180deg);-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-line-spin-fade>div:nth-child(6){top:74.7487369862%;left:25.2512627193%;transform:rotate(225deg);-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-line-spin-fade>div:nth-child(7){top:49.9999806189%;left:15.0000039834%;transform:rotate(270deg);-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-line-spin-fade>div:nth-child(8){top:25.2506949798%;left:25.2513989292%;transform:rotate(315deg);-webkit-animation-delay:-2s;animation-delay:-2s}.la-line-spin-fade.la-sm{width:16px;height:16px}.la-line-spin-fade.la-sm>div{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-fade.la-2x{width:64px;height:64px}.la-line-spin-fade.la-2x>div{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-fade.la-3x{width:96px;height:96px}.la-line-spin-fade.la-3x>div{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes line-spin-fade{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-fade{50%{opacity:.2}100%{opacity:1}}.la-pacman,.la-pacman>div{position:relative;box-sizing:border-box}.la-pacman{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-pacman.la-dark{color:#333}.la-pacman>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-pacman>div:nth-child(1),.la-pacman>div:nth-child(2){width:0;height:0;background:0 0;border-style:solid;border-width:16px;border-right-color:transparent;border-radius:100%;-webkit-animation:.5s infinite pacman-rotate-half-up;animation:.5s infinite pacman-rotate-half-up}.la-pacman>div:nth-child(2){margin-top:-32px;-webkit-animation-name:pacman-rotate-half-down;animation-name:pacman-rotate-half-down}.la-pacman>div:nth-child(3),.la-pacman>div:nth-child(4),.la-pacman>div:nth-child(5),.la-pacman>div:nth-child(6){position:absolute;top:50%;left:200%;width:8px;height:8px;border-radius:100%;opacity:0;-webkit-animation:2s linear infinite pacman-balls;animation:2s linear infinite pacman-balls}.la-pacman>div:nth-child(3){-webkit-animation-delay:-1.44s;animation-delay:-1.44s}.la-pacman>div:nth-child(4){-webkit-animation-delay:-1.94s;animation-delay:-1.94s}.la-pacman>div:nth-child(5){-webkit-animation-delay:-2.44s;animation-delay:-2.44s}.la-pacman>div:nth-child(6){-webkit-animation-delay:-2.94s;animation-delay:-2.94s}.la-pacman.la-sm{width:16px;height:16px}.la-pacman.la-sm>div:nth-child(1),.la-pacman.la-sm>div:nth-child(2){border-width:8px}.la-pacman.la-sm>div:nth-child(2){margin-top:-16px}.la-pacman.la-sm>div:nth-child(3),.la-pacman.la-sm>div:nth-child(4),.la-pacman.la-sm>div:nth-child(5),.la-pacman.la-sm>div:nth-child(6){width:4px;height:4px}.la-pacman.la-2x{width:64px;height:64px}.la-pacman.la-2x>div:nth-child(1),.la-pacman.la-2x>div:nth-child(2){border-width:32px}.la-pacman.la-2x>div:nth-child(2){margin-top:-64px}.la-pacman.la-2x>div:nth-child(3),.la-pacman.la-2x>div:nth-child(4),.la-pacman.la-2x>div:nth-child(5),.la-pacman.la-2x>div:nth-child(6){width:16px;height:16px}.la-pacman.la-3x{width:96px;height:96px}.la-pacman.la-3x>div:nth-child(1),.la-pacman.la-3x>div:nth-child(2){border-width:48px}.la-pacman.la-3x>div:nth-child(2){margin-top:-96px}.la-pacman.la-3x>div:nth-child(3),.la-pacman.la-3x>div:nth-child(4),.la-pacman.la-3x>div:nth-child(5),.la-pacman.la-3x>div:nth-child(6){width:24px;height:24px}@-webkit-keyframes pacman-rotate-half-up{0%,100%{transform:rotate(270deg)}50%{transform:rotate(360deg)}}@keyframes pacman-rotate-half-up{0%,100%{transform:rotate(270deg)}50%{transform:rotate(360deg)}}@-webkit-keyframes pacman-rotate-half-down{0%,100%{transform:rotate(90deg)}50%{transform:rotate(0)}}@keyframes pacman-rotate-half-down{0%,100%{transform:rotate(90deg)}50%{transform:rotate(0)}}@-webkit-keyframes pacman-balls{0%{left:200%;opacity:0;transform:translateY(-50%)}5%{opacity:.5}66%{opacity:1}67%{opacity:0}100%{left:0;transform:translateY(-50%)}}@keyframes pacman-balls{0%{left:200%;opacity:0;transform:translateY(-50%)}5%{opacity:.5}66%{opacity:1}67%{opacity:0}100%{left:0;transform:translateY(-50%)}}.la-square-jelly-box,.la-square-jelly-box>div{position:relative;box-sizing:border-box}.la-square-jelly-box{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-square-jelly-box.la-dark{color:#333}.la-square-jelly-box>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-square-jelly-box>div:nth-child(1),.la-square-jelly-box>div:nth-child(2){position:absolute;left:0;width:100%}.la-square-jelly-box>div:nth-child(1){top:-25%;z-index:1;height:100%;border-radius:10%;-webkit-animation:.6s linear -.1s infinite square-jelly-box-animate;animation:.6s linear -.1s infinite square-jelly-box-animate}.la-square-jelly-box>div:nth-child(2){bottom:-9%;height:10%;background:#000;border-radius:50%;opacity:.2;-webkit-animation:.6s linear -.1s infinite square-jelly-box-shadow;animation:.6s linear -.1s infinite square-jelly-box-shadow}.la-square-jelly-box.la-sm{width:16px;height:16px}.la-square-jelly-box.la-2x{width:64px;height:64px}.la-square-jelly-box.la-3x{width:96px;height:96px}@-webkit-keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;transform:translateY(50%) scale(1,.9) rotate(45deg)}75%{transform:translateY(25%) rotate(67.5deg)}100%{transform:translateY(0) rotate(90deg)}}@keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;transform:translateY(50%) scale(1,.9) rotate(45deg)}75%{transform:translateY(25%) rotate(67.5deg)}100%{transform:translateY(0) rotate(90deg)}}@-webkit-keyframes square-jelly-box-shadow{50%{transform:scale(1.25,1)}}@keyframes square-jelly-box-shadow{50%{transform:scale(1.25,1)}}.la-square-loader,.la-square-loader>div{position:relative;box-sizing:border-box}.la-square-loader{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-square-loader.la-dark{color:#333}.la-square-loader>div{display:inline-block;float:none;border:2px solid currentColor;width:100%;height:100%;background:0 0;border-radius:0;-webkit-animation:2s infinite square-loader;animation:2s infinite square-loader}.la-square-loader>div:after{display:inline-block;width:100%;vertical-align:top;content:\"\";background-color:currentColor;-webkit-animation:2s ease-in infinite square-loader-inner;animation:2s ease-in infinite square-loader-inner}.la-square-loader.la-sm{width:16px;height:16px}.la-square-loader.la-sm>div{border-width:1px}.la-square-loader.la-2x{width:64px;height:64px}.la-square-loader.la-2x>div{border-width:4px}.la-square-loader.la-3x{width:96px;height:96px}.la-square-loader.la-3x>div{border-width:6px}@-webkit-keyframes square-loader{0%{transform:rotate(0)}25%,50%{transform:rotate(180deg)}100%,75%{transform:rotate(360deg)}}@keyframes square-loader{0%{transform:rotate(0)}25%,50%{transform:rotate(180deg)}100%,75%{transform:rotate(360deg)}}@-webkit-keyframes square-loader-inner{0%,100%,25%{height:0}50%,75%{height:100%}}@keyframes square-loader-inner{0%,100%,25%{height:0}50%,75%{height:100%}}.la-square-spin,.la-square-spin>div{position:relative;box-sizing:border-box}.la-square-spin{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-square-spin.la-dark{color:#333}.la-square-spin>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:100%;height:100%;border-radius:0;-webkit-animation:3s cubic-bezier(.09,.57,.49,.9) infinite square-spin;animation:3s cubic-bezier(.09,.57,.49,.9) infinite square-spin}.la-square-spin.la-sm{width:16px;height:16px}.la-square-spin.la-2x{width:64px;height:64px}.la-square-spin.la-3x{width:96px;height:96px}@-webkit-keyframes square-spin{0%{transform:perspective(100px) rotateX(0) rotateY(0)}25%{transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{transform:perspective(100px) rotateX(0) rotateY(360deg)}}@keyframes square-spin{0%{transform:perspective(100px) rotateX(0) rotateY(0)}25%{transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{transform:perspective(100px) rotateX(0) rotateY(360deg)}}.la-timer,.la-timer>div{position:relative;box-sizing:border-box}.la-timer{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-timer.la-dark{color:#333}.la-timer>div{display:inline-block;float:none;border:2px solid currentColor;width:32px;height:32px;background:0 0;border-radius:100%}.la-timer>div:after,.la-timer>div:before{position:absolute;top:14px;left:14px;display:block;width:2px;margin-top:-1px;margin-left:-1px;content:\"\";background:currentColor;border-radius:2px;transform-origin:1px 1px 0;-webkit-animation:1.25s linear -625ms infinite timer-loader;animation:1.25s linear -625ms infinite timer-loader}.la-timer>div:before{height:12px}.la-timer>div:after{height:8px;-webkit-animation-duration:15s;animation-duration:15s;-webkit-animation-delay:-7.5s;animation-delay:-7.5s}.la-timer.la-sm{width:16px;height:16px}.la-timer.la-sm>div{width:16px;height:16px;border-width:1px}.la-timer.la-sm>div:after,.la-timer.la-sm>div:before{top:7px;left:7px;width:1px;margin-top:-.5px;margin-left:-.5px;border-radius:1px;transform-origin:.5px .5px 0}.la-timer.la-sm>div:before{height:6px}.la-timer.la-sm>div:after{height:4px}.la-timer.la-2x{width:64px;height:64px}.la-timer.la-2x>div{width:64px;height:64px;border-width:4px}.la-timer.la-2x>div:after,.la-timer.la-2x>div:before{top:28px;left:28px;width:4px;margin-top:-2px;margin-left:-2px;border-radius:4px;transform-origin:2px 2px 0}.la-timer.la-2x>div:before{height:24px}.la-timer.la-2x>div:after{height:16px}.la-timer.la-3x{width:96px;height:96px}.la-timer.la-3x>div{width:96px;height:96px;border-width:6px}.la-timer.la-3x>div:after,.la-timer.la-3x>div:before{top:42px;left:42px;width:6px;margin-top:-3px;margin-left:-3px;border-radius:6px;transform-origin:3px 3px 0}.la-timer.la-3x>div:before{height:36px}.la-timer.la-3x>div:after{height:24px}@-webkit-keyframes timer-loader{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes timer-loader{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.la-triangle-skew-spin,.la-triangle-skew-spin>div{position:relative;box-sizing:border-box}.la-triangle-skew-spin{display:block;font-size:0;color:#fff;width:32px;height:16px}.la-triangle-skew-spin.la-dark{color:#333}.la-triangle-skew-spin>div{display:inline-block;float:none;border:0 solid currentColor;width:0;height:0;background:0 0;border:solid;border-width:0 16px 16px;border-right-color:transparent;border-left-color:transparent;-webkit-animation:3s cubic-bezier(.09,.57,.49,.9) infinite triangle-skew-spin;animation:3s cubic-bezier(.09,.57,.49,.9) infinite triangle-skew-spin}.la-triangle-skew-spin.la-sm{width:16px;height:8px}.la-triangle-skew-spin.la-sm>div{border-width:0 8px 8px}.la-triangle-skew-spin.la-2x{width:64px;height:32px}.la-triangle-skew-spin.la-2x>div{border-width:0 32px 32px}.la-triangle-skew-spin.la-3x{width:96px;height:48px}.la-triangle-skew-spin.la-3x>div{border-width:0 48px 48px}@-webkit-keyframes triangle-skew-spin{0%{transform:perspective(100px) rotateX(0) rotateY(0)}25%{transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{transform:perspective(100px) rotateX(0) rotateY(360deg)}}@keyframes triangle-skew-spin{0%{transform:perspective(100px) rotateX(0) rotateY(0)}25%{transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{transform:perspective(100px) rotateX(0) rotateY(360deg)}}.overlay{position:fixed;top:0;left:0;width:100%;height:100%}.overlay>div:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;transform:translate(-50%,-50%)}.loading-text{position:absolute;top:60%;left:50%;transform:translate(-50%,-60%)}"]
                }] }
    ];
    /** @nocollapse */
    NgxSpinnerComponent.ctorParameters = function () { return [
        { type: NgxSpinnerService },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }
    ]; };
    NgxSpinnerComponent.propDecorators = {
        bdColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        size: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        color: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        type: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        fullScreen: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        name: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        zIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return NgxSpinnerComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-spinner.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxSpinnerModule = /** @class */ (function () {
    function NgxSpinnerModule() {
    }
    NgxSpinnerModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"]
                    ],
                    declarations: [NgxSpinnerComponent],
                    exports: [NgxSpinnerComponent]
                },] }
    ];
    return NgxSpinnerModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-spinner.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ngx-spinner.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/Reports/export/export.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/Reports/export/export.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n  <!-- Content Header (Page header) -->\r\n  <section class=\"content-header\">\r\n    <h1>\r\n      <span translate>Export</span>\r\n    </h1>\r\n    <ol class=\"breadcrumb\">\r\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\r\n      <li class=\"active\"><span translate>Export</span></li>\r\n    </ol>\r\n  </section>\r\n  <!--<app-breadcrumb></app-breadcrumb>-->\r\n  <!-- Main content -->\r\n  <section class=\"content\">\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12\">\r\n        <div class=\"box box-primary\">\r\n          <form class=\"form-horizontal\" [formGroup]=\"exportForm\" (ngSubmit)=\"save()\" #formDir=\"ngForm\" novalidate>\r\n            <div class=\"box-body\">\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"!(config && config.name === 'Modem')\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\"><span translate>Test</span>:</label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"definedTestId\">\r\n                        <option value=0 translate>SelectTestPlease</option>\r\n                        <option *ngFor=\"let test of definedTestList\" [ngValue]=test.id>\r\n                          {{test.title}}\r\n                        </option>\r\n                      </select>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\"><span translate>Device</span>:</label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"machineId\">\r\n                        <option value=0 translate>SelectDevicePlease</option>\r\n                        <option *ngFor=\"let machine of machineList\" [ngValue]=\"machine.id\">\r\n                          {{machine.name}}\r\n                        </option>\r\n                      </select>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\"><span translate>ReportStartDate</span>:</label>\r\n                    <div class=\"col-sm-9\">\r\n                      <div class=\"row flex-container\">\r\n                        <div class=\"col-sm-5\">\r\n                          <input type=\"time\" class=\"form-control\" formControlName=\"beginDateTime\">\r\n                        </div>\r\n                        <div class=\"col-sm-7\">\r\n                          <input [matDatepicker]=\"beginDate\" type=\"text\" class=\"form-control\" formControlName=\"beginDate\" (click)=\"beginDate.open()\">\r\n                          <mat-datepicker #beginDate></mat-datepicker>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\"><span translate>ReportEndDate</span>:</label>\r\n                    <div class=\"col-sm-9\">\r\n                      <div class=\"row flex-container\">\r\n                        <div class=\"col-sm-5\">\r\n                          <input type=\"time\" class=\"form-control\" formControlName=\"endDateTime\">\r\n                        </div>\r\n                        <div class=\"col-sm-7\">\r\n                          <input [matDatepicker]=\"endDate\" type=\"text\" class=\"form-control\" formControlName=\"endDate\" (click)=\"endDate.open()\">\r\n                          <mat-datepicker #endDate></mat-datepicker>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\"><span translate>SimcardNo</span>:</label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"sim\">\r\n                        <option value=0 translate>SelectSimcardNoPlease</option>\r\n                        <option value=1> 1 </option>\r\n                        <option value=2> 2 </option>\r\n                        <option value=3> 3 </option>\r\n                        <option value=4> 4 </option>\r\n                      </select>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\"><span translate>Parameter</span>:</label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"ParamKml\">\r\n                        <option *ngFor=\"let param of paramKMlExport\" [ngValue]=\"param.title\">\r\n                          {{param.title}}\r\n                        </option>\r\n                      </select>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\"><span translate>Zone</span>:</label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"zone\">\r\n                        <option value=0 translate>SelectZonePlease</option>\r\n                        <option *ngFor=\"let z of zoneList\" [ngValue]=\"z.zoneId\">\r\n                          {{z.title}}\r\n                        </option>\r\n                      </select>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n            </div><!-- /.box-body -->\r\n            <div class=\"box-footer\">\r\n              <button class=\"btn btn-info rowEndAligne\" (click)=\"genKml()\" translate>DownloadKML</button>\r\n              <button type=\"submit\" class=\"btn btn-primary rowEndAligne\" translate>DownloadExcel</button>\r\n            </div><!-- /.box-footer -->\r\n          </form>\r\n          <div class=\"overlay\" *ngIf=\"showloader\">\r\n            <i class=\"fa fa-refresh fa-spin\"></i>\r\n          </div>\r\n        </div><!-- /.box -->\r\n      </div><!-- /.col -->\r\n    </div><!-- /.row -->\r\n\r\n  </section><!-- /.content -->\r\n</div><!-- /.content-wrapper -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/Reports/notification-edit/notification-edit.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/Reports/notification-edit/notification-edit.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n  <!-- Content Header (Page header) -->\r\n  <section class=\"content-header\">\r\n    <h1>\r\n      {{breadcroumb | translate}}\r\n      <small>{{ MachineName }}</small>\r\n    </h1>\r\n    <ol class=\"breadcrumb\">\r\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\r\n      <li><a [routerLink]=\"['/export/Notification']\" translate>Notifications</a></li>\r\n      <li class=\"active\">{{breadcroumb | translate}}</li>\r\n    </ol>\r\n\r\n  </section>\r\n\r\n  <!--<app-breadcrumb></app-breadcrumb>-->\r\n  <!-- Main content -->\r\n  <section class=\"content\">\r\n    <div class=\"row\">\r\n\r\n      <div class=\"col-md-12\">\r\n        <!-- Horizontal Form -->\r\n        <div class=\"box box-primary\">\r\n\r\n          <form class=\"form-horizontal\" [formGroup]=\"notificationForm\" (ngSubmit)=\"save()\" #formDir=\"ngForm\" novalidate>\r\n            <div class=\"box-body\">\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-danger\">* </span>\r\n                      <span translate>Name</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control numberOnly\" type=\"text\" formControlName=\"name\" required>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"f.name?.invalid && (f.name.touched || formDir.submitted)\" translate>NameIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"Activation\" class=\"col-sm-3 control-label\">\r\n                      <span translate>Active</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input type=\"checkbox\" formControlName=\"Activation\">\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-danger\">* </span>\r\n                      <span translate>Title</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"text\" formControlName=\"title\" required>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"f.title?.invalid && (f.title.touched || formDir.submitted)\" translate>TitleIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"MessageContent\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-danger\">* </span>\r\n                      <span translate>MessageContent</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"text\" formControlName=\"messageContent\" required>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"f.messageContent?.invalid && (f.messageContent.touched || formDir.submitted)\" translate>MessageContentIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-danger\">* </span>\r\n                      <span translate>NotifOn</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"notifOn\" required (change)=\"onSelectionChanged($event.target.value)\">\r\n                        <option value=-1 translate>SelectNotifOnPlease</option>\r\n                        <option value=0 translate>OnTime</option>\r\n                        <option value=1 translate>OnceADay</option>\r\n                        <option value=2 translate>InTimeRange</option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"f.notifOn?.invalid && (f.notifOn.touched || formDir.submitted)\" translate>NotifOnIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\" *ngIf=\"f.notifOn.value==2\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <span class=\"text-danger\">* </span>\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\"><span translate>SendStartTime</span>:</label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input type=\"time\" class=\"form-control\" formControlName=\"sendStartTime\" required>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"f.sendStartTime?.invalid  && f.notifOn.value==2 && (f.sendStartTime.touched || formDir.submitted)\" translate>SendStartTimeIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <span class=\"text-danger\">* </span>\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\"><span translate>SendEndTime</span>:</label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input type=\"time\" class=\"form-control\" formControlName=\"sendEndTime\" required>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"f.sendEndTime?.invalid && f.notifOn.value==2 && (f.sendEndTime.touched || formDir.submitted)\" translate>SendStartTimeIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-danger\">* </span>\r\n                      <span translate>Mobile</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"text\" formControlName=\"mobile\" required>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"f.mobile?.invalid && (f.mobile.touched || formDir.submitted)\" translate>MobileIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"MessageContent\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-danger\">* </span>\r\n                      <span translate>Email</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"text\" formControlName=\"email\" required>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"f.email?.invalid && (f.email.touched || formDir.submitted)\" translate>EmailIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n\r\n              <div formArrayName=\"parameters\"\r\n                   *ngFor=\"let item of notificationForm.get('parameters').controls; let i = index;\">\r\n\r\n                <hr />\r\n\r\n                <div [formGroupName]=\"i\">\r\n\r\n                  <div class=\"row\" *ngIf=\" i > 0 \">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"inputName\" class=\"col-sm-3 control-label\"><span translate>ParameterLogicalOperator</span>:</label>\r\n                        <div class=\"col-sm-9\">\r\n                          <select class=\"form-control\" data-val=\"true\" formControlName=\"parameterLogicalSymbol\">\r\n                            <option value=\"and\" selected translate>AND</option>\r\n                            <option value=\"or\" translate>OR</option>\r\n                          </select>\r\n                          <!--<span class=\"text-danger col-md-12\" *ngIf=\"f.parameterLogicalSymbol?.invalid && (f.parameterLogicalSymbol.touched || formDir.submitted)\" translate>OperatorIsRequired</span>-->\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"inputName\" class=\"col-sm-3 control-label\"><span translate>Operator</span>:</label>\r\n                        <div class=\"col-sm-9\">\r\n                          <select class=\"form-control\" data-val=\"true\" formControlName=\"operator\">\r\n                            <!--<option value=\"\" translate>SelectOperatorPlease</option>-->\r\n                            <option value=\"HAMRAHAVVAL\" selected translate>HAMRAHAVVAL</option>\r\n                            <option value=\"INANCELL\" translate>INANCELL</option>\r\n                            <option value=\"RIGHTEL\" translate>RIGHTEL</option>\r\n                          </select>\r\n                          <!--<span class=\"text-danger col-md-12\" *ngIf=\"f.operator?.invalid && (f.operator.touched || formDir.submitted)\" translate>OperatorIsRequired</span>-->\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\"><span translate>NetworkTitle</span>:</label>\r\n                        <div class=\"col-sm-9\">\r\n                          <select class=\"form-control\" data-val=\"true\" formControlName=\"network\">\r\n                            <!--<option value=\"\" translate>SelectNetworkPlease</option>-->\r\n                            <option value=\"LTE\" selected translate>LTE</option>\r\n                            <option value=\"WCDMA\" translate>WCDMA</option>\r\n                            <option value=\"GSM\" translate>GSM</option>\r\n                          </select>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"inputName\" class=\"col-sm-3 control-label\"><span translate>Type</span>:</label>\r\n                        <div class=\"col-sm-9\">\r\n                          <div class=\"radio\">\r\n                            <label>\r\n                              <input type=\"radio\" [name]=\"i\" value=\"Device\" checked #Device>\r\n                              <span translate>Device</span>\r\n                            </label>\r\n                            <label style=\"margin:0 20px;\">\r\n                              <input type=\"radio\" [name]=\"i\" value=\"Group\" #Group>\r\n                              <span translate>Group</span>\r\n                            </label>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\" *ngIf=\"Device.checked\">\r\n                        <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                          <span class=\"text-danger\">* </span>\r\n                          <span translate>Device</span>:\r\n                        </label>\r\n                        <div class=\"col-sm-9\">\r\n                          <select class=\"form-control\" data-val=\"true\" formControlName=\"device\" required>\r\n                            <option value=\"\" translate>SelectDevicePlease</option>\r\n                            <option value=\"Device1\" translate>Device1</option>\r\n                            <option value=\"Device2\" translate>Device2</option>\r\n                            <option value=\"Device3\" translate>Device3</option>\r\n                          </select>\r\n                          <span class=\"text-danger col-md-12\" *ngIf=\"f.parameters.controls[i].controls.device?.invalid && (f.parameters.controls[i].controls.device.touched || formDir.submitted)\" translate>DeviceIsRequired</span>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"form-group\" *ngIf=\"Group.checked\">\r\n                        <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                          <span class=\"text-danger\">* </span>\r\n                          <span translate>Group</span>:\r\n                        </label>\r\n                        <div class=\"col-sm-9\">\r\n                          <select class=\"form-control\" data-val=\"true\" formControlName=\"group\" required>\r\n                            <option value=\"\" translate>SelectGroupPlease</option>\r\n                            <option value=\"Group1\" translate>Group1</option>\r\n                            <option value=\"Group2\" translate>Group2</option>\r\n                            <option value=\"Group3\" translate>Group3</option>\r\n                          </select>\r\n                          <span class=\"text-danger col-md-12\" *ngIf=\"f.parameters.controls[i].controls.group?.invalid && (f.parameters.controls[i].controls.group.touched || formDir.submitted)\" translate>GroupIsRequired</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"inputName\" class=\"col-sm-3 control-label\"><span translate>Zone</span>:</label>\r\n                        <div class=\"col-sm-9\">\r\n                          <select class=\"form-control\" data-val=\"true\" formControlName=\"zone\">\r\n                            <option value=0 translate>SelectZonePlease</option>\r\n                            <option *ngFor=\"let z of zoneList\" [ngValue]=\"z.zoneId\">\r\n                              {{z.title}}\r\n                            </option>\r\n                          </select>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                          <span class=\"text-danger\">* </span>\r\n                          <span translate>Parameter</span>:\r\n                        </label>\r\n                        <div class=\"col-sm-9\">\r\n                          <select class=\"form-control\" data-val=\"true\" formControlName=\"parameter\" required>\r\n                            <option value=\"\" translate>SelectParameterPlease</option>\r\n                            <option value=\"RSRP\" translate>RSRP</option>\r\n                            <option value=\"RXLevel\" translate>RXLevel</option>\r\n                            <option value=\"RSRQ\" translate>RSRQ</option>\r\n                          </select>\r\n                          <span class=\"text-danger col-md-12\" *ngIf=\"f.parameters.controls[i].controls.parameter?.invalid && (f.parameters.controls[i].controls.parameter.touched || formDir.submitted)\" translate>ParameterIsRequired</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                          <span class=\"text-danger\">* </span>\r\n                          <span translate>Function</span>:\r\n                        </label>\r\n                        <div class=\"col-sm-9\">\r\n                          <select class=\"form-control\" data-val=\"true\" formControlName=\"function\" required>\r\n                            <option value=\"\" translate>SelectFunctionPlease</option>\r\n                            <option value=\"min\">Min</option>\r\n                            <option value=\"max\">Max</option>\r\n                            <option value=\"sum\">Sum</option>\r\n                            <option value=\"count\">Count</option>\r\n                            <option value=\"first\">First</option>\r\n                            <option value=\"last\">Last</option>\r\n                            <option value=\"avgrage\">Avgrage</option>\r\n                            <option value=\"mean\">Mean</option>\r\n                          </select>\r\n                          <span class=\"text-danger col-md-12\" *ngIf=\"f.parameters.controls[i].controls.function?.invalid && (f.parameters.controls[i].controls.function.touched || formDir.submitted)\" translate>FunctionIsRequired</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                          <span class=\"text-danger\">* </span>\r\n                          <span translate>SearchStartDate</span>:\r\n                        </label>\r\n                        <div class=\"col-sm-9\">\r\n                          <input [matDatepicker]=\"beginDate\" type=\"text\" class=\"form-control\" formControlName=\"searchStartDate\" (click)=\"beginDate.open()\">\r\n                          <mat-datepicker #beginDate></mat-datepicker>\r\n                          <span class=\"text-danger col-md-12\" *ngIf=\"f.parameters.controls[i].controls.searchStartDate?.invalid && (f.parameters.controls[i].controls.searchStartDate.touched || formDir.submitted)\" translate>SearchStartDateIsRequired</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                          <span class=\"text-danger\">* </span>\r\n                          <span translate>SearchEndDate</span>:\r\n                        </label>\r\n                        <div class=\"col-sm-9\">\r\n                          <input [matDatepicker]=\"endDate\" type=\"text\" class=\"form-control\" formControlName=\"searchEndDate\" (click)=\"endDate.open()\">\r\n                          <mat-datepicker #endDate></mat-datepicker>\r\n                          <span class=\"text-danger col-md-12\" *ngIf=\"f.parameters.controls[i].controls.searchEndDate?.invalid && (f.parameters.controls[i].controls.searchEndDate.touched || formDir.submitted)\" translate>SearchEndDateIsRequired</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <div class=\"col-sm-3\"></div>\r\n                        <div class=\"col-sm-9\">\r\n                          <i class=\"fa fa-plus-circle text-green\" (click)=\"addParameter()\"><span translate>CreateNewParameterOperator</span></i>\r\n\r\n                          <i class=\"fa fa-minus-circle text-red\" (click)=\"removeParameter(i)\" *ngIf=\" i > 0 \" style=\"margin:0 10px;\"><span translate>Delete</span></i>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n\r\n                  <div formArrayName=\"filters\"\r\n                       *ngFor=\"let filter of item.get('filters').controls; let j = index;\">\r\n\r\n                    <hr />\r\n\r\n                    <div [formGroupName]=\"j\">\r\n\r\n                      <div class=\"row\" *ngIf=\" j > 0 \">\r\n                        <div class=\"col-lg-2\"></div>\r\n                        <div class=\"col-lg-5\">\r\n                          <div class=\"form-group\">\r\n                            <label for=\"inputName\" class=\"col-sm-3 control-label\"><span translate>ConditionLogicalOperator</span>:</label>\r\n                            <div class=\"col-sm-9\">\r\n                              <select class=\"form-control\" data-val=\"true\" formControlName=\"filterlogicalSymbol\">\r\n                                <option value=\"and\" selected translate>AND</option>\r\n                                <option value=\"or\" translate>OR</option>\r\n                              </select>\r\n                              <!--<span class=\"text-danger col-md-12\" *ngIf=\"f.filterlogicalSymbol?.invalid && (f.filterlogicalSymbol.touched || formDir.submitted)\" translate>OperatorIsRequired</span>-->\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                      <div class=\"row\">\r\n                        <div class=\"col-lg-2\"></div>\r\n                        <div class=\"col-lg-5\">\r\n                          <div class=\"form-group\">\r\n                            <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                              <span class=\"text-danger\">* </span>\r\n                              <span translate>MathematicalSymbol</span>:\r\n                            </label>\r\n                            <div class=\"col-sm-9\">\r\n                              <select class=\"form-control\" data-val=\"true\" formControlName=\"mathematicalSymbol\" required>\r\n                                <option value=\"\" translate>SelectMathematicalSymbolPlease</option>\r\n                                <option value=\"<\"><</option>\r\n                                <option value=\"<=\"><=</option>\r\n                                <option value=\">\">></option>\r\n                                <option value=\">=\">>=</option>\r\n                                <option value=\"!=\">!=</option>\r\n                                <option value=\">\">=</option>\r\n                              </select>\r\n                              <span class=\"text-danger col-md-12\" *ngIf=\"f.parameters.controls[i].controls.filters.controls[j].controls.mathematicalSymbol?.invalid && (f.parameters.controls[i].controls.filters.controls[j].controls.mathematicalSymbol.touched || formDir.submitted)\" translate>MathematicalSymbolIsRequired</span>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-lg-5\">\r\n                          <div class=\"form-group\">\r\n                            <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                              <span class=\"text-danger\">* </span>\r\n                              <span translate>OtherSideOfTheCondition</span>:\r\n                            </label>\r\n                            <div class=\"col-sm-9\">\r\n                              <input class=\"form-control\" type=\"text\" formControlName=\"conditionalValue\" required>\r\n                              <span class=\"text-danger col-md-12\" *ngIf=\"f.parameters.controls[i].controls.filters.controls[j].controls.conditionalValue?.invalid && (f.parameters.controls[i].controls.filters.controls[j].controls.conditionalValue.touched || formDir.submitted)\" translate>OtherSideOfTheConditionIsRequired</span>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"col-lg-2\"></div>\r\n                        <div class=\"col-lg-5\">\r\n                          <div class=\"form-group\">\r\n                            <div class=\"col-sm-3\"></div>\r\n                            <div class=\"col-sm-9\">\r\n                              <i class=\"fa fa-plus-circle text-green\" (click)=\"addFilter(item)\"><span translate>CreateNewFilter</span></i>\r\n\r\n                              <i class=\"fa fa-minus-circle text-red\" (click)=\"removeFilter(item,j)\" *ngIf=\" j > 0 \" style=\"margin:0 10px;\"><span translate>Delete</span></i>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                  </div>\r\n\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div><!-- /.box-body -->\r\n            <div class=\"overlay\" *ngIf=\"showloader \">\r\n              <i class=\"fa fa-refresh fa-spin\"></i>\r\n            </div>\r\n            <div class=\"box-footer\">\r\n              <button class=\"btn btn-danger  rowEndAligne\" (click)=\"cancel()\" translate>Cancel</button>\r\n              <button type=\"submit\" class=\"btn btn-primary  rowEndAligne\" translate>Save</button>\r\n            </div><!-- /.box-footer -->\r\n          </form>\r\n\r\n        </div><!-- /.box -->\r\n\r\n      </div>\r\n    </div><!-- /.row -->\r\n\r\n  </section><!-- /.content -->\r\n</div><!-- /.content-wrapper -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/Reports/notification-manager/notification-manager.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/Reports/notification-manager/notification-manager.component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n  <!-- Content Header (Page header) -->\r\n  <section class=\"content-header\">\r\n    <h1>\r\n      <span translate>Notifications</span>\r\n      <small>{{ MachineName }}</small>\r\n    </h1>\r\n    <ol class=\"breadcrumb\">\r\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\r\n      <li class=\"active\"><span translate>Notifications</span></li>\r\n    </ol>\r\n\r\n  </section>\r\n\r\n  <!--<app-breadcrumb></app-breadcrumb>-->\r\n  <!-- Main content -->\r\n  <section class=\"content\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12\">\r\n        <div class=\"box box-primary\">\r\n          <div class=\"box-body\">\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <mat-form-field>\r\n                  <mat-label translate>Search</mat-label>\r\n                  <input matInput (keyup)=\"applyFilter($event)\" #input>\r\n                </mat-form-field>\r\n\r\n                <a class=\"btn btn-success btn-sm\" style=\"margin:0 5px;\" (click)=\"getMessage()\"><span translate>ReloadData</span><i class=\"fa fa-refresh\"></i></a>\r\n\r\n                <a class=\"btn btn-success btn-lg rowEndAligne\" [routerLink]=\"['/export/Notification/Create/']\"><span translate>CreateNewNotification</span><i class=\"fa fa-plus\"></i></a>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"mat-table-container mat-elevation-z8\">\r\n              <table mat-table [dataSource]=\"dataSource\" matSort class=\"table table-hover table-striped text-nowrap\">\r\n\r\n                <!--- Note that these columns can be defined in any order.\r\n  The actual rendered columns are set as a property on the row definition\" -->\r\n\r\n                <ng-container matColumnDef=\"index\">\r\n                  <th mat-header-cell *matHeaderCellDef><span translate>Row</span></th>\r\n                  <td mat-cell *matCellDef=\"let element;let i = index;\">\r\n                    {{this.paginator.pageIndex == 0 ? i + 1 : 1 + i + this.paginator.pageIndex * this.paginator.pageSize}}\r\n                  </td>\r\n                </ng-container>\r\n\r\n\r\n                <ng-container matColumnDef=\"Name\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>Name</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\">{{element.name}}</td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"Email\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>Email</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{element.email}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"Mobile\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>Mobile</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{element.mobile}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"Title\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>Title</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\" class=\"numberOnly\"> {{element.Title}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"MessageContent\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>MessageContent</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\" class=\"numberOnly\"> {{element.MessageContent | slice:0:20  }} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"actions\" sticky [stickyEnd]=\"true\">\r\n                  <th mat-header-cell *matHeaderCellDef></th>\r\n                  <td mat-cell *matCellDef=\"let element\">\r\n                    <a class=\"btn btn-default gridbutton\" routerLink]=\"['/machine/Message/Edit/' , this.machinId , this.MachineName , element.id ]\" title=\"{{ 'Edit' | translate }}\"><i class=\"fa fa-edit\"></i></a>\r\n                    <a class=\"btn btn-default gridbutton\" (click)=\"deleteConfirm(element.id)\" title=\"{{ 'Delete' | translate }}\" data-toggle=\"modal\" data-target=\"#modal-default\"><i class=\"fa fa-trash\"></i></a>\r\n                  </td>\r\n                </ng-container>\r\n\r\n                <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n                <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n              </table>\r\n              <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[10 , 25 , 50 , 100]\" [showFirstLastButtons]=\"true\"></mat-paginator>\r\n\r\n            </div>\r\n\r\n          </div><!-- /.box-body -->\r\n          <div class=\"overlay\" *ngIf=\"showloader \">\r\n            <i class=\"fa fa-refresh fa-spin\"></i>\r\n          </div>\r\n        </div><!-- /.box -->\r\n      </div><!-- /.col -->\r\n    </div><!-- /.row -->\r\n\r\n    <div class=\"modal fade\" id=\"modal-default\" data-backdrop=\"static\" style=\"display: none;\">\r\n      <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">×</span>\r\n            </button>\r\n            <h4 class=\"modal-title\" translate>Noticeable</h4>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <p translate>DeleteNotificationConfirmMessage</p>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-default pull-left\" data-dismiss=\"modal\" translate>No</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"doDelete()\" translate>Yse</button>\r\n          </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n      </div>\r\n      <!-- /.modal-dialog -->\r\n    </div>\r\n\r\n  </section><!-- /.content -->\r\n</div><!-- /.content-wrapper -->\r\n"

/***/ }),

/***/ "./src/app/Reports/Report-Routing.module.ts":
/*!**************************************************!*\
  !*** ./src/app/Reports/Report-Routing.module.ts ***!
  \**************************************************/
/*! exports provided: ReportRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportRoutingModule", function() { return ReportRoutingModule; });
/* harmony import */ var _export_export_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./export/export.component */ "./src/app/Reports/export/export.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Authority_loginguard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Authority/loginguard */ "./src/app/Authority/loginguard.ts");
/* harmony import */ var _notification_manager_notification_manager_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notification-manager/notification-manager.component */ "./src/app/Reports/notification-manager/notification-manager.component.ts");
/* harmony import */ var _notification_edit_notification_edit_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notification-edit/notification-edit.component */ "./src/app/Reports/notification-edit/notification-edit.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    {
        path: '',
        children: [
            { path: '', component: _export_export_component__WEBPACK_IMPORTED_MODULE_0__["ExportComponent"] },
            { path: 'Notification', component: _notification_manager_notification_manager_component__WEBPACK_IMPORTED_MODULE_4__["NotificationManagerComponent"] },
            { path: 'Notification/Create', component: _notification_edit_notification_edit_component__WEBPACK_IMPORTED_MODULE_5__["NotificationEditComponent"] },
            { path: 'Notification/Edit/:id', component: _notification_edit_notification_edit_component__WEBPACK_IMPORTED_MODULE_5__["NotificationEditComponent"] }
        ],
        canActivate: [_Authority_loginguard__WEBPACK_IMPORTED_MODULE_3__["LoginGruard"]]
    }
];
var ReportRoutingModule = /** @class */ (function () {
    function ReportRoutingModule() {
    }
    ReportRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ReportRoutingModule);
    return ReportRoutingModule;
}());



/***/ }),

/***/ "./src/app/Reports/Report.module.ts":
/*!******************************************!*\
  !*** ./src/app/Reports/Report.module.ts ***!
  \******************************************/
/*! exports provided: ReportModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportModule", function() { return ReportModule; });
/* harmony import */ var _Shared_shared_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../Shared/shared.modules */ "./src/app/Shared/shared.modules.ts");
/* harmony import */ var _Report_Routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Report-Routing.module */ "./src/app/Reports/Report-Routing.module.ts");
/* harmony import */ var _export_export_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./export/export.component */ "./src/app/Reports/export/export.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _notification_manager_notification_manager_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./notification-manager/notification-manager.component */ "./src/app/Reports/notification-manager/notification-manager.component.ts");
/* harmony import */ var _notification_edit_notification_edit_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./notification-edit/notification-edit.component */ "./src/app/Reports/notification-edit/notification-edit.component.ts");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






//import { TranslateModule } from '@ngx-translate/core';







var ReportModule = /** @class */ (function () {
    function ReportModule() {
    }
    ReportModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _export_export_component__WEBPACK_IMPORTED_MODULE_2__["ExportComponent"],
                _notification_manager_notification_manager_component__WEBPACK_IMPORTED_MODULE_10__["NotificationManagerComponent"],
                _notification_edit_notification_edit_component__WEBPACK_IMPORTED_MODULE_11__["NotificationEditComponent"]
            ],
            imports: [
                _Report_Routing_module__WEBPACK_IMPORTED_MODULE_1__["ReportRoutingModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"],
                _Shared_shared_modules__WEBPACK_IMPORTED_MODULE_0__["sharedModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_5__["MatDatepickerModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__["MatCheckboxModule"]
            ],
            exports: [],
            providers: []
        })
    ], ReportModule);
    return ReportModule;
}());



/***/ }),

/***/ "./src/app/Reports/export/export.component.css":
/*!*****************************************************!*\
  !*** ./src/app/Reports/export/export.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL1JlcG9ydHMvZXhwb3J0L2V4cG9ydC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/Reports/export/export.component.ts":
/*!****************************************************!*\
  !*** ./src/app/Reports/export/export.component.ts ***!
  \****************************************************/
/*! exports provided: ExportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportComponent", function() { return ExportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _Shared_services_NgbDatepickerI18nPersian__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Shared/services/NgbDatepickerI18nPersian */ "./src/app/Shared/services/NgbDatepickerI18nPersian.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Shared_services_config_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Shared/services/config.service */ "./src/app/Shared/services/config.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};











var ExportComponent = /** @class */ (function () {
    function ExportComponent(_http, _fb, _avRoute, _router, baseUrl, calendar, toastrService, translate, _config) {
        var _this = this;
        this._http = _http;
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._router = _router;
        this.calendar = calendar;
        this.toastrService = toastrService;
        this.translate = translate;
        this._config = _config;
        this.showloader = false;
        this.formTitle = 'Create';
        this.myAppUrl = '';
        this.paramKMlExport = [
            { id: 0, title: 'Route plot' },
            { id: 1, title: 'RXLevel' },
            { id: 2, title: 'RSCP' },
            { id: 3, title: 'RSRP' },
            { id: 4, title: 'RXQual' },
            { id: 5, title: 'ECIO' },
            { id: 6, title: 'RSRQ' },
            { id: 7, title: 'MNC' }
        ];
        //defaultDate: Date;
        //defaultTime: Time;
        this.FileSaver = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
        this.getDefinedTestList().subscribe(function (data) {
            _this.definedTestList = data;
        });
        this.getMachineList().subscribe(function (data) {
            _this.machineList = data;
            _this.selectedFirstMachine = +_this.machineList[0].id;
            //console.log(this.machineList)
        });
        this.getZones().subscribe(function (data) {
            _this.zoneList = data;
            _this.selectedZone = +_this.zoneList[0].zoneId;
        });
        this.exportForm = this._fb.group({
            definedTestId: [0],
            zone: [0],
            isActive: [true, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            ParamKml: ['Route plot'],
            machineId: [0],
            beginDate: [, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            endDate: [, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            sim: [0, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(0)],
            beginDateTime: [/*this.defaultTime*/ , _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            endDateTime: [/*this.defaultTime*/ , _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        //var defaultDate = new Date();
        //var defaultTime = defaultDate.getHours() + ":" + defaultDate.getMinutes();
        this.exportForm.controls['beginDateTime'].setValue("00:00");
        this.exportForm.controls['endDateTime'].setValue("00:00");
        //---------------------------------------------------------------------------------
        this._config.currentConfigurations.subscribe(function (t) {
            _this.config = t;
        });
    }
    ExportComponent.prototype.ngOnInit = function () {
        // this.exportForm.controls['machineId'].setValue(this.selectedFirstMachine,{onlySelf: true}); ////select first element default--omid added 981120
    };
    ExportComponent.prototype.genKml = function () {
        var _this = this;
        console.log(this.exportForm);
        if (this.exportForm.controls['machineId'].value === 0) { // Select machine Required
            this.toastrService.warning(this.translate.instant('SelectYourMachine'), this.translate.instant('Warning'));
            return;
        }
        if (!this.exportForm.valid) {
            if (!this.exportForm.controls['beginDate'].valid || this.exportForm.controls['beginDate'].value == null) {
                this.toastrService.warning(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Warning'));
            }
            if (!this.exportForm.controls['endDate'].valid || this.exportForm.controls['endDate'].value == null) {
                this.toastrService.warning(this.translate.instant('EndDateIsRequired'), this.translate.instant('Warning'));
            }
            return;
        }
        var BDate = this.exportForm.controls['beginDate'].value._d;
        var EDate = this.exportForm.controls['endDate'].value._d;
        if (BDate) {
            var BOTime = this.exportForm.controls['beginDateTime'].value.split(':');
            BDate.setHours(BOTime[0], BOTime[1], 0, 0);
        }
        if (EDate) {
            var EOTime = this.exportForm.controls['endDateTime'].value.split(':');
            EDate.setHours(EOTime[0], EOTime[1], 0, 0);
        }
        this.showloader = true;
        this.GenKml(this.exportForm.value).subscribe(function (data) {
            Object(file_saver__WEBPACK_IMPORTED_MODULE_8__["saveAs"])(data, "/Map.Kml");
            _this.showloader = false;
        });
    };
    ExportComponent.prototype.save = function () {
        var _this = this;
        if (!this.exportForm.valid) {
            if (!this.exportForm.controls['beginDate'].valid || this.exportForm.controls['beginDate'].value == null) {
                this.toastrService.warning(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Warning'));
            }
            if (!this.exportForm.controls['endDate'].valid || this.exportForm.controls['endDate'].value == null) {
                this.toastrService.warning(this.translate.instant('EndDateIsRequired'), this.translate.instant('Warning'));
            }
            return;
        }
        var BDate = this.exportForm.controls['beginDate'].value._d;
        var EDate = this.exportForm.controls['endDate'].value._d;
        if (BDate) {
            var BOTime = this.exportForm.controls['beginDateTime'].value.split(':');
            BDate.setHours(BOTime[0], BOTime[1], 0, 0);
        }
        if (EDate) {
            var EOTime = this.exportForm.controls['endDateTime'].value.split(':');
            EDate.setHours(EOTime[0], EOTime[1], 0, 0);
        }
        this.showloader = true;
        this.submit(this.exportForm.value)
            .subscribe(function (data) {
            Object(file_saver__WEBPACK_IMPORTED_MODULE_8__["saveAs"])(data, "/Report.xlsx");
            _this.showloader = false;
        });
        //.subscribe(() => {
        //    res => {
        //        const blob = new Blob([res.blob()], { type: 'application/vnd.ms.excel' });
        //        const file = new File([blob], 'UserList' + '.xlsx', { type: 'application/vnd.ms.excel' });
        //        saveAs(file);
        //    }
        //        //this._router.navigate(['/export/' + this.machineId]);
        //    }, error => console.error(error));
        //this.FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
    };
    ExportComponent.prototype.getDefinedTestList = function () {
        return this._http.get(this.myAppUrl + 'api/DefinedTest/index/')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            return response;
        }));
    };
    ExportComponent.prototype.getMachineList = function () {
        return this._http.get(this.myAppUrl + 'api/Machine/index/')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            return response;
        }));
    };
    ExportComponent.prototype.getZones = function () {
        return this._http.get(this.myAppUrl + 'api/GeoLocation/GetZones/')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            return response;
        }));
    };
    ExportComponent.prototype.getDefaultDateTime = function () {
        return this._http.get(this.myAppUrl + 'api/export/DefaultDateTime/')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            return response;
        }));
    };
    ExportComponent.prototype.submit = function (expo) {
        return this._http.post(this.myAppUrl + 'api/export/submit', expo, {
            responseType: "blob"
        });
        //    .subscribe(ress => {
        //        res => {
        //            //const blob = new Blob([res.blob()]);
        //            //const file = new File([blob], 'UserList' + '.xlsx');
        //            //saveAs(file);
        //            const fileType = this.FileSaver.genType("UserList.xlsx");
        //            const txtBlob = new Blob([res.blob()], { type: fileType });
        //            this.FileSaver.save(txtBlob, "UserList.xlsx");
        //        }
        //    });
        //return;
    };
    ExportComponent.prototype.GenKml = function (expo) {
        return this._http.post(this.myAppUrl + 'api/export/GenKml', expo, {
            responseType: "blob"
        });
    };
    Object.defineProperty(ExportComponent.prototype, "definedTestId", {
        get: function () { return this.exportForm.get('definedTestId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportComponent.prototype, "sim", {
        get: function () { return this.exportForm.get('sim'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportComponent.prototype, "machineId", {
        get: function () { return this.exportForm.get('machineId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportComponent.prototype, "zone", {
        get: function () { return this.exportForm.get('zone'); },
        enumerable: true,
        configurable: true
    });
    ExportComponent.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: ['BASE_URL',] }] },
        { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbCalendar"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateService"] },
        { type: _Shared_services_config_service__WEBPACK_IMPORTED_MODULE_9__["ConfigService"] }
    ]; };
    ExportComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-export',
            template: __webpack_require__(/*! raw-loader!./export.component.html */ "./node_modules/raw-loader/index.js!./src/app/Reports/export/export.component.html"),
            providers: [
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbCalendar"], useClass: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbCalendarPersian"] },
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbDatepickerI18n"], useClass: _Shared_services_NgbDatepickerI18nPersian__WEBPACK_IMPORTED_MODULE_6__["NgbDatepickerI18nPersian"] }
            ],
            styles: [__webpack_require__(/*! ./export.component.css */ "./src/app/Reports/export/export.component.css")]
        }),
        __param(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('BASE_URL')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], String, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbCalendar"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateService"],
            _Shared_services_config_service__WEBPACK_IMPORTED_MODULE_9__["ConfigService"]])
    ], ExportComponent);
    return ExportComponent;
}());



/***/ }),

/***/ "./src/app/Reports/notification-edit/notification-edit.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/Reports/notification-edit/notification-edit.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL1JlcG9ydHMvbm90aWZpY2F0aW9uLWVkaXQvbm90aWZpY2F0aW9uLWVkaXQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/Reports/notification-edit/notification-edit.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/Reports/notification-edit/notification-edit.component.ts ***!
  \**************************************************************************/
/*! exports provided: NotificationEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationEditComponent", function() { return NotificationEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NotificationEditComponent = /** @class */ (function () {
    function NotificationEditComponent(_http, _avRoute, _fb, _router, toastrService, translate) {
        var _this = this;
        this._http = _http;
        this._avRoute = _avRoute;
        this._fb = _fb;
        this._router = _router;
        this.toastrService = toastrService;
        this.translate = translate;
        this.formTitle = 'Create';
        this.breadcroumb = 'CreateNotification';
        this.showloader = false;
        this.selectedId = +this._avRoute.snapshot.params['id'];
        this.notificationForm = this._fb.group({
            id: 0,
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            Activation: true,
            title: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            messageContent: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            notifOn: [-1, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].max(2)]],
            sendStartTime: [, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            sendEndTime: [, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            mobile: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            parameters: this._fb.array([this.createParameter()]),
        });
        //this.getMessage(this.machinId);
        if (this.selectedId > 0) {
            this.formTitle = 'Edit';
            this.breadcroumb = 'EditNotification';
            this.getMessageById(this.selectedId);
        }
        this.getZones().subscribe(function (data) {
            _this.zoneList = data;
            _this.selectedZone = +_this.zoneList[0].zoneId;
        });
    }
    NotificationEditComponent.prototype.ngOnInit = function () {
    };
    NotificationEditComponent.prototype.createParameter = function () {
        return this._fb.group({
            operator: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            network: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            device: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            group: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            zone: [0],
            parameter: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            function: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            searchStartDate: [, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            searchEndDate: [, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            parameterLogicalSymbol: [, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            filters: this._fb.array([this.createFilter()]),
        });
    };
    NotificationEditComponent.prototype.createFilter = function () {
        return this._fb.group({
            mathematicalSymbol: [, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            conditionalValue: [, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            filterlogicalSymbol: [, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
        });
    };
    NotificationEditComponent.prototype.addParameter = function () {
        this.parameters = this.notificationForm.get('parameters');
        this.parameters.push(this.createParameter());
    };
    NotificationEditComponent.prototype.addFilter = function (parameters) {
        this.filters = parameters.get('filters');
        this.filters.push(this.createFilter());
    };
    NotificationEditComponent.prototype.removeParameter = function (item) {
        this.parameters.removeAt(item);
    };
    NotificationEditComponent.prototype.removeFilter = function (parameters, item) {
        this.filters = parameters.get('filters');
        this.filters.removeAt(item);
    };
    NotificationEditComponent.prototype.save = function () {
        if (!this.notificationForm.valid) {
            return;
        }
        this.notificationForm.controls['Machineid'].setValue(this.Machineid);
        this.notificationForm.controls['Modem'].setValue(+this.notificationForm.controls['Modem'].value);
        this.notificationForm.controls['Sim'].setValue(+this.notificationForm.controls['Sim'].value);
        this.showloader = true;
        //var message = new Message()
        if (this.formTitle === 'Create')
            this.createMachineMessage(this.notificationForm.value);
        else if (this.formTitle === 'Edit')
            this.editMachineMessage(this.notificationForm.value);
    };
    NotificationEditComponent.prototype.cancel = function () {
        this._router.navigate(['/export/Notification']);
    };
    NotificationEditComponent.prototype.createMachineMessage = function (message) {
        var _this = this;
        if (message.Modem == 0)
            message.Sim = 1;
        return this._http.post('api/Message/Create', message)
            .subscribe(function (response) {
            _this.showloader = false;
            if (response > 0) {
                _this._router.navigate(['/machine/Message/', _this.Machineid, _this.MachineName]);
            }
            else
                _this.toastrService.error(_this.translate.instant('DatabaseActionError'), _this.translate.instant('Error'));
        });
    };
    NotificationEditComponent.prototype.editMachineMessage = function (message) {
        var _this = this;
        if (message.Modem == 0)
            message.Sim = 1;
        return this._http.put('api/Message/Edit', message)
            .subscribe(function (result) {
            _this.showloader = false;
            if (result["succeed"] == true)
                if (result["result"] == true) {
                    _this._router.navigate(['/machine/Message/', _this.Machineid, _this.MachineName]);
                }
                else
                    _this.toastrService.warning(_this.translate.instant(result["message"]), _this.translate.instant('Warning'));
            else
                _this.toastrService.error(_this.translate.instant('DatabaseActionError'), _this.translate.instant('Error'));
        });
    };
    NotificationEditComponent.prototype.getMessageById = function (id) {
        var _this = this;
        this.showloader = true;
        this._http.get('api/Message/GetMessageById/' + id).subscribe(function (data) {
            _this.showloader = false;
            if (data != null) {
                _this.notificationForm.get('id').setValue(data['id']);
                _this.notificationForm.get('Machineid').setValue(data['machineid']);
                _this.notificationForm.get('Modem').setValue(data['modem']);
                _this.notificationForm.get('Sim').setValue(data['sim']);
                _this.notificationForm.get('Body').setValue(data['body']);
                _this.onSelectionChanged(data['modem'].toString());
            }
            else {
                // Todo :: Mostafa :: if id is incorrect or status is not equal to 0 Show correct message to user
                _this.toastrService.error(_this.translate.instant('DatabaseActionError'), _this.translate.instant('Error'));
                _this._router.navigate(['/machine/Message/', _this.Machineid, _this.MachineName]);
            }
        });
    };
    Object.defineProperty(NotificationEditComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.notificationForm.controls; },
        enumerable: true,
        configurable: true
    });
    NotificationEditComponent.prototype.getZones = function () {
        return this._http.get('api/GeoLocation/GetZones/')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (response) {
            return response;
        }));
    };
    NotificationEditComponent.prototype.onSelectionChanged = function (value) {
        if (value === '0') {
            this.notificationForm.get('Sim').setValue(1);
            this.notificationForm.get('Sim').disable();
        }
        else {
            this.notificationForm.get('Sim').enable();
            this.notificationForm.get('Sim').setValue(0);
        }
    };
    NotificationEditComponent.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"] }
    ]; };
    NotificationEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notification-edit',
            template: __webpack_require__(/*! raw-loader!./notification-edit.component.html */ "./node_modules/raw-loader/index.js!./src/app/Reports/notification-edit/notification-edit.component.html"),
            styles: [__webpack_require__(/*! ./notification-edit.component.css */ "./src/app/Reports/notification-edit/notification-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"]])
    ], NotificationEditComponent);
    return NotificationEditComponent;
}());



/***/ }),

/***/ "./src/app/Reports/notification-manager/notification-manager.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/Reports/notification-manager/notification-manager.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL1JlcG9ydHMvbm90aWZpY2F0aW9uLW1hbmFnZXIvbm90aWZpY2F0aW9uLW1hbmFnZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/Reports/notification-manager/notification-manager.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/Reports/notification-manager/notification-manager.component.ts ***!
  \********************************************************************************/
/*! exports provided: NotificationManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationManagerComponent", function() { return NotificationManagerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm5/sort.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Shared/services/Language.service */ "./src/app/Shared/services/Language.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _Shared_services_pdu_decoder_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Shared/services/pdu-decoder.service */ "./src/app/Shared/services/pdu-decoder.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var NotificationManagerComponent = /** @class */ (function () {
    function NotificationManagerComponent(_http, _avRoute, toastrService, langService, translate, _decoder) {
        this._http = _http;
        this._avRoute = _avRoute;
        this.toastrService = toastrService;
        this.langService = langService;
        this.translate = translate;
        this._decoder = _decoder;
        this.showloader = false;
        this.displayedColumns = ['index', 'Name', 'Email', 'Mobile', 'Title', 'MessageContent', 'actions'];
        if (this._avRoute.snapshot.params['id']) {
            this.machinId = this._avRoute.snapshot.params['id'];
            this.MachineName = this._avRoute.snapshot.params['Name'];
            this.getMessage();
            this.getMachineStatusDetail(this.machinId);
        }
    }
    NotificationManagerComponent.prototype.ngOnInit = function () {
    };
    NotificationManagerComponent.prototype.getMessage = function () {
        //this.showloader = true;
        //this._http.get('api/Message/IndexWithMachineId/' + this.machinId).subscribe((data) => {
        //  this.dataSource = new MatTableDataSource(<any>data);
        //  this.dataSource.paginator = this.paginator;
        //  this.dataSource.sort = this.sortAll;
        //  this.showloader = false;
        //  this.dataSource.filter = this.searchInput.nativeElement.value.trim().toLowerCase();
        //}
        //);
    };
    NotificationManagerComponent.prototype.getMachineStatusDetail = function (id) {
        this._http.get('api/DefinedTestMachine/MachineStatusDetail/' + id).subscribe(function (data) {
        });
    };
    NotificationManagerComponent.prototype.deleteConfirm = function (id) {
        this.selectedId = id;
    };
    NotificationManagerComponent.prototype.doDelete = function () {
        var _this = this;
        this.showloader = true;
        this._http.delete('api/Message/Delete/' + this.selectedId).subscribe(function (result) {
            _this.showloader = false;
            if (result["succeed"] == true)
                if (result["result"] == true)
                    _this.toastrService.success(_this.translate.instant("MessageDeleteCompletedSuccessfully"), _this.translate.instant('Noticeable'));
                else
                    _this.toastrService.warning(_this.translate.instant(result["message"]), _this.translate.instant('Warning'));
            else
                _this.toastrService.error(_this.translate.instant('DatabaseActionError'), _this.translate.instant('Error'));
            _this.getMessage();
            $('#modal-default').modal('hide');
        }, function (error) { return console.log(error); });
    };
    NotificationManagerComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    NotificationManagerComponent.prototype.messageDecoding = function (message, ussd) {
        var _this = this;
        if (message != null) {
            message = message.trim();
            if (ussd === "SMS") {
                var messageList = message.split("+CMGL: ");
                var decodedMessages = [];
                messageList.forEach(function (i) {
                    if (i.length > 0) {
                        var upd = i.trim().split('\n');
                        if (upd.length > 1 && upd[1].length > 0) {
                            var msg = JSON.parse(_this._decoder.decode(upd[1], false));
                            if (msg.Success)
                                decodedMessages.push(msg);
                        }
                    }
                });
                var result;
                var SortedMessages = decodedMessages.sort(function (a, b) { return (a.PartNumber > b.PartNumber) ? 1 : -1; });
                SortedMessages.forEach(function (i) {
                    result += i.Message;
                });
                return result;
            }
            else {
                var msg = JSON.parse(this._decoder.decode(message, true));
                //if (msg.Success)
                return msg.Message;
            }
        }
    };
    NotificationManagerComponent.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_6__["LanguageService"] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"] },
        { type: _Shared_services_pdu_decoder_service__WEBPACK_IMPORTED_MODULE_8__["PduDecoderService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], { static: true }),
        __metadata("design:type", _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], NotificationManagerComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material_sort__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        __metadata("design:type", _angular_material_sort__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], NotificationManagerComponent.prototype, "sortAll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('input', { static: true }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], NotificationManagerComponent.prototype, "searchInput", void 0);
    NotificationManagerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notification-manager',
            template: __webpack_require__(/*! raw-loader!./notification-manager.component.html */ "./node_modules/raw-loader/index.js!./src/app/Reports/notification-manager/notification-manager.component.html"),
            styles: [__webpack_require__(/*! ./notification-manager.component.css */ "./src/app/Reports/notification-manager/notification-manager.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_6__["LanguageService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"],
            _Shared_services_pdu_decoder_service__WEBPACK_IMPORTED_MODULE_8__["PduDecoderService"]])
    ], NotificationManagerComponent);
    return NotificationManagerComponent;
}());



/***/ })

}]);
//# sourceMappingURL=Reports-Report-module-es5.js.map