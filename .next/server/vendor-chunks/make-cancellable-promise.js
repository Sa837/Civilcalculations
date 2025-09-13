"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/make-cancellable-promise";
exports.ids = ["vendor-chunks/make-cancellable-promise"];
exports.modules = {

/***/ "(ssr)/./node_modules/make-cancellable-promise/dist/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/make-cancellable-promise/dist/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ makeCancellablePromise)\n/* harmony export */ });\nfunction makeCancellablePromise(promise) {\n    let isCancelled = false;\n    const wrappedPromise = new Promise((resolve, reject) => {\n        promise\n            .then((value) => !isCancelled && resolve(value))\n            .catch((error) => !isCancelled && reject(error));\n    });\n    return {\n        promise: wrappedPromise,\n        cancel() {\n            isCancelled = true;\n        },\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWFrZS1jYW5jZWxsYWJsZS1wcm9taXNlL2Rpc3QvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2l2aWwtY2FsY3VsYXRpb24vLi9ub2RlX21vZHVsZXMvbWFrZS1jYW5jZWxsYWJsZS1wcm9taXNlL2Rpc3QvaW5kZXguanM/ZjFjOCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlQ2FuY2VsbGFibGVQcm9taXNlKHByb21pc2UpIHtcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBjb25zdCB3cmFwcGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiAhaXNDYW5jZWxsZWQgJiYgcmVzb2x2ZSh2YWx1ZSkpXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAhaXNDYW5jZWxsZWQgJiYgcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvbWlzZTogd3JhcHBlZFByb21pc2UsXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/make-cancellable-promise/dist/index.js\n");

/***/ })

};
;