"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFViewerToolbar = void 0;
var React = require("react");
var precise_ui_1 = require("precise-ui");
var Page_1 = require("../types/Page");
var hacks_1 = require("../utils/hacks");
var Toolbar = precise_ui_1.styled.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  color: ", ";\n  padding: 0 ", ";\n  display: flex;\n  flex-direction: row;\n  list-style: none;\n  margin: 0;\n  border-radius: 2px;\n  align-items: center;\n\n  position: relative;\n"], ["\n  background-color: ", ";\n  color: ", ";\n  padding: 0 ", ";\n  display: flex;\n  flex-direction: row;\n  list-style: none;\n  margin: 0;\n  border-radius: 2px;\n  align-items: center;\n\n  position: relative;\n"])), (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b;
    return theme.ui5;
}), (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b;
    return theme.text4;
}), precise_ui_1.distance.medium);
var ToolbarWrapper = precise_ui_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n"], ["\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n"])));
var ToolbarItem = precise_ui_1.styled.li(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: list-item;\n  padding: ", " ", ";\n  height: 25px;\n  display: flex;\n  align-items: center;\n\n  & div {\n    display: flex;\n  }\n"], ["\n  display: list-item;\n  padding: ", " ", ";\n  height: 25px;\n  display: flex;\n  align-items: center;\n\n  & div {\n    display: flex;\n  }\n"])), precise_ui_1.distance.medium, precise_ui_1.distance.xxsmall);
var ToolbarSeparator = precise_ui_1.styled.li(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin: ", " ", ";\n  width: 1px;\n  overflow: hidden;\n  background-color: ", ";\n  height: 25px;\n"], ["\n  margin: ", " ", ";\n  width: 1px;\n  overflow: hidden;\n  background-color: ", ";\n  height: 25px;\n"])), precise_ui_1.distance.small, precise_ui_1.distance.medium, (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b;
    return theme.ui4;
}));
var ToolbarTextField = precise_ui_1.styled.input(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  border: 0;\n  padding: 0;\n  height: 21px;\n  width: 3em;\n"], ["\n  border: 0;\n  padding: 0;\n  height: 21px;\n  width: 3em;\n"])));
var ToolbarDropdownListItem = precise_ui_1.styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  padding: ", " ", ";\n  background-color: ", ";\n  white-space: nowrap;\n"], ["\n  padding: ", " ", ";\n  background-color: ", ";\n  white-space: nowrap;\n"])), precise_ui_1.distance.small, precise_ui_1.distance.medium, (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b;
    return theme.ui5;
}));
var ToolbarTooltip = (0, precise_ui_1.styled)(precise_ui_1.Tooltip)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-size: 0.8em;\n  white-space: nowrap;\n"], ["\n  font-size: 0.8em;\n  white-space: nowrap;\n"])));
var ToolbarActionLink = (0, precise_ui_1.styled)(precise_ui_1.ActionLink)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  color: ", ";\n  display: flex;\n  align-items: center;\n  height: 16px;\n\n  :hover,\n  :visited,\n  :focus {\n    color: ", ";\n  }\n"], ["\n  color: ", ";\n  display: flex;\n  align-items: center;\n  height: 16px;\n\n  :hover,\n  :visited,\n  :focus {\n    color: ", ";\n  }\n"])), (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b, disabled = _a.disabled;
    return (disabled ? theme.text3 : theme.text4);
}), (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b, disabled = _a.disabled;
    return (disabled ? theme.text3 : theme.text4);
}));
var defaultLabels = {
    exitFullscreen: 'Exit Fullscreen',
    enterFullscreen: 'Enter Fullscreen',
    viewModeFitToHeight: 'Fit to Height',
    viewModeFitToWidth: 'Fit to Width',
    nextPage: 'Next',
    prevPage: 'Previous',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    pagesOf: function (current, total) { return "Page ".concat(current, " of ").concat(total); },
    page: 'Page',
};
/**
 * The `Document` is a wrapper to load PDFs and render all the pages
 */
