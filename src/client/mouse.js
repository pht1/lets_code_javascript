/*global MouseEvent */

(function () {
    "use strict";

    var HtmlElement = require("./html_element.js");

    var Mouse = module.exports = function () {
        var drawingAreaDom = document.getElementById("drawingArea");
        if (!drawingAreaDom) {
            throw new Error("Unable to find drawingArea in the document");
        }
        this._drawingArea = new HtmlElement(drawingAreaDom);
        this._body = new HtmlElement(document.body);
        this._currentPosition = {x: 0, y: 0};
    };

    Mouse.prototype.moveInsideDrawingArea = function (x, y) {
        this._currentPosition = this._drawingArea.pageOffset({x: x, y: y});
        sendEventToElementAtPosition("mousemove", this);
    };

    Mouse.prototype.leaveDrawingArea = function (x, y) {
        this.moveInsideDrawingArea(x, y);
    };

    Mouse.prototype.leaveWindow = function () {
        this._currentPosition = {x: -1, y: -1};
    };

    Mouse.prototype.pressButton = function () {
        sendEventToElementAtPosition("mousedown", this);
    };

    Mouse.prototype.letGoOfButton = function () {
        sendEventToElementAtPosition("mouseup", this);
    };

    function sendEventToElementAtPosition(eventType, self) {
        var Event = new MouseEvent(eventType, {
            'view': window,
            'bubbles': true,
            'cancelable': true,
            'clientX': self._currentPosition.x,
            'clientY': self._currentPosition.y
        });

        var element = self._drawingArea.inside(self._currentPosition) ? self._drawingArea.toDomElement()
                    : self._body.inside(self._currentPosition) ? self._body.toDomElement()
                    : window;
        element.dispatchEvent(Event);
    }

}());