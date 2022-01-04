"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function() {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] },
        f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

    function verb(n) { return function(v) { return step([n, v]); }; }

    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return { value: op[1], done: false };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];
            y = 0;
        } finally { f = t = 0; }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function(to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFViewer = void 0;
var React = require("react");
var precise_ui_1 = require("precise-ui");
var PdfJs_1 = require("../utils/PdfJs");
var Page_1 = require("../types/Page");
var PDFViewerPage_1 = require("./PDFViewerPage");
var hacks_1 = require("../utils/hacks");
var PDFViewerToolbar_1 = require("./PDFViewerToolbar");
var PDFViewerTouchToolbar_1 = require("./PDFViewerTouchToolbar");
var PDFWorker_1 = require("./PDFWorker");
var DocumentWrapper = precise_ui_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: #fff;\n  position: relative;\n  width: 100%;\n  // Thanks chrome for Android for not calculating the viewport size correctly depending\n  // on whether you show or not the address bar. But no worries, we'll do it manually\n  // We also set 2 times the padding-top for those browsers without var or min compatibility\n  padding-top: 56.25%;\n  padding-top: min(56.25%, calc(var(--vh, 1vh) * 90)); /* 16:9 Aspect Ratio */\n  overflow: hidden;\n\n  ", ";\n"], ["\n  background-color: #fff;\n  position: relative;\n  width: 100%;\n  // Thanks chrome for Android for not calculating the viewport size correctly depending\n  // on whether you show or not the address bar. But no worries, we'll do it manually\n  // We also set 2 times the padding-top for those browsers without var or min compatibility\n  padding-top: 56.25%;\n  padding-top: min(56.25%, calc(var(--vh, 1vh) * 90)); /* 16:9 Aspect Ratio */\n  overflow: hidden;\n\n  ", ";\n"])), function(_a) {
    var fullscreen = _a.fullscreen;
    return fullscreen &&
        "\n      padding-top: 0;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      height: auto;\n      position: fixed;\n      z-index: 100500;\n    ";
});
var Document = precise_ui_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 40px;\n  right: 0;\n  background-color: ", ";\n  padding: ", ";\n  overflow: scroll;\n  touch-action: pan-x pan-y;\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 40px;\n  right: 0;\n  background-color: ", ";\n  padding: ", ";\n  overflow: scroll;\n  touch-action: pan-x pan-y;\n"])), (0, precise_ui_1.themed)(function(_a) {
    var _b = _a.theme,
        theme = _b === void 0 ? {} : _b;
    return theme.ui2;
}), precise_ui_1.distance.medium);
var PageWrapper = precise_ui_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n"])));
// const defaultWorkerUrl = 'https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js';
var defaultWorkerUrl = 'https://unpkg.com/pdfjs-dist@2.12.313/legacy/build/pdf.worker.js';
/**
 * The `Document` is a wrapper to load PDFs and render all the pages
 */
