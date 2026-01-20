// ==UserScript==
// @name         Custom Health Bar
// @namespace    http://tampermonkey.net/
// @version      20241216_2200
// @description  Customizable Health Bar
// @author       Xeltalliv
// @match        https://narrow.one/*
// @icon         https://www.svgrepo.com/show/391746/wrench-alt.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/testing/Scripts/CustomHealthBar.js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/testing/Scripts/CustomHealthBar.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
'use strict';

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
const healthBarColorObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            updateHealthBarColor(observedHeathBarPart.children[0].style.getPropertyValue('--wrinkled-paper-color'));
        }
    }
});
const healthBarVisibilityObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            updateHealthBarVisibility(healthBarElement);
        }
    }
});
let gameWrapper = null;
let observedHeathBarPart = null;
let healthBarElement = null;
const isHealthBar = (elem) => elem && elem.classList.contains("health-ui-container");
const gameWrapperObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            const addedNode = mutation.addedNodes[0];
            const removeNode = mutation.removedNodes[0];
            if (isHealthBar(addedNode)) {
                addHealthBar(addedNode);
                healthBarElement = addedNode;
                observedHeathBarPart = document.getElementsByClassName("health-ui-bar clip")[0];
                healthBarObserver.observe(observedHeathBarPart, {
                    attributes: true,
                    attributeFilter: ['style']
                });
                healthBarColorObserver.observe(observedHeathBarPart.children[0], {
                    attributes: true,
                    attributeFilter: ['style']
                });
                healthBarVisibilityObserver.observe(healthBarElement, {
                    attributes: true,
                    attributeFilter: ['style']
                });
                updateHealthBarVisibility(healthBarElement);
                updateHealthBarColor(observedHeathBarPart.children[0].style.getPropertyValue('--wrinkled-paper-color'));
            }
            if (isHealthBar(removeNode)) {
                removeHealthBar(removeNode);
                healthBarObserver.disconnect();
                healthBarColorObserver.disconnect();
                healthBarVisibilityObserver.disconnect();
            }
            //console.log('Added', mutation.addedNodes, "Removed", mutation.removedNodes);
        }
    }
});

let customHealthBarOuter = null;
let customHealthBarInner = null;
function updateHealthBar(numericValue, currentWidth) {
    console.log("Health changed", numericValue);
    customHealthBarInner.style.width = currentWidth;
    customHealthBarInner.textContent = Math.round(numericValue);
}
function updateHealthBarColor(color) {
    console.log("Health color changed", color);
    customHealthBarInner.style.backgroundColor = color;
}
function updateHealthBarVisibility(element) {
    console.log("Health visibility changed", element.style.display);
    customHealthBarOuter.style.display = element.style.display;
}
function addHealthBar(element) {
    console.log("Added health bar", element);
    element.style.opacity = "0";

    customHealthBarOuter = document.createElement("div");
    customHealthBarInner = document.createElement("div");
    customHealthBarOuter.classList.add("custom-health-bar-outer");
    customHealthBarInner.classList.add("custom-health-bar-inner");
    customHealthBarOuter.append(customHealthBarInner);
    gameWrapper.append(customHealthBarOuter);
}
function removeHealthBar(element) {
    console.log("Removed health bar", element);
    customHealthBarOuter.remove();
}

const css = new CSSStyleSheet;
css.replaceSync(`
.custom-health-bar-outer {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 300px;
    height: 20px;
    background-color: #222222;
    border: 5px solid black;
    z-index: 100;
}
.custom-health-bar-inner {
    height: 20px;
    background-color: #bb6b29;
    overflow: hidden;
}
`);

function init() {
    gameWrapper = document.getElementById("gameWrapper");
    gameWrapperObserver.observe(gameWrapper, {
        childList: true
    });
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, css];
}
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
})();
