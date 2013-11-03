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
        this._currentPosition = {x: 0, y: 0};
    };

    Mouse.prototype.moveInsideDrawingArea = function (x, y) {
        this._currentPosition = this._drawingArea.pageOffset({x: x, y: y});
        sendEventToElementAtPosition("mousemove", this._currentPosition);
    };

    Mouse.prototype.leaveDrawingArea = function (x, y) {
        this.moveInsideDrawingArea(x, y);
    };

    Mouse.prototype.leaveWindow = function () {
        this._currentPosition = {x: -1, y: -1};
    };

    Mouse.prototype.pressButton = function () {
        sendEventToElementAtPosition("mousedown", this._currentPosition);
    };

    Mouse.prototype.letGoOfButton = function () {
        sendEventToElementAtPosition("mouseup", this._currentPosition);
    };

    function sendEventToElementAtPosition(eventType, position) {
        var Event = new MouseEvent(eventType, {
            'view': window,
            'bubbles': true,
            'cancelable': true,
            'clientX': position.x,
            'clientY': position.y
        });

        var element = document.elementFromPoint(position.x, position.y) || window;
        dump(position);
        dump("Elem: " + element.tagName);
        element.dispatchEvent(Event);
    }

}());