var PDFViewerToolbar = function (props) {
    var _a = props.labels, labels = _a === void 0 ? defaultLabels : _a, fullscreen = props.fullscreen, onFullscreenChange = props.onFullscreenChange, currentPage = props.currentPage, currentScale = props.currentScale;
    var pageInputRef = React.useRef();
    var _b = React.useState(), editingPageNumber = _b[0], SetEditingPageNumber = _b[1];
    var _c = React.useState(false), editingViewMode = _c[0], SetEditingViewMode = _c[1];
    /**
     * Returns the next view mode text to be used as tooltip
     */
    function getViewModeText() {
        return labels["viewMode".concat((0, hacks_1.toCamel)(Page_1.PageViewMode[props.currentViewMode >= 3 ? 0 : props.currentViewMode]))];
    }
    /**
     * Returns the next view mode text to be used as tooltip
     */
    function getViewModeIcon() {
        switch (props.currentViewMode) {
            case Page_1.PageViewMode.FIT_TO_WIDTH:
                return 'FitToWidth';
            case Page_1.PageViewMode.FIT_TO_HEIGHT:
                return 'FitToHeight';
            case Page_1.PageViewMode.DEFAULT:
                return 'Page';
        }
    }
    /**
     * Event triggered when the page number is clicked, thus entering page enter mode
     */
    function onPageNumberFocused() {
        SetEditingPageNumber(true);
    }
    React.useEffect(function () {
        if (pageInputRef.current) {
            pageInputRef.current.focus();
        }
    }, [pageInputRef, editingPageNumber]);
    /**
     * Event triggered when the page number field is blurred / changed
     */
    function onPageNumberDefocused() {
        SetEditingPageNumber(false);
        // Now let's check the value
        if (pageInputRef.current && pageInputRef.current.value !== '') {
            var inputPage = Number(pageInputRef.current.value);
            if (!isNaN(inputPage)) {
                props.onPageChange(inputPage);
            }
        }
    }
    function onViewModeChange(viewMode) {
        SetEditingViewMode(false);
        props.onViewModeChange(viewMode);
    }
    return (React.createElement(ToolbarWrapper, null,
        React.createElement(Toolbar, null,
            React.createElement(ToolbarItem, null,
                React.createElement(ToolbarTooltip, { content: labels.prevPage, position: "top", offset: 16 },
                    React.createElement(ToolbarActionLink, { onClick: function () { return props.onPageChange(currentPage - 1); }, disabled: currentPage <= 1 },
                        React.createElement(precise_ui_1.Icon, { name: "KeyboardArrowLeft" })))),
            React.createElement(ToolbarItem, null, editingPageNumber ? (React.createElement(React.Fragment, null,
                labels.page,
                " \u00A0",
                React.createElement(ToolbarTextField, { ref: pageInputRef, onBlur: onPageNumberDefocused, onKeyDown: function (e) { return e.key === 'Enter' && onPageNumberDefocused(); } }))) : (React.createElement("span", { onClick: onPageNumberFocused }, labels.pagesOf(currentPage, props.numPages)))),
            React.createElement(ToolbarItem, null,
                React.createElement(ToolbarTooltip, { content: labels.nextPage, position: "top", offset: 16 },
                    React.createElement(ToolbarActionLink, { onClick: function () { return props.onPageChange(currentPage + 1); }, disabled: currentPage >= props.numPages },
                        React.createElement(precise_ui_1.Icon, { name: "KeyboardArrowRight" })))),
            React.createElement(ToolbarSeparator, null),
            React.createElement(ToolbarItem, null,
                React.createElement(ToolbarTooltip, { content: labels.zoomOut, position: "top", offset: 16 },
                    React.createElement(ToolbarActionLink, { onClick: function () {
                            var scaleToPrev = Math.round((currentScale % 0.1) * 100) / 100;
                            props.onScaleChange(currentScale - (scaleToPrev === 0 ? 0.1 : scaleToPrev));
                        }, disabled: currentScale <= 0.5 },
                        React.createElement(precise_ui_1.Icon, { name: "Remove" })))),
            React.createElement(ToolbarItem, null,
                Math.round(currentScale * 100),
                "%"),
            React.createElement(ToolbarItem, null,
                React.createElement(ToolbarTooltip, { content: labels.zoomIn, position: "top", offset: 16 },
                    React.createElement(ToolbarActionLink, { onClick: function () {
                            var scaleToPrev = Math.round((currentScale % 0.1) * 100) / 100;
                            props.onScaleChange(currentScale + 0.1 - (scaleToPrev === 0.1 ? 0 : scaleToPrev));
                        }, disabled: currentScale >= 2.5 },
                        React.createElement(precise_ui_1.Icon, { name: "Add" })))),
            React.createElement(ToolbarItem, null,
                React.createElement(precise_ui_1.Flyout, { position: "top", noGutter: true, open: editingViewMode, offset: 16, theme: { flyout: { background: (0, precise_ui_1.themed)(function (_a) {
                                var _b = _a.theme, theme = _b === void 0 ? {} : _b;
                                return theme.ui5;
                            }) } }, content: React.createElement(React.Fragment, null,
                        React.createElement(ToolbarDropdownListItem, null,
                            React.createElement(ToolbarActionLink, { onClick: function () { return onViewModeChange(Page_1.PageViewMode.FIT_TO_WIDTH); } },
                                React.createElement(precise_ui_1.Icon, { name: "FitToWidth" }),
                                " ",
                                labels.viewModeFitToWidth)),
                        React.createElement(ToolbarDropdownListItem, { onClick: function () { return onViewModeChange(Page_1.PageViewMode.FIT_TO_HEIGHT); } },
                            React.createElement(ToolbarActionLink, null,
                                React.createElement(precise_ui_1.Icon, { name: "FitToHeight" }),
                                " ",
                                labels.viewModeFitToHeight))) },
                    React.createElement(ToolbarActionLink, { onClick: function () { return SetEditingViewMode(!editingViewMode); } },
                        React.createElement(precise_ui_1.Icon, { name: getViewModeIcon(), size: "24px" }),
                        getViewModeText(),
                        React.createElement(precise_ui_1.Icon, { name: editingViewMode ? 'ArrowDropUp' : 'ArrowDropDown', size: "24px" })))),
            React.createElement(ToolbarSeparator, null),
            React.createElement(ToolbarItem, null,
                React.createElement(ToolbarTooltip, { content: fullscreen ? labels.exitFullscreen : labels.enterFullscreen, position: "top", offset: 16 },
                    React.createElement(ToolbarActionLink, { onClick: onFullscreenChange },
                        React.createElement(precise_ui_1.Icon, { name: fullscreen ? 'FullscreenExit' : 'Fullscreen', size: "24px" })))))));
};
exports.PDFViewerToolbar = PDFViewerToolbar;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=PDFViewerToolbar.js.map