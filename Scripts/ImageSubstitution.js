// ==UserScript==
// @name         Image substitution
// @namespace    http://tampermonkey.net/
// @version      20241217_1644
// @description  Hot-swap image assets on any website (general purpose)
// @author       Xeltalliv
// @match        https://narrow.one/*
// @icon         https://www.svgrepo.com/show/375090/replace.svg
// @downloadURL  https://github.com/TheGirlThatLived/NarrowOne_Customizations/raw/refs/heads/main/Scripts/ImageSubstitution
// @updateURL    https://github.com/TheGirlThatLived/NarrowOne_Customizations/raw/refs/heads/main/Scripts/ImageSubstitution
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const replacementTable = {
        "static/img/hudIcons/flagRed.svg": "https://thegirlthatlived.github.io/NarrowOne_Customizations/Assets/flagRed.svg",
        "static/img/hudIcons/flagBlue.svg": "https://thegirlthatlived.github.io/NarrowOne_Customizations/Assets/flagBlue.svg",
        "static/img/hudIcons/playerIcon.svg": "https://thegirlthatlived.github.io/NarrowOne_Customizations/Assets/playerIcon.svg",
    }
    const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
    Object.defineProperty(HTMLImageElement.prototype, "src", {
        set(value) {
            //console.log(value); // uncomment to determine what the values should be
            if (replacementTable[value]) this.crossOrigin = "anonymous";
            originalSrcDescriptor.set.call(this, replacementTable[value] ?? value);
        },
        get() {
            return originalSrcDescriptor.get.call(this);
        }
    });
})();
