// ==UserScript==
// @name         Theme (Violent Glass)
// @namespace    http://tampermonkey.net/
// @version      20241216_2225
// @description  Guest 0187's personalized UI edits.
// @author       Incredible_Violent; Xeltalliv; Pratik; Systummm; Blazyst; Riptide; Razgriz; PING 18
// @run-at       document-start
// @match        https://narrow.one/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=narrow.one
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/Theme(ViolentGlass).js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/Theme(ViolentGlass).js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        unsafeWindow
// ==/UserScript==
(function() {
    'use strict';
    function fetchAndApplyCSS() {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://TheGirlThatLived.github.io/NarrowOne_Customizations/Styles/CSS-Theme(ViolentGlass).css';
        document.body.appendChild(linkElement);
    }
    function fetchAndApplyIMG() {
        const imgElement1 = document.createElement('img');
        imgElement.src = 'https://TheGirlThatLived.github.io/NarrowOne_Customizations/Assets/ViolentGlass.svg';
        imgElement.style.position = 'fixed';
        imgElement.style.bottom = '3%';
        imgElement.style.right = '0%';
        imgElement.style.zIndex = '9999';
        imgElement.style.pointerEvents = 'none';
        imgElement.setAttribute('width', '14%');
        imgElement.setAttribute('height', '14%');
        imgElement.style.animation = 'blinking 60s infinite';
        document.body.appendChild(imgElement1);
        const imgElement2 = document.createElement('img');
        imgElement.src = 'https://TheGirlThatLived.github.io/NarrowOne_Customizations/Assets/crosshair(greenDot).svg';
        document.body.appendChild(imgElement2);
        //document.querySelector('.crosshair-container');
        //document.querySelector('.crosshair-container').innerHTML = ``;
    }
    function fetchAndApplyJS() {
        const scriptElement1 = document.createElement('script');
        scriptElement.src = 'https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/HealthBarPercentage.js';
        document.head.appendChild(scriptElement1);
        const scriptElement2 = document.createElement('script');
        scriptElement.src = 'https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/FlagsScoreUI.js';
        document.head.appendChild(scriptElement2);
        const scriptElement3 = document.createElement('script');
        scriptElement.src = 'https://TheGirlThatLived.github.io/NarrowOne_Customizations/Scripts/CustomHealthBar.js';
        document.head.appendChild(scriptElement3);
    }
    fetchAndApplyCSS();
    fetchAndApplyJS();
    fetchAndApplyIMG();
})();
