// ==UserScript==
// @name         Theme (Wordington)
// @namespace    http://tampermonkey.net/
// @version      20241216_0730
// @description  Guest 0187's sexualized CSS edits.
// @author       Incredible_Violent
// @run-at       document-start
// @match        https://narrow.one/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=narrow.one
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/Theme(Wordington).js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/Theme(Wordington).js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
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
    // End of helper functions

    // Content
    async function fetchAndApplyCSS() {
        //addStyleFromURL('');
        addConstructedStyleFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/refs/heads/testing/Scripts/Theme(Wordington).js');
    }
    // Apply changes
    fetchAndApplyCSS();
    // Mandatory end
    finalizeApplyingConstructedStylesheets();
})();
