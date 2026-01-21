// ==UserScript==
// @name         Dot crosshair
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Swap your humongous crosshair for a small dot (CSS customizable appearance) ~"Aim small, miss small"
// @author       Ansy; Xeltalliv
// @match        https://narrow.one/*
// @icon         https://www.svgrepo.com/show/172717/target-design.svg
// @grant        none
// @run-at       document-end
// ==/UserScript==

// Ansy's script expanded by Xeltalliv to make it dynamically appear in matches and disappear outside of them

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
            this.custom = document.createElement('div');
            this.custom.id = 'tamper-crosshair';

            Object.assign(this.custom.style, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)', // Edit your crosshair appearance below
                width: '4px',
                height: '4px',
                backgroundColor: '#00ff00',
                border: '2px solid black',
                borderRadius: '50%',
                zIndex: '100', // End of crosshair apperance editable area
                pointerEvents: 'none',
                display: original.style.display,
            });
            this.visibilityObserver = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        this.custom.style.display = original.style.display;
                    }
                }
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
