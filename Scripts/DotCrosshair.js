// ==UserScript==
// @name         Dot crossahir
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Affiche un petit point blanc au centre de l'écran pour viser plus facilement dans Narrow One
// @author       Ansy; Incredible_Violent; Xeltalliv
// @match        https://narrow.one/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// Ansy - original script
// Incredible_Violent - customized css
// Xeltalliv - expanded to make it dynamically appear and disappear

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
                transform: 'translate(-50%, -50%)',
                width: '4px',
                height: '4px',
                backgroundColor: '#00ff00',
                border: '2px solid black',
                borderRadius: '50%',
                zIndex: '100',
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