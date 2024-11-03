// ==UserScript==
// @name         PointerLockChange disabler
// @namespace    https://narrow.one/
// @version      2024-11-03
// @description  Disabling Event Listener, so pressing ESC once releases your mouse, and only pressing twice opens the menu
// @author       Copilot
// @run-at       document-start
// @match        https://narrow.one/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type == 'pointerlockchange') return;
        if (type == 'mousemove') {
            if (listener.toString().includes('this.mouseIsOnDocument')) {
                const originalListener = listener;
                listener = function(event) {
                    if (document.pointerLockElement) originalListener.call(this, event);
                }
            }
        }
        originalAddEventListener.call(this, type, listener, options);
    };
})();
