// ==UserScript==
// @name         Theme (DVD Screensaver)
// @namespace    http://tampermonkey.net/
// @version      20250102_0343
// @description  Make your UI bounce around like its a classic DVD Screensaver.
// @author       Xeltalliv
// @run-at       document-start
// @match        https://narrow.one/
// @icon         https://upload.wikimedia.org/wikipedia/commons/9/9b/DVD_logo.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/testing/Styles/CSS-Theme(DVDScreensaver).js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/testing/Styles/CSS-Theme(DVDScreensaver).js
// ==/UserScript==

const s = new CSSStyleSheet();
s.replaceSync(`
.dialog {
    transfrom: translate3d(-50%, -50%, 0px) rotate3d(7,11,2,0deg);
    animation: 5s linear 0s infinite spin3d, 7s linear 0s infinite alternate bounceX, 3s linear 0s infinite alternate bounceY;
    perspective: 16px;
}
@keyframes spin3d {
    from { transform: translate3d(-50%, -50%, 0px) rotate3d(7,11,2,0deg); }
    to { transform: translate3d(-50%, -50%, 0px) rotate3d(7,11,2,360deg); }
}
@keyframes bounceX {
    from { left: 10%; }
    to { left: 90%; }
}
@keyframes bounceY {
    from { top: 10%; }
    to { top: 90%; }
}
`)
document.adoptedStyleSheets = [...document.adoptedStyleSheets, s];
