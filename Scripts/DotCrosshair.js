// ==UserScript==
// @name         Dot crosshair
// @namespace    http://tampermonkey.net/
// @version      20260330_2122
// @description  Swap your humongous crosshair for a small dot (CSS customizable appearance) ~"Aim small, miss small"
// @author       Ansy; Xeltalliv; Guest 0187
// @match        https://narrow.one/*
// @icon         https://www.svgrepo.com/show/172717/target-design.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/DotCrosshair.js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/DotCrosshair.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

// Ansy's script expanded by Xeltalliv to make it dynamically appear in matches and disappear outside of them.
// Guest 0187 adds a secondary dot calibrated for 91 meter shots (example: Desert: Flag-to-Flag), which aids quick aiming in long-range combat.

(function() {
    'use strict';
    let gameWrapper = null;
    const crosshairs = new Map();
    const isCrosshair = (elem) => elem && elem.classList.contains("crosshair-container");
    const gameWrapperObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
                const addedNode = mutation.addedNodes[0];
                const removedNode = mutation.removedNodes[0];
                //console.log('Added', mutation.addedNodes, "Removed", mutation.removedNodes);
                if (isCrosshair(addedNode)) {
                    crosshairs.set(addedNode, new CustomCrosshair(addedNode));
                }
                if (isCrosshair(removedNode)) {
                    crosshairs.get(removedNode).destructor();
                    crosshairs.delete(removedNode);
                }
            }
        }
    });
    class CustomCrosshair {
    constructor(original) {
        // Parameters for all dots
        this.custom = document.createElement('div');
        this.custom.id = 'tamper-crosshair';

        Object.assign(this.custom.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: '100',
            display: original.style.display,
        });

        // Green dot in the center
        const greenDot = document.createElement('div');
        Object.assign(greenDot.style, { // Adjust green dot inside this code block
            width: '4px',
            height: '4px',
            backgroundColor: '#00ff00',
            border: '2px solid black',
            borderRadius: '50%',
            position: 'absolute',
            top: '0px',
            left: '0px',
            transform: 'translate(-50%, -50%)',
        });

        // Yellow dot ranged for 91 meters (Desert: Flag-to-flag distance)
        // Duplicate this code block if you want to add new element, then rename the duplicate's "const" name
        const redDot = document.createElement('div');
        Object.assign(redDot.style, { // Adjust red dot inside this code block
            width: '4px',
            height: '4px',
            backgroundColor: '#ff0000',
            border: '2px solid black',
            borderRadius: '50%',
            position: 'absolute',
            top: '14.1vh',
            left: '0px',
            transform: 'translate(-50%, -50%)',
        });

        this.custom.appendChild(greenDot);
        this.custom.appendChild(redDot); // Duplicate this line if you want to add new element, then rename the duplicate's "const" name
        this.visibilityObserver = new MutationObserver(() => {
            this.custom.style.display = original.style.display;
        });

        this.visibilityObserver.observe(original, {
            attributes: true,
            attributeFilter: ['style']
        });

        gameWrapper.append(this.custom);
    }

    destructor() {
        this.visibilityObserver.disconnect();
        this.custom.remove();
    }
}

    function init() {
        gameWrapper = document.getElementById("gameWrapper");
        gameWrapperObserver.observe(gameWrapper, {
            childList: true
        });
    }

    if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
