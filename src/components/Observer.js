"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('intersection-observer');
var React = require("react");
var Observer = function (_a) {
    var children = _a.children, threshold = _a.threshold, onVisibilityChanged = _a.onVisibilityChanged;
    var containerRef = React.useRef(undefined);
    React.useEffect(function () {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var isVisible = entry.isIntersecting;
                var ratio = entry.intersectionRatio;
                onVisibilityChanged({ isVisible: isVisible, ratio: ratio });
            });
        }, {
            threshold: threshold || 0,
        });
        var container = containerRef.current;
        if (!container) {
            return;
        }
        io.observe(container);
        return function () {
            io.unobserve(container);
        };
    }, []);
    return React.createElement("div", { ref: containerRef }, children);
};
exports.default = Observer;
//# sourceMappingURL=Observer.js.map