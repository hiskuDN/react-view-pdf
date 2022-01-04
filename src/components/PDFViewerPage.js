"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFViewerPage = void 0;
var React = require("react");
var precise_ui_1 = require("precise-ui");
var use_debounce_1 = require("use-debounce");
var hacks_1 = require("../utils/hacks");
var Observer_1 = require("./Observer");
var Page = precise_ui_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: auto auto ", ";\n  user-select: ", ";\n  display: block;\n  background-color: ", ";\n  box-shadow: rgba(172, 181, 185, 0.4) 0 0 8px 0;\n"], ["\n  margin: auto auto ", ";\n  user-select: ", ";\n  display: block;\n  background-color: ", ";\n  box-shadow: rgba(172, 181, 185, 0.4) 0 0 8px 0;\n"])), precise_ui_1.distance.xlarge, function (props) { return props.disableSelect && 'none'; }, (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b;
    return theme.ui1;
}));
/**
 * The `Document` is a wrapper to load PDFs and render all the pages
 */
var PDFViewerPageInner = function (props) {
    var document = props.document, pageNumber = props.pageNumber, scale = props.scale, onPageVisibilityChanged = props.onPageVisibilityChanged, onPageLoaded = props.onPageLoaded, loaded = props.loaded;
    var _a = React.useState(), page = _a[0], setPage = _a[1];
    var _b = React.useState(false), isCalculated = _b[0], setIsCalculated = _b[1];
    var canvasRef = React.createRef();
    var renderTask = React.useRef();
    var debouncedLoad = (0, use_debounce_1.useDebouncedCallback)(function () { return loadPage(); }, 100, { leading: true });
    var debouncedRender = (0, use_debounce_1.useDebouncedCallback)(function () { return renderPage(); }, 100, { leading: true });
    var intersectionThreshold = __spreadArray([], Array(10), true).map(function (_, i) { return i / 10; });
    React.useEffect(function () {
        debouncedRender();
    }, [page, scale]);
    function loadPage() {
        if (document && !page && !isCalculated) {
            setIsCalculated(true);
            document.getPage(pageNumber).then(function (page) {
                var viewport = page.getViewport({ scale: 1 });
                onPageLoaded(pageNumber, viewport.width, viewport.height);
                setPage(page);
            });
        }
    }
    function renderPage() {
        if (page) {
            var task = renderTask.current;
            if (task) {
                task.cancel();
            }
            var canvasEle = canvasRef.current;
            if (!canvasEle) {
                return;
            }
            var viewport = page.getViewport({ scale: scale });
            canvasEle.height = viewport.height;
            canvasEle.width = viewport.width;
            var canvasContext = canvasEle.getContext('2d', { alpha: false });
            renderTask.current = page.render({
                canvasContext: canvasContext,
                viewport: viewport,
            });
            renderTask.current.promise.then(
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            function () { }, 
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            function () { });
        }
    }
    function visibilityChanged(params) {
        var ratio = params.isVisible ? params.ratio : 0;
        var changed = onPageVisibilityChanged(pageNumber, ratio);
        if (params.isVisible && changed) {
            debouncedLoad();
        }
    }
    return (React.createElement(Page, { disableSelect: props.disableSelect, style: {
            width: !loaded && '70%',
            height: !loaded && '1200px',
            padding: !loaded && precise_ui_1.distance.large,
        } },
        React.createElement(Observer_1.default, { onVisibilityChanged: visibilityChanged, threshold: intersectionThreshold },
            !loaded && (React.createElement(React.Fragment, null,
                React.createElement(precise_ui_1.Skeleton, { width: "30%", height: "3em" }),
                React.createElement("br", null),
                React.createElement("br", null),
                (0, hacks_1.range)(5).map(function (index) { return (React.createElement(React.Fragment, { key: index },
                    React.createElement(precise_ui_1.Skeleton, { width: "80%", height: "1em" }),
                    React.createElement("br", null),
                    React.createElement(precise_ui_1.Skeleton, { width: "70%", height: "1em" }),
                    React.createElement("br", null),
                    React.createElement(precise_ui_1.Skeleton, { width: "85%", height: "1em" }),
                    React.createElement("br", null),
                    React.createElement(precise_ui_1.Skeleton, { width: "60%", height: "1em" }),
                    React.createElement("br", null),
                    React.createElement(precise_ui_1.Skeleton, { width: "80%", height: "1em" }),
                    React.createElement("br", null),
                    React.createElement(precise_ui_1.Skeleton, { width: "25%", height: "1em" }),
                    React.createElement("br", null),
                    React.createElement(precise_ui_1.Skeleton, { width: "60%", height: "1em" }),
                    React.createElement("br", null),
                    React.createElement(precise_ui_1.Skeleton, { width: "38%", height: "1em" }),
                    React.createElement("br", null),
                    React.createElement(precise_ui_1.Skeleton, { width: "50%", height: "1em" }),
                    React.createElement("br", null))); }))),
            React.createElement("canvas", { ref: canvasRef }))));
};
function areEqual(prevProps, nextProps) {
    return (prevProps.pageNumber === nextProps.pageNumber &&
        prevProps.disableSelect === nextProps.disableSelect &&
        prevProps.document === nextProps.document &&
        prevProps.loaded === nextProps.loaded &&
        (!nextProps.loaded || prevProps.scale === nextProps.scale) // if it's loading ignore the scale
    );
}
exports.PDFViewerPage = React.memo(PDFViewerPageInner, areEqual);
var templateObject_1;
//# sourceMappingURL=PDFViewerPage.js.map