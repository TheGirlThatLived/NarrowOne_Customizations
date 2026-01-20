// ==UserScript==
// @name         Custom notification icons
// @namespace    https://narrow.one/
// @version      2024-12-16
// @description  Replace how notification icons look
// @author       Xeltalliv
// @run-at       document-start
// @match        https://narrow.one/*
// @icon         https://www.svgrepo.com/show/308893/sword-conflict-war-violence.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/NotificationIconReplacer.js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/NotificationIconReplacer.js
// @grant        none
// ==/UserScript==

(function() {
'use strict';

// Images shown here are provided as example
// Empty strings = keep as is
const mappingsFromTo = {
    'url("static/img/notificationIcons/crosshair/kill.svg")': 'url("https://www.svgrepo.com/show/308893/sword-conflict-war-violence.svg")',
    'url("static/img/notificationIcons/crosshair/killed.svg")': 'url("https://www.svgrepo.com/show/481821/grave-1.svg")',

    'url("static/img/notificationIcons/flag/red/capture.svg")': '',
    'url("static/img/notificationIcons/flag/red/drop.svg")': '',
    'url("static/img/notificationIcons/flag/red/grab.svg")': '',
    'url("static/img/notificationIcons/flag/red/return.svg")': '',
    'url("static/img/notificationIcons/flag/blue/capture.svg")': '',
    'url("static/img/notificationIcons/flag/blue/drop.svg")': '',
    'url("static/img/notificationIcons/flag/blue/grab.svg")': '',
    'url("static/img/notificationIcons/flag/blue/return.svg")': '',

    'url("static/img/notificationIcons/gameOver/defeated.svg")': '',
    'url("static/img/notificationIcons/gameOver/gameEnded.svg")': '',
    'url("static/img/notificationIcons/gameOver/victory.svg")': '',
};
const notificationIconsObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            const addedNode = mutation.addedNodes[0];
            if (addedNode) {
                const inputImage = addedNode.style.backgroundImage;
                if (mappingsFromTo[inputImage]) {
                    addedNode.style.backgroundImage = mappingsFromTo[inputImage];
                    addedNode.style.backgroundPosition = "center center";
                    addedNode.style.backgroundRepeat = "no-repeat";
                    addedNode.style.backgroundSize = "cover";
                }
            }
        }
    }
});
const isNotificationUi = (elem) => elem && elem.classList.contains("notificationIconsUiContainer");
const gameWrapperObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            const addedNode = mutation.addedNodes[0];
            const removedNode = mutation.removedNodes[0];
            if (isNotificationUi(addedNode)) {
                notificationIconsObserver.observe(addedNode, { childList: true });
            }
            if (isNotificationUi(removedNode)) {
                notificationIconsObserver.disconnect();
            }
        }
    }
});

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
