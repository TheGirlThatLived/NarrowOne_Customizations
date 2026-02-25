// ==UserScript==
// @name         Theme (Vertigo)
// @namespace    http://tampermonkey.net/
// @version      20260220
// @description  Move UI elements to screen's vertical edges.
// @author       LeopardDesNeiges
// @run-at       document-start
// @match        https://narrow.one/*
// @icon         https://fontsaddict.com/icon/download/svg/skyscraper-buildings.svg
// @downloadURL  https://TheGirlThatLived.github.io/NarrowOne_Customizations/Styles/Theme(Vertigo).js
// @updateURL    https://TheGirlThatLived.github.io/NarrowOne_Customizations/Styles/Theme(Vertigo).js
// @grant        unsafeWindow
// @connect      TheGirlThatLived.github.io
// ==/UserScript==
(function() {
    'use strict';
    // Set of helper functions
    const customStylesheets = [];
    function finalizeApplyingConstructedStylesheets() {
        window.addEventListener("load", function () {
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...customStylesheets];
        });
    }
    function addScriptFromURL(url) {
        const scriptElement = document.createElement('script');
        scriptElement.src = url;
        document.head.appendChild(scriptElement);
    }
    function addStyleFromURL(url) {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = url;
        document.body.appendChild(linkElement);
    }
    function addStyleFromText(text) {
        const styleElement = document.createElement('style');
        styleElement.textContent = text;
        document.body.appendChild(styleElement);
    }
    async function addConstructedStyleFromURL(url) {
        const response = await fetch(url);
        const text = await response.text();
        const css = new CSSStyleSheet();
        css.replaceSync(text);
        customStylesheets.push(css);
    }
    function addConstructedStyleFromText(text) {
        const css = new CSSStyleSheet();
        css.replaceSync(text);
        customStylesheets.push(css);
    }
    // Content
    async function fetchAndApplyCSS() {
        addStyleFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Styles/CSS-Theme(Vertigo).css');
        //addConstructedStyleFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Styles/CSS-Theme(ViolentGlass).css');
    }
    // Apply changes
    fetchAndApplyCSS(); fetchAndApplyIMG(); fetchAndApplyJS();
    // Mandatory end
    finalizeApplyingConstructedStylesheets();
})();
