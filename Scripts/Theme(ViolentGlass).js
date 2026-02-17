// ==UserScript==
// @name         Theme (Violent Glass)
// @namespace    http://tampermonkey.net/
// @version      20260214_1048
// @description  Guest 0187's personalized CSS edits loader.
// @author       Incredible_Violent; Xeltalliv; Lord Graz; Pratik; Systummm; Ansy; Blazyst; Riptide; Razgriz; PING 18
// @run-at       document-start
// @match        https://narrow.one/*
// @icon         https://TheGirlThatLived.github.io/NarrowOne_Customizations/Assets/ViolentGlass.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/Theme(ViolentGlass).js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/Theme(ViolentGlass).js
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
    // End of helper functions


    // Content
    async function fetchAndApplyCSS() {
        addStyleFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Styles/CSS-Theme(ViolentGlass).css');
        addStyleFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Styles/CSS-Theme(MapSelect).css');
        //addConstructedStyleFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Styles/CSS-Theme(ViolentGlass).css');
    }
    function fetchAndApplyIMG() {
        const imgElement1 = document.createElement('img');
        imgElement1.classList.add('watermark');
        imgElement1.src = 'https://TheGirlThatLived.github.io/NarrowOne_Customizations/Assets/violentGlass.svg';
        document.body.appendChild(imgElement1);
        addConstructedStyleFromText(`
        .watermark {
            position: fixed;
            bottom: 3%;
            right: 0%;
            z-index: 9999;
            pointer-events: none;
            width: 14%;
            height: 14%;
            animation: blinking 60s infinite;
        }
        `);
    }
    function fetchAndApplyJS() {
        addScriptFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/ImageSubstitution.js');
        // addScriptFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/CustomHealthBar(ViolentGlass).js'); // Doesn't load half the time
        addScriptFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/HealthBarPercentage.js');
        // addScriptFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/FlagsScoreUI.js'); // Broken
        addScriptFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/DotCrosshair.js');
    }

    // Apply changes
    fetchAndApplyCSS(); fetchAndApplyIMG(); fetchAndApplyJS();

    // Mandatory end
    finalizeApplyingConstructedStylesheets();
})();