var PDFViewer = function(props) {
    var url = props.url,
        _a = props.workerUrl,
        workerUrl = _a === void 0 ? defaultWorkerUrl : _a;
    var documentRef = React.useRef();
    var _b = React.useState(),
        document = _b[0],
        setDocument = _b[1];
    var _c = React.useState(true),
        loading = _c[0],
        setLoading = _c[1];
    var _d = React.useState([]),
        pages = _d[0],
        setPages = _d[1];
    var _e = React.useState(1),
        currentPage = _e[0],
        setCurrentPage = _e[1];
    var _f = React.useState(Page_1.PageViewMode.DEFAULT),
        currentViewMode = _f[0],
        setCurrentViewMode = _f[1];
    var _g = React.useState(1),
        currentScale = _g[0],
        setCurrentScale = _g[1];
    var _h = React.useState(false),
        fullscreen = _h[0],
        setFullscreen = _h[1];
    var deviceAgent = navigator.userAgent.toLowerCase();
    var isTouchDevice = deviceAgent.match(/(iphone|ipod|ipad)/) ||
        deviceAgent.match(/(android)/) ||
        deviceAgent.match(/(iemobile)/) ||
        deviceAgent.match(/iphone/i) ||
        deviceAgent.match(/ipad/i) ||
        deviceAgent.match(/ipod/i) ||
        deviceAgent.match(/blackberry/i) ||
        deviceAgent.match(/bada/i) ||
        (deviceAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2); // iPad PRO, apple thinks it should behave like a desktop Safari, and so here we are...
    /**
     * Every time a new file is set we load the new document
     */
    React.useEffect(function() {
        loadDocument();
    }, [url]);
    /**
     * Effect to re-calculate page size and re-render after entering / exiting fullscreen
     */
    React.useEffect(function() {
        zoomToPageView(pages[currentPage - 1], currentViewMode);
    }, [fullscreen]);
    /**
     * Effect responsible for registering/unregistering the resize spy to determine the rendering sizes
     */
    React.useLayoutEffect(function() {
        var handleResize = (0, precise_ui_1.debounce)(function() {
            zoomToPageView(pages[currentPage - 1], currentViewMode);
            // Fix chrome on Android address bar issue by setting the right viewport height with good old fashion JS
            // Then we set the value in the --vh custom property to the root of the document
            var vh = window.innerHeight * 0.01;
            window.document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
        }, 500);
        window.addEventListener('resize', handleResize);
        return function() { return window.removeEventListener('resize', handleResize); };
    });
    React.useEffect(function() {
        props.onPageChanged && props.onPageChanged(currentPage, pages.length);
    }, [currentPage]);
    /**
     * Finds a document source.
     */
    function findDocumentSource(url) {
        return __awaiter(this, void 0, void 0, function() {
            var fileUint8Array;
            return __generator(this, function(_a) {
                if ((0, hacks_1.isDataURI)(url)) {
                    fileUint8Array = (0, hacks_1.dataURItoUint8Array)(url);
                    return [2 /*return*/ , { data: fileUint8Array }];
                }
                return [2 /*return*/ , { url: url }];
            });
        });
    }
    /**
     * Loads the PDF into the pdfjs library
     */
    function loadDocument() {
        return __awaiter(this, void 0, void 0, function() {
            var source, d, error_1;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        // Reset all values for the new document
                        setLoading(true);
                        setPages([]);
                        setCurrentScale(1);
                        setCurrentViewMode(Page_1.PageViewMode.FIT_TO_WIDTH);
                        setCurrentPage(1);
                        if (!url) {
                            return [2 /*return*/ ];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/ , findDocumentSource(url)];
                    case 2:
                        source = _a.sent();
                        return [4 /*yield*/ , PdfJs_1.default.getDocument(source).promise];
                    case 3:
                        d = _a.sent();
                        onLoadSuccess(d);
                        return [3 /*break*/ , 5];
                    case 4:
                        error_1 = _a.sent();
                        onLoadError(error_1);
                        return [3 /*break*/ , 5];
                    case 5:
                        return [2 /*return*/ ];
                }
            });
        });
    }
    /**
     * Event triggered when the document finished loading
     *
     * @param document
     */
    function onLoadSuccess(document) {
        setDocument(document);
        if (props.onLoadSuccess) {
            props.onLoadSuccess(document);
        }
        var _pages = __spreadArray([], new Array(document.numPages), true).map(function() {
            return {
                ratio: 0,
                loaded: false,
            };
        });
        setPages(_pages);
        setLoading(false);
    }
    /**
     * Even triggered in case the document failed to load
     *
     * @param error
     */
    function onLoadError(error) {
        setDocument(undefined);
        setLoading(false);
        if (props.onLoadError) {
            props.onLoadError(error);
        } else {
            throw error;
        }
    }
    /**
     * Touch events here
     */
    window['touchInfo'] = {
        startX: 0,
        startY: 0,
        startDistance: 0,
    };
    var touchInfo = window['touchInfo'];
    /**
     * Event triggered on double touch
     */
    function onDocumentDoubleTouch() {
        if (isTouchDevice) {
            switchFullscreenMode();
        }
    }
    var currentPinchScale = currentScale;
    /**
     * Event triggered when the user puts a finger on the screen
     * We only care here about events with 2 fingers on them so we can control pinch to zoom
     *
     * @param e
     */
    function onDocumentTouchStart(e) {
        if (e.touches.length > 1) {
            var startX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
            var startY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
            Object.assign(touchInfo, {
                startX: startX,
                startY: startY,
                startDistance: Math.hypot(e.touches[1].pageX - e.touches[0].pageX, e.touches[1].pageY - e.touches[0].pageY),
            });
        } else {
            Object.assign(touchInfo, {
                startX: 0,
                startY: 0,
                startDistance: 0,
            });
        }
    }
    /**
     * Event triggered when the user moves the finger around the screen
     * Since we only control pinch to zoom, we need to track how the distance between the fingers changed over time
     * Then we use that distance to calculate the relative scale and apply that scale using transforms
     * to avoid expensive re-renders, once the user let go the fingers we do a proper rendering of the PDF document
     *
     * @param e
     */
    function onDocumentTouchMove(e) {
        if (!isTouchDevice || touchInfo.startDistance <= 0 || e.touches.length < 2) {
            return;
        }
        var pinchDistance = Math.hypot(e.touches[1].pageX - e.touches[0].pageX, e.touches[1].pageY - e.touches[0].pageY);
        var originX = touchInfo.startX + documentRef.current.scrollLeft;
        var originY = touchInfo.startY + documentRef.current.scrollTop;
        currentPinchScale = pinchDistance / touchInfo.startDistance;
        // Adjust for min and max parameters over the absolute zoom (current zoom + pitch zoom)
        var absScale = currentPinchScale * currentScale;
        currentPinchScale = Math.min(Math.max(absScale, 0.2), 2.5) / currentScale;
        // Here we simulate the zooming effect with transform, not perfect, but better than a re-render
        documentRef.current.style.transform = "scale(".concat(currentPinchScale, ")");
        documentRef.current.style.transformOrigin = "".concat(originX, "px ").concat(originY, "px");
    }
    /**
     * Event triggered when the user ends a touch event
     * If all went good and we are ending a pinch to zoom event we need to queue a rendering of the PDF pages
     * using the new zoom level
     */
    function onDocumentTouchEnd() {
        if (!isTouchDevice || touchInfo.startDistance <= 0)
            return;
        documentRef.current.style.transform = "none";
        documentRef.current.style.transformOrigin = "unset";
        var rect = documentRef.current.getBoundingClientRect();
        var dx = touchInfo.startX - rect.left;
        var dy = touchInfo.startY - rect.top;
        // I don't like this, but we need to make sure we change the scrolling after the re-rendering with the new zoom levels
        setTimeout(function() {
            documentRef.current.scrollLeft += dx * (currentPinchScale - 1);
            documentRef.current.scrollTop += dy * (currentPinchScale - 1);
        }, 0);
        Object.assign(touchInfo, {
            startDistance: 0,
            startX: 0,
            startY: 0,
        });
        onScaleChange(currentPinchScale * currentScale);
    }
    /**
     * Event triggered when the touch event gets cancelled
     * In this case we need to restart our touchInfo data so other things can continue as they were
     */
    function onTouchCancel() {
        if (isTouchDevice) {
            Object.assign(touchInfo, {
                startDistance: 0,
                startX: 0,
                startY: 0,
            });
        }
    }
    /**
     * Event triggered when a page visibility changes
     *
     * @param pageNumber
     * @param ratio
     */
    var onPageVisibilityChanged = function(pageNumber, ratio) {
        // Ignore page change during pinch to zoom event
        // This needs to be done as page changes trigger a re-rendering
        // which conflicts with all the pinch to zoom events
        if (isTouchDevice && window['touchInfo'].startDistance > 0)
            return false;
        // Calculate in which page we are right now based on the scrolling position
        if (pages && pages.length) {
            pages[pageNumber - 1].ratio = ratio;
            var maxRatioPage = pages.reduce(function(maxIndex, item, index, array) {
                return item.ratio > array[maxIndex].ratio ? index : maxIndex;
            }, 0);
            setCurrentPage(maxRatioPage + 1);
        } else {
            setCurrentPage(1);
        }
        return true;
    };
    /**
     * Event triggered when a page loaded
     *
     * @param pageNumber
     * @param width
     * @param height
     */
    var onPageLoaded = function(pageNumber, width, height) {
        if (pages && pages.length) {
            pages[pageNumber - 1] = __assign(__assign({}, pages[pageNumber - 1]), { loaded: true, width: width, height: height });
            setPages(__spreadArray([], pages, true));
            // On the first time we default the view to the first page
            if (pageNumber === 1) {
                zoomToPageView(pages[0], currentViewMode);
            }
        }
    };
    /**
     * End of Touch events
     */
    /**
     * Event triggered when the user manually changes the zoom level
     * @param scale
     */
    function onScaleChange(scale) {
        setCurrentViewMode(Page_1.PageViewMode.DEFAULT);
        zoomToScale(scale);
    }
    /**
     * Function used to navigate to a specific page
     *
     * @param pageNum
     */
    function navigateToPage(pageNum) {
        pageNum = Math.min(Math.max(pageNum, 1), pages.length);
        var ref = pages[pageNum - 1].ref; // Convert to index from pageNumber
        if (ref && documentRef.current) {
            setCurrentPage(pageNum);
            documentRef.current.scrollTo ?
                documentRef.current.scrollTo(0, ref.offsetTop - 20) :
                (documentRef.current.scrollTop = ref.offsetTop - 20);
        }
    }
    /**
     * Zooms the page to the given scale
     *
     * @param scale
     */
    function zoomToScale(scale) {
        setCurrentScale(Math.min(Math.max(scale, 0.2), 2.5));
    }
    /**
     * Zooms the page according to the page view mode
     *
     * @param pageProps
     * @param viewMode
     */
    function zoomToPageView(pageProps, viewMode) {
        if (!documentRef.current || !pageProps || !pageProps.ref) {
            return;
        }
        var pageElement = pageProps.ref.firstChild;
        var pageWidth = pageProps.width || pageElement.clientWidth;
        var pageHeight = pageProps.height || pageElement.clientHeight;
        var landscape = pageWidth > pageHeight;
        switch (viewMode) {
            case Page_1.PageViewMode.DEFAULT:
                {
                    if (landscape) {
                        var desiredWidth = Math.round(documentRef.current.clientWidth - 32);
                        zoomToScale(desiredWidth / pageWidth);
                    } else {
                        var desiredWidth = Math.round((documentRef.current.clientWidth - 32) * 0.7);
                        zoomToScale(desiredWidth / pageWidth);
                    }
                    break;
                }
            case Page_1.PageViewMode.FIT_TO_WIDTH:
                {
                    var desiredWidth = Math.round(documentRef.current.clientWidth - 32);
                    zoomToScale(desiredWidth / pageWidth);
                    break;
                }
            case Page_1.PageViewMode.FIT_TO_HEIGHT:
                {
                    var desiredHeight = Math.round(documentRef.current.clientHeight - 32);
                    zoomToScale(desiredHeight / pageHeight);
                    break;
                }
            default:
                break;
        }
    }
    /**
     * Event triggered when the view mode changes
     */
    function onViewModeChange(viewMode) {
        setCurrentViewMode(viewMode);
        zoomToPageView(pages[currentPage - 1], viewMode);
    }
    /**
     * Enables / Disables fullscreen mode
     */
    function switchFullscreenMode() {
        setFullscreen(!fullscreen);
    }
    return (React.createElement(PDFWorker_1.PDFWorker, { workerUrl: workerUrl },
        React.createElement(DocumentWrapper, { fullscreen: fullscreen },
            React.createElement(Document, { ref: documentRef, onTouchStart: onDocumentTouchStart, onTouchEnd: onDocumentTouchEnd, onTouchMove: onDocumentTouchMove, onTouchCancel: onTouchCancel, onDoubleClick: onDocumentDoubleTouch }, loading ? (React.createElement(PageWrapper, null,
                React.createElement(PDFViewerPage_1.PDFViewerPage, { onPageLoaded: onPageLoaded, onPageVisibilityChanged: onPageVisibilityChanged, pageNumber: 1, loaded: false, scale: 1 }))) : (document &&
                pages.map(function(_, index) {
                    return (React.createElement(PageWrapper, { ref: function(ref) { return (pages[index].ref = ref); }, key: index },
                        React.createElement(PDFViewerPage_1.PDFViewerPage, { onPageLoaded: onPageLoaded, onPageVisibilityChanged: onPageVisibilityChanged, disableSelect: props.disableSelect, document: document, loaded: pages[index].loaded, pageNumber: index + 1, scale: currentScale })));
                }))), !loading && !isTouchDevice && (React.createElement(PDFViewerToolbar_1.PDFViewerToolbar, { labels: props.toolbarLabels, currentPage: currentPage, currentViewMode: currentViewMode, numPages: pages.length, currentScale: currentScale, fullscreen: fullscreen, onPageChange: navigateToPage, onScaleChange: onScaleChange, onViewModeChange: onViewModeChange, onFullscreenChange: switchFullscreenMode })), !loading && isTouchDevice && (React.createElement(PDFViewerTouchToolbar_1.PDFViewerTouchToolbar, { labels: props.toolbarLabels, currentPage: currentPage, currentViewMode: currentViewMode, numPages: pages.length, currentScale: currentScale, fullscreen: fullscreen, onPageChange: navigateToPage, onScaleChange: onScaleChange, onViewModeChange: onViewModeChange, onFullscreenChange: switchFullscreenMode })))));
};
exports.PDFViewer = PDFViewer;
exports.PDFViewer.displayName = 'PDFViewer';
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=PDFViewer.js.map