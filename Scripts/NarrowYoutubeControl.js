// ==UserScript==
// @name         N1 YouTube Control
// @namespace    http://tampermonkey.net/
// @version      2025-01-11
// @description  Open playlist on YT, play N1, have videos paused and resumed automatically (or using K key). Works with other Poki games as well, but may get you banned there.
// @author       Xeltalliv
// @match        https://narrow.one/*
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.youtube.com
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/NarrowYoutubeControl.js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/NarrowYoutubeControl.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.hostname === 'narrow.one') {
        function startStop() {
            GM_setValue("startStop", Date.now());
        }
        function next() {
            GM_setValue("next", Date.now());
        }
        window.addEventListener("keydown", (event) => {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'INPUT') return;
            if (activeElement.tagName === 'TEXTAREA') return;
            if (activeElement.getAttribute('contenteditable') === 'true') return;
            if (event.code === "KeyK") startStop();
            if (event.code === "KeyL") next();
        });
        setTimeout(() => {
            const PokiSDK = unsafeWindow.PokiSDK;
            Object.defineProperty(PokiSDK, 'gameplayStart', {
                value: new Proxy(PokiSDK.gameplayStart, {
                    apply(target, thisArg, argumentsList) {
                        startStop();
                        return target.apply(thisArg, argumentsList);
                    }
                })
            });
            Object.defineProperty(PokiSDK, 'gameplayStop', {
                value: new Proxy(PokiSDK.gameplayStop, {
                    apply(target, thisArg, argumentsList) {
                        startStop();
                        return target.apply(thisArg, argumentsList);
                    }
                })
            });
        }, 3000);
    }
    if (window.location.hostname === 'www.youtube.com') {
        GM_addValueChangeListener("startStop", (name, oldValue, newValue, remote) => {
            if (!remote) return;
            Array.from(document.getElementsByClassName("ytp-play-button")).at(-1).click()
        });
        GM_addValueChangeListener("next", (name, oldValue, newValue, remote) => {
            if (!remote) return;
            Array.from(document.getElementsByClassName("ytp-next-button")).at(-1).click()
        });
    }
})();
