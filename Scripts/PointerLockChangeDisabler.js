// ==UserScript==
// @name         PointerLockChange disabler
// @namespace    https://narrow.one/
// @version      20241216
// @description  Disabling Event Listener, so pressing ESC once releases your mouse, and only pressing twice opens the menu
// @author       Copilot
// @run-at       document-start
// @match        https://narrow.one/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @downloadURL  https://github.com/TheGirlThatLived/NarrowOne_Customizations/raw/refs/heads/main/Scripts/PointerLockChangeDisabler.js
// @updateURL    https://github.com/TheGirlThatLived/NarrowOne_Customizations/raw/refs/heads/main/Scripts/PointerLockChangeDisabler.js
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
