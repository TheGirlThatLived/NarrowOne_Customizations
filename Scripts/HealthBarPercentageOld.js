// ==UserScript==
// @name         Health Bar Percentage Display
// @namespace    https://narrow.one/
// @version      20241207
// @description  Display a text percentage of current HP bar state (next to the HP bar).
// @author       Xeltalliv
// @run-at       document-start
// @match        https://narrow.one/
// @icon         https://www.svgrepo.com/show/404891/broken-heart.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/HealthBarPercentageOld.js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/HealthBarPercentageOld.js
// @grant        none
// ==/UserScript==

(function() {
'use strict';
const healthBarObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            // Get the current width from the style
            const currentWidth = observedHealthBarPart.style.width;

            console.log('Width changed to:', currentWidth);
            healthTextDisplayElement.textContent = currentWidth;
        }
    }
});
let observedHealthBarPart = null;
let healthTextDisplayElement = document.createElement("div");

const isHealthBar = (elem) => elem.classList.contains("health-ui-container");
const gameWrapperObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            if (mutation.addedNodes[0] && isHealthBar(mutation.addedNodes[0])) {
                addHealthBar(mutation.addedNodes[0]);
            }
            if (mutation.removedNodes[0] && isHealthBar(mutation.removedNodes[0])) {
                removeHealthBar(mutation.removedNodes[0])
            }
            //console.log('Added', mutation.addedNodes, "Removed", mutation.removedNodes);
        }
    }
});

function addHealthBar(element) {
    console.log("Added health bar", element);
    element.append(healthTextDisplayElement);

    observedHealthBarPart = document.getElementsByClassName("health-ui-heart")[0];
    healthBarObserver.observe(observedHealthBarPart, {
        attributes: true,
        attributeFilter: ['style']
    });
}
function removeHealthBar(element) {
    console.log("Removed health bar", element);
    healthTextDisplayElement.remove();
    healthBarObserver.disconnect();
}

function init() {
    gameWrapperObserver.observe(document.getElementById("gameWrapper"), {
        childList: true
    });
}
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
})();
