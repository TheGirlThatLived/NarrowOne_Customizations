// ==UserScript==
// @name         Health Bar Percentage Display
// @namespace    https://narrow.one/
// @version      2024-12-16_2200
// @description  Display a text percentage of current HP bar state (next to the HP bar).
// @author       Xeltalliv
// @run-at       document-start
// @match        https://narrow.one/*
// @icon         https://www.svgrepo.com/show/404891/broken-heart.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/HealthBarPercentage.js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/HealthBarPercentage.js
// @grant        none
// ==/UserScript==

const healthBarObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const currentWidth = observedHeathBarPart.style.width;
            const stringWithoutPercent = currentWidth.substring(0, currentWidth.length-1);
            const numericValue = +stringWithoutPercent;
            updateHealthBar(numericValue, currentWidth);
        }
    }
});
let observedHeathBarPart = null;
const isHealthBar = (elem) => elem && elem.classList.contains("health-ui-container");
const gameWrapperObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            const addedNode = mutation.addedNodes[0];
            const removeNode = mutation.removedNodes[0];
            if (isHealthBar(addedNode)) {
                addHealthBar(addedNode);
                observedHeathBarPart = document.getElementsByClassName("health-ui-bar clip")[0];
                healthBarObserver.observe(observedHeathBarPart, {
                    attributes: true,
                    attributeFilter: ['style']
                });
            }
            if (isHealthBar(removeNode)) {
                removeHealthBar(removeNode);
                healthBarObserver.disconnect();
            }
            //console.log('Added', mutation.addedNodes, "Removed", mutation.removedNodes);
        }
    }
});
gameWrapperObserver.observe(document.getElementById("gameWrapper"), {
    childList: true
});

let healthTextDisplayElement = null;
function updateHealthBar(numericValue, currentWidth) {
    //console.log("Health changed", numericValue);
    healthTextDisplayElement.textContent = Math.round(numericValue);

    let color;
    if (numericValue < 34) {
        color = "red";
    } else if (numericValue < 67) {
        color = "orange";
    } else {
        color = "green";
    }
    healthTextDisplayElement.style.color = color;
}
function addHealthBar(element) {
    //console.log("Added health bar", element);
    healthTextDisplayElement = document.createElement("div");
    healthTextDisplayElement.style.position = "absolute";
    healthTextDisplayElement.style.top = "50%";
    healthTextDisplayElement.style.left = "50%";
    healthTextDisplayElement.style.transform = "translate(-50%, -30%)";
    healthTextDisplayElement.style.color = "red";
    healthTextDisplayElement.style.fontWeight = "bold";
    healthTextDisplayElement.classList.add("health-bar-percent");
    element.children[1].append(healthTextDisplayElement);
}
function removeHealthBar(element) {
    //console.log("Removed health bar", element);
    healthTextDisplayElement.remove();
}
