// ==UserScript==
// @name         CSS Theme (Violent Glass) [Auto-updates]
// @namespace    http://tampermonkey.net/
// @version      20241215_0842
// @description  Guest 0187's personalized CSS edits.
// @author       Incredible_Violent
// @run-at       document-start
// @match        https://narrow.one/
// @icon         https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Assets/ViolentGlass.svg
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==
(function() {
    'use strict';
    let stylesheetVersion = '';
    function fetchAndApplyCSS() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Styles/CSS-Theme(ViolentGlass).css',
            onload: function(response) {
                if (response.status === 200) {
                    const stylesheetVersionSanitize = response.responseText.split('\n');
                    stylesheetVersion = stylesheetVersionSanitize[0].trim(); stylesheetVersion = stylesheetVersion.slice(2, -2).trim();
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
    function fetchAndApplySVG() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Assets/ViolentGlass.svg',
            onload: function(response) {
                console.log('SVG fetch response:', response);
                if (response.status === 200) {
                    const parser = new DOMParser();
                    const svgDoc = parser.parseFromString(response.responseText, 'image/svg+xml');
                    const svgElement = svgDoc.documentElement;
                    svgElement.style.position = 'fixed';
                    svgElement.style.bottom = '3%';
                    svgElement.style.right = '0%';
                    svgElement.style.zIndex = '9999';
                    svgElement.style.pointerEvents = 'none'; // To prevent interaction
                    document.body.appendChild(svgElement);
                    svgElement.setAttribute('width', '14%'); svgElement.setAttribute('height', '14%');
                    svgElement.style.animation = `blinking 60s infinite`;
                    /* //Error
                    const crosshairContainer = document.querySelector('.crosshair-container');
                    const crosshair = document.createElement('div');
                    crosshair.style.width = '100px'; // Diameter of the circle
                    crosshair.style.height = '100px'; // Diameter of the circle
                    crosshair.style.backgroundColor = 'green'; // Color of the circle
                    crosshair.style.borderRadius = '50%'; // Makes the div a circle
                    crosshair.style.position = 'absolute'; // Ensures it can be positioned within the container
                    crosshair.style.top = '50%'; // Center vertically
                    crosshair.style.left = '50%'; // Center horizontally
                    crosshair.style.transform = 'translate(-50%, -50%)'; // Adjusts position to the exact center
                    crosshairContainer.appendChild(crosshair);
                    */

                    // Create and append version text
                    const versionText = document.createElement('div');
                    versionText.textContent = 'Version: ' + stylesheetVersion;
                    versionText.style.position = 'fixed';
                    versionText.style.bottom = '10.5%';
                    versionText.style.right = '1%';
                    versionText.style.zIndex = '9999';
                    versionText.style.color = 'white';
                    // versionText.style.padding = '2px 5px';
                    versionText.style.pointerEvents = 'none'; // Prevent interaction with the text
                    document.body.appendChild(versionText);
                } else {
                    console.error('Failed to fetch the SVG:', response.statusText);
                }
            },
            onerror: function(response) {
                console.error('Error fetching the SVG:', response.statusText);
            }
        });
    }
    function fetchAndApplyHPBar(){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/HealthBarPercentage.js',
        onload: function(response) {
            if (response.status === 200) {
                const scriptContent = response.responseText;
                const scriptElement = document.createElement('script');
                scriptElement.textContent = scriptContent;
                document.body.appendChild(scriptElement);
            } else {
                console.error('Failed to fetch the script:', response.statusText);
            }
        },
        onerror: function(response) {
            console.error('Error fetching the script:', response.statusText);
        }
    });
    };
    // Apply changes
    fetchAndApplySVG();
    fetchAndApplyCSS();
    fetchAndApplyHPBar();
})();
