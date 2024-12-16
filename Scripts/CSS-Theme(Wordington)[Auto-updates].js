// ==UserScript==
// @name         CSS Theme (Wordington) [Auto-updates]
// @namespace    http://tampermonkey.net/
// @version      20241216_0730
// @description  Guest 0187's sexualized CSS edits.
// @author       Incredible_Violent
// @run-at       document-start
// @match        https://narrow.one/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=narrow.one
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/CSS-Theme(Wordington)%5BAuto-updates%5D.js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/CSS-Theme(Wordington)%5BAuto-updates%5D.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==
(function() {
    'use strict';
    // Function to fetch and apply CSS
    function fetchAndApplyCSS() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Styles/CSS-Theme(Wordington).css',
            onload: function(response) {
                if (response.status === 200) {
                    GM_addStyle(response.responseText);
                } else {
                    console.error('Failed to fetch the CSS:', response.statusText);
                }
            },
            onerror: function(response) {
                console.error('Error fetching the CSS:', response.statusText);
            }
        });
    }
    // Apply changes
    fetchAndApplyCSS();
})();
