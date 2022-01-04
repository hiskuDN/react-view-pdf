"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamel = exports.throttle = exports.dataURItoUint8Array = exports.isDataURI = exports.range = void 0;
/**
 * Produces an array with N items, the value of each item is n
 *
 * @param i: Length of the array to be generated
 */
function range(i) {
    return i ? range(i - 1).concat(i) : [];
}
exports.range = range;
/**
 * Checks whether a string provided is a data URI.
 *
 * @param {String} str String to check
 */
var isDataURI = function (str) { return /^data:/.test(str); };
exports.isDataURI = isDataURI;
var dataURItoUint8Array = function (dataURI) {
    if (!(0, exports.isDataURI)(dataURI)) {
        throw new Error('dataURItoUint8Array was provided with an argument which is not a valid data URI.');
    }
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    }
    else {
        byteString = unescape(dataURI.split(',')[1]);
    }
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    return ia;
};
exports.dataURItoUint8Array = dataURItoUint8Array;
/**
 * Throttles a function call
 *
 * @param func
 * @param limit
 */
function throttle(func, limit) {
    if (limit === void 0) { limit = 1000; }
    var inThrottle = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function () { return (inThrottle = false); }, limit);
        }
    };
}
exports.throttle = throttle;
/**
 * Converts SnakeCase to Camelcase
 * @param s
 */
function toCamel(s) {
    var camel = s.toLowerCase().replace(/([-_][a-z])/gi, function ($1) {
        return $1
            .toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
    return camel.charAt(0).toUpperCase() + camel.slice(1);
}
exports.toCamel = toCamel;
//# sourceMappingURL=hacks.js.map