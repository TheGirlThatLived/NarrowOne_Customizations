// ==UserScript==
// @name         Theme (Violent Glass)
// @namespace    http://tampermonkey.net/
// @version      20260302_0231
// @description  Guest 0187's personalized CSS edits loader.
// @author       Incredible_Violent; Xeltalliv; Lord Graz; Shart; Pratik; Systummm; Ansy; Blazyst; Riptide; Razgriz; PING 18
// @run-at       document-start
// @match        https://narrow.one/*
// @icon         https://TheGirlThatLived.github.io/NarrowOne_Customizations/Assets/violentGlass.svg
// @downloadURL  https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/Theme(ViolentGlass).js
// @updateURL    https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/Theme(ViolentGlass).js
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
        // Here, you can delete lines with links to functions you don't want.
        addStyleFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Styles/CSS-Theme(ViolentGlass).css'); // Stained glass on windows and buttons, hiding unnecessary elements and many more.
        addStyleFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Styles/CSS-Theme(StretchedGrids).css'); // Wider selection screens for maps and shop prsesets.
        addStyleFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Styles/CSS-Theme(FloatingChat).css'); // Wider chat box without background.
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
            bottom: -2%;
            right: 44.5%;
            z-index: 9999;
            pointer-events: none;
            width: 11%;
            height: 11%;
            animation: blinking 60s infinite;
        }
        `);
    }
    function fetchAndApplyJS() {
        // Here, you can delete lines with links to functions you don't want.
        addScriptFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/ImageSubstitution.js'); // Custom icon indicators
        // addScriptFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/HealthBarPercentage.js'); // Add text display of health points to existing HP bar
        addScriptFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/CustomHealthBar(Cross).js'); // Alternative health bar combined with flag score
        addScriptFromURL('https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/DotCrosshair.js'); // Green dot crosshair
    }

    // Apply changes
    fetchAndApplyCSS(); fetchAndApplyIMG(); fetchAndApplyJS();

    // Mandatory end
    finalizeApplyingConstructedStylesheets();
})();
