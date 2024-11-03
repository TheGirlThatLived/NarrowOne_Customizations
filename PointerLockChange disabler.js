// ==UserScript==
// @name         PointerLockChange disabler
// @namespace    https://narrow.one/
// @version      2024-11-03
// @description  Disabling Event Listener, so pressing ESC once releases your mouse, and only pressing twice opens the menu
// @author       Copilot
// @match        https://narrow.one/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    // Save original addEventListener function
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type !== 'pointerlockchange') {
            originalAddEventListener.call(this, type, listener, options);
        }
    };
})();
