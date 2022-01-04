"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFViewerTouchToolbar = void 0;
var React = require("react");
var precise_ui_1 = require("precise-ui");
var Page_1 = require("../types/Page");
var Toolbar = precise_ui_1.styled.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  color: ", ";\n  padding: 0 ", ";\n  display: flex;\n  flex-direction: row;\n  list-style: none;\n  margin: 0;\n  position: relative;\n  align-items: center;\n  border-radius: 2px;\n"], ["\n  background-color: ", ";\n  color: ", ";\n  padding: 0 ", ";\n  display: flex;\n  flex-direction: row;\n  list-style: none;\n  margin: 0;\n  position: relative;\n  align-items: center;\n  border-radius: 2px;\n"])), (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b;
    return theme.ui5;
}), (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b;
    return theme.text4;
}), precise_ui_1.distance.medium);
var ToolbarWrapper = precise_ui_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n"], ["\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n"])));
var ToolbarItem = precise_ui_1.styled.li(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: list-item;\n  padding: ", " ", ";\n"], ["\n  display: list-item;\n  padding: ", " ", ";\n"])), precise_ui_1.distance.medium, precise_ui_1.distance.xxsmall);
var ToolbarSeparator = precise_ui_1.styled.li(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin: ", " ", ";\n  width: 1px;\n  overflow: hidden;\n  background-color: ", ";\n  height: 25px;\n"], ["\n  margin: ", " ", ";\n  width: 1px;\n  overflow: hidden;\n  background-color: ", ";\n  height: 25px;\n"])), precise_ui_1.distance.small, precise_ui_1.distance.medium, (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b;
    return theme.ui4;
}));
var ToolbarActionLink = (0, precise_ui_1.styled)(precise_ui_1.ActionLink)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  color: ", ";\n  display: flex;\n  align-items: center;\n  height: 16px;\n\n  :hover,\n  :visited,\n  :focus {\n    color: ", ";\n  }\n"], ["\n  color: ", ";\n  display: flex;\n  align-items: center;\n  height: 16px;\n\n  :hover,\n  :visited,\n  :focus {\n    color: ", ";\n  }\n"])), (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b, disabled = _a.disabled;
    return (disabled ? theme.text3 : theme.text4);
}), (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b, disabled = _a.disabled;
    return (disabled ? theme.text3 : theme.text4);
}));
var ToolbarSelect = precise_ui_1.styled.select(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: ", ";\n  font-size: 1rem;\n  border: none;\n  appearance: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');\n  background-color: ", ";\n  background-repeat: no-repeat, repeat;\n  background-size: 0.65em auto, 100%;\n  background-position: right center;\n  padding-right: 1rem;\n"], ["\n  color: ", ";\n  font-size: 1rem;\n  border: none;\n  appearance: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');\n  background-color: ", ";\n  background-repeat: no-repeat, repeat;\n  background-size: 0.65em auto, 100%;\n  background-position: right center;\n  padding-right: 1rem;\n"])), (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b, disabled = _a.disabled;
    return (disabled ? theme.text3 : theme.text4);
}), (0, precise_ui_1.themed)(function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b;
    return theme.ui5;
}));
var defaultLabels = {
    exitFullscreen: 'Exit Fullscreen',
    enterFullscreen: 'Enter Fullscreen',
    viewModeFitToHeight: 'Fit to Height',
    viewModeFitToWidth: 'Fit to Width',
    viewModeDefault: 'Custom View',
    nextPage: 'Next',
    prevPage: 'Previous',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    pagesOf: function (current, total) { return "".concat(current, " / ").concat(total); },
    page: 'Page',
};
/**
 * The `Document` is a wrapper to load PDFs and render all the pages
 */
var PDFViewerTouchToolbar = function (props) {
    var _a = props.labels, labels = _a === void 0 ? defaultLabels : _a, fullscreen = props.fullscreen, onFullscreenChange = props.onFullscreenChange, currentPage = props.currentPage;
    function onViewModeChange(viewMode) {
        switch (viewMode) {
            case Page_1.PageViewMode.FIT_TO_WIDTH.toString():
                props.onViewModeChange(Page_1.PageViewMode.FIT_TO_WIDTH);
                break;
            case Page_1.PageViewMode.FIT_TO_HEIGHT.toString():
                props.onViewModeChange(Page_1.PageViewMode.FIT_TO_HEIGHT);
                break;
            case Page_1.PageViewMode.DEFAULT.toString():
                props.onViewModeChange(Page_1.PageViewMode.DEFAULT);
                break;
        }
    }
    return (React.createElement(ToolbarWrapper, null,
        React.createElement(Toolbar, null,
            React.createElement(ToolbarItem, null,
                React.createElement(ToolbarActionLink, { onClick: function () { return props.onPageChange(currentPage - 1); }, disabled: currentPage <= 1 },
                    React.createElement(precise_ui_1.Icon, { name: "KeyboardArrowLeft" }))),
            React.createElement(ToolbarItem, null, labels.pagesOf(currentPage, props.numPages)),
            React.createElement(ToolbarItem, null,
                React.createElement(ToolbarActionLink, { onClick: function () { return props.onPageChange(currentPage + 1); }, disabled: currentPage >= props.numPages },
                    React.createElement(precise_ui_1.Icon, { name: "KeyboardArrowRight" }))),
            React.createElement(ToolbarSeparator, null),
            React.createElement(ToolbarItem, null,
                React.createElement(ToolbarSelect, { value: props.currentViewMode.toString(), onChange: function (e) { return onViewModeChange(e.target.value); } },
                    React.createElement("option", { value: Page_1.PageViewMode.FIT_TO_WIDTH.toString() }, labels.viewModeFitToWidth),
                    React.createElement("option", { value: Page_1.PageViewMode.FIT_TO_HEIGHT.toString() }, labels.viewModeFitToHeight),
                    React.createElement("option", { value: Page_1.PageViewMode.DEFAULT.toString() }, labels.viewModeDefault))),
            React.createElement(ToolbarSeparator, null),
            React.createElement(ToolbarItem, null,
                React.createElement(ToolbarActionLink, { onClick: onFullscreenChange },
                    React.createElement(precise_ui_1.Icon, { name: fullscreen ? 'FullscreenExit' : 'Fullscreen', size: "24px" }))))));
};
exports.PDFViewerTouchToolbar = PDFViewerTouchToolbar;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=PDFViewerTouchToolbar.js.map