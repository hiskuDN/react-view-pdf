"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFWorker = void 0;
var React = require("react");
var PdfJs_1 = require("../utils/PdfJs");
var PDFWorker = function (_a) {
    var children = _a.children, workerUrl = _a.workerUrl;
    PdfJs_1.default.GlobalWorkerOptions.workerSrc = workerUrl;
    return React.createElement(React.Fragment, null, children);
};
exports.PDFWorker = PDFWorker;
//# sourceMappingURL=PDFWorker.js.map