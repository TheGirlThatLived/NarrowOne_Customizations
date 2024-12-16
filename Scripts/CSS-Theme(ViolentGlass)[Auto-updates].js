// ==UserScript==
// @name         CSS Theme (Violent Glass) [Auto-updates]
// @namespace    http://tampermonkey.net/
// @version      20241215_0907
// @description  Guest 0187's personalized CSS edits.
// @author       Incredible_Violent; Xeltalliv; Pratik; Systummm; Blazyst; Riptide; Razgriz; PING 18
// @run-at       document-start
// @match        https://narrow.one/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=narrow.one
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/CSS-Theme(ViolentGlass)%5BAuto-updates%5D.js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/CSS-Theme(ViolentGlass)%5BAuto-updates%5D.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        unsafeWindow
// ==/UserScript==
(function() {
    'use strict';
    // let stylesheetVersion = ''; // Error: Version text
    function fetchAndApplyCSS() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Styles/CSS-Theme(ViolentGlass).css',
            onload: function(response) {
                if (response.status === 200) {
                    try {
                        // const stylesheetVersionSanitize = response.responseText.split('\n');                        // Error: Version text
                        // stylesheetVersion = stylesheetVersionSanitize[0]?.trim().slice(2, -2)?.trim() || 'Unknown'; // Error: Version text
                        GM_addStyle(response.responseText);
                    } catch (e) {
                        console.error('Error processing CSS:', e);
                    }
                } else {
                    console.error(`Failed to fetch the CSS. Status: ${response.status}, Message: ${response.statusText}`);
                }
            },
            onerror: function(response) {
                console.error('Error fetching the CSS:', response.statusText);
            }
        });
    }
    function fetchAndApplySVG() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Assets/ViolentGlass.svg',
            onload: function(response) {
                if (response.status === 200) {
                    try {
                        const parser = new DOMParser();
                        const svgDoc = parser.parseFromString(response.responseText, 'image/svg+xml');
                        const svgElement = svgDoc.documentElement;
                        svgElement.style.position = 'fixed';
                        svgElement.style.bottom = '3%';
                        svgElement.style.right = '0%';
                        svgElement.style.zIndex = '9999';
                        svgElement.style.pointerEvents = 'none';
                        document.body.appendChild(svgElement);
                        svgElement.setAttribute('width', '14%');
                        svgElement.setAttribute('height', '14%');
                        svgElement.style.animation = 'blinking 60s infinite';
                        // Add version text
                            /* // Error: Version text (It only works when loading the script for the first time, to work again whole script must be deleted and re-created.)
                        const versionText = document.createElement('div');
                        versionText.textContent = 'Version: ' + stylesheetVersion;
                        versionText.style.position = 'fixed';
                        versionText.style.bottom = '10.5%';
                        versionText.style.right = '1%';
                        versionText.style.zIndex = '9999';
                        versionText.style.color = 'white';
                        versionText.style.pointerEvents = 'none';
                        document.body.appendChild(versionText);
                        */
                    } catch (e) {
                        console.error('Error processing SVG:', e);
                    }
                } else {
                    console.error(`Failed to fetch the SVG. Status: ${response.status}, Message: ${response.statusText}`);
                }
            },
            onerror: function(response) {
                console.error('Error fetching the SVG:', response.statusText);
            }
        });
    }
    function fetchAndApplyHPBar() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/HealthBarPercentage.js',
            onload: function(response) {
                if (response.status === 200) {
                    const scriptElement = document.createElement('script');
                    scriptElement.textContent = response.responseText;
                    document.body.appendChild(scriptElement);
                } else {
                    console.error(`Failed to fetch the script. Status: ${response.status}, Message: ${response.statusText}`);
                }
            },
            onerror: function(response) {
                console.error('Error fetching the script:', response.statusText);
            }
        });
    }
    /*
    function applyMutations(){ // Error: applyMutations crashes computer
      if(document.querySelector('.crosshair-container')){
          document.querySelector('.crosshair-container').innerHTML = `
          <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <circle
          style="opacity:1;fill:#00ff00;fill-opacity:1;stroke:#000000;stroke-width:2.81047;stroke-dasharray:none;stroke-opacity:1"
          id="path1"
          cx="26.458334"
          cy="26.458334"
          r="25.053099"
          />
          </svg>`;
      }else{console.error('"crosshair-container" class not found.');}
    }
    */
    // Apply changes
    fetchAndApplySVG();
    fetchAndApplyCSS();
    fetchAndApplyHPBar();
    // const observer = new MutationObserver(applyMutations); // Error: applyMutations crashes computer
    // observer.observe(document.body, { childList: true, subtree: true }); // Error: applyMutations crashes computer
})();
