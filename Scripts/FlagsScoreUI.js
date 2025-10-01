// ==UserScript==
// @name         Flags Score UI
// @namespace    http://narrow.one/
// @version      2024-12-16
// @description  Customizable Flags UI
// @author       Xeltalliv
// @match        https://narrow.one/*
// @icon         data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0A%3Csvg%20viewBox%3D%220%200%20241.205%20241.205%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Crect%20width%3D%22241.205%22%20height%3D%22241.205%22%20rx%3D%2240%22%20fill%3D%22%232a4bb3%22%2F%3E%0A%20%20%3Cpolygon%20points%3D%2264.708%2076.115%20123.931%2085.054%20204.563%2075.075%20217.958%2080.098%20197.2%20134.65%20185.028%20146.516%20190.051%20158.795%20170.372%20212.509%20131.983%20204.916%2088.933%20211.664%2057.214%20203.446%2042.32%20199.02%2037.679%20230.237%2020.935%20226.888%2052.749%2067.261%2042.952%2060.306%2052.749%2043.819%2068.545%2012.485%2073.4%2046.61%2077.404%2064.795%2064.212%2068.396%2064.708%2076.115%22%20style%3D%22fill%3A%20white%3B%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M92.179%2C191.812s-38.547-6.477-45.547-9.208L62.4%2C91.867c9.575%2C3.121%2C57.012%2C9.679%2C57.012%2C9.679l30.177-4.174%2C32.924-6.251%2C16.52-1.83-17.2%2C38.956-40.715%2C12.346%2C32.372%2C5.551-2.419%2C8.744-18.418%2C8.931%2C15.07%2C2.79-3.349%2C12.837-4.824%2C12.234c-8.827-2.248-27.007-3.378-27.007-3.378l-26.674%2C2.373Z%22%20style%3D%22fill%3A%20rgb(216%2C%2049%2C%2045)%3B%22%2F%3E%0A%3C%2Fsvg%3E
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/testing/Scripts/flagsInFlagsUi.js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/testing/Scripts/flagsInFlagsUi.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
'use strict';

const isFlagScore = (elem) => elem && elem.classList.contains("flag-score-container");
const gameWrapperObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            const addedNode = mutation.addedNodes[0];
            const removeNode = mutation.removedNodes[0];
            if (isFlagScore(addedNode)) {
                addFlagScore(addedNode);
            }
            if (isFlagScore(removeNode)) {
                removeFlagScore(removeNode);
            }
            //console.log('Added', mutation.addedNodes, "Removed", mutation.removedNodes);
        }
    }
});
gameWrapperObserver.observe(document.getElementById("gameWrapper"), {
    childList: true
});

function addFlagScore(element) {
    //console.log("Added flag score container");
    const flagRedSvg = new Image();
    const flagBlueSvg = new Image();
    flagRedSvg.src = "https://github.com/TheGirlThatLived/NarrowOne_Customizations/blob/main/Assets/flagRed.svg";
    flagBlueSvg.src = "https://github.com/TheGirlThatLived/NarrowOne_Customizations/blob/main/Assets/flagBlue.svg";
    flagRedSvg.classList.add("flag-score-icon");
    flagBlueSvg.classList.add("flag-score-icon");
    element.children[0].children[0].style.display = "none";
    element.children[0].insertBefore(flagRedSvg, element.children[0].children[0]);
    element.children[1].children[0].style.display = "none";
    element.children[1].insertBefore(flagBlueSvg, element.children[1].children[0]);
}
function removeFlagScore(element) {
    //console.log("Removed flag score container");
}

// Optional, but looks a bit better
const css = new CSSStyleSheet;
css.replaceSync(`
.flag-score-icon {
    width: 64px;
    height: 64px;
    margin: -12px 0px -2px -7px;
}
`);
window.addEventListener("load", function () {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, css]
});
})();
