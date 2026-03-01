// ==UserScript==
// @name         Cross Health Bar (with Team-Colored Flag Dots)
// @namespace    http://tampermonkey.net/
// @version      20260228
// @description  Team Fortress 2 -inspired HP bar, with Flag Score indicator dots recolored to further simplify the UI.
// @author       Shart (code); Guest 0187 (design)
// @match        https://*.narrow.one/*
// @icon         https://www.marefa.org/w/images/4/48/Team_Fortress_2_style_logo.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/testing/Scripts/CustomHealthBar(Cross).js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/testing/Scripts/CustomHealthBar(Cross).js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Customise from here
    const config = {
        // Overall size of the UI
        // 0.5 = smaller | 1 = normal | 1.5 = bigger
        uiScale: 1.3,

        // Size of team score dots
        // Change the value if the dots are too small or too big
        teamDotScale: 1.3,

        // Health Bar Transparency
        // 0 = invisible | 1 = solid
        healthBarOpacity: 0.7,

        healthBarBorderColor: "#32174DFF",
        healthBarBorderWidth: 6,

        // Positioning
        positionType: "fixed",

        // Vertical position on screen
        // 0% = Top | 50% = Middle | 100% = Bottom
        uiPositionTop: "65%",

        // Horizontal position on screen
        // 0% = Left | 50% = Middle | 100% = Right
        uiPositionLeft: "25%",

        // Keep this TRUE if using 50% for horizontal centering
        // Set to false only if you manually position from the left
        centerHorizontally: false,

        // Healthbar overlay gradient settings
        // write false if you want original solid color health bar
        overlayGradient: true,
        gradientTopColor: "rgba(197, 198, 199, 0.4)", // Gray
        gradientBottomColor: "rgba(0, 0, 0, 0.4)" // Black
    };

    // Advanced layout config (Do not change unless you're sure.)
    const dotSizeGridUnit = 50;
    const dotBaseHorizontalOffset = 130;
    const dotBaseVerticalOffset = 80;

    // State
    let currentHp = 100;
    let currentTeamColor = "255, 152, 152";
    let updatePending = false;
    let domElements = {};
    const colorCache = {};

    const extractTeamColor = (str) => {
        if (!str) return "255, 152, 152";
        if (colorCache[str]) return colorCache[str];

        const d = document.createElement('div');
        d.style.color = str;
        document.body.appendChild(d);
        const rgbMatch = getComputedStyle(d).color.match(/\d+, \d+, \d+/);
        document.body.removeChild(d);

        const rgb = rgbMatch ? rgbMatch[0] : "255, 152, 152";
        colorCache[str] = rgb;
        return rgb;
    };

    const renderVisuals = () => {
        if (!domElements.text) {
            updatePending = false;
            return;
        }

        const clampedHp = Math.max(0, Math.min(100, currentHp));
        domElements.text.textContent = Math.round(clampedHp);

        const off = (100 - clampedHp) + "%";
        domElements.stopDarkEnd.setAttribute('offset', off);
        domElements.stopColorStart.setAttribute('offset', off);

        const rgbaColor = `rgba(${currentTeamColor}, ${config.healthBarOpacity})`;
        domElements.stopColorStart.setAttribute('stop-color', rgbaColor);
        domElements.stopColorEnd.setAttribute('stop-color', rgbaColor);

        updatePending = false;
    };

    const requestVisualUpdate = () => {
        if (!updatePending) {
            updatePending = true;
            requestAnimationFrame(renderVisuals);
        }
    };

    const hook = (node) => {
        if (node.dataset.healthHooked) return;
        node.dataset.healthHooked = "true";

        const wEl = node.querySelector(".health-ui-bar.clip");
        const cEl = node.querySelector(".health-ui-bar.main");
        if (!wEl || !cEl) return;

        let intervalId = null;

        const readData = () => {
            if (!wEl.isConnected) {
                if (intervalId) clearInterval(intervalId);
                return;
            }

            if (!document.getElementById("custom-health-svg")) {
                const flagContainer = document.querySelector('.flag-score-container');
                if (flagContainer) {
                    const glossDef = config.overlayGradient ? `
                        <linearGradient id="gloss-overlay" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="${config.gradientTopColor}"/>
                            <stop offset="40%" stop-color="rgba(255,255,255,0)"/>
                            <stop offset="60%" stop-color="rgba(0,0,0,0)"/>
                            <stop offset="100%" stop-color="${config.gradientBottomColor}"/>
                        </linearGradient>
                    ` : '';

                    const glossPath = config.overlayGradient ? `
                        <path d="M 230 80 L 280 80 L 280 130 L 330 130 L 330 180 L 280 180 L 280 230 L 230 230 L 230 180 L 180 180 L 180 130 L 230 130 Z"
                             fill="url(#gloss-overlay)" style="pointer-events: none; mix-blend-mode: normal;"/>
                    ` : '';

                    flagContainer.insertAdjacentHTML('beforeend', `
                        <svg id="custom-health-svg" viewBox="0 0 510 310" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;">
                            <defs>
                                <filter id="custom-ds" height="130%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                                    <feOffset dx="2" dy="2"/>
                                    <feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer>
                                    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                                </filter>
                                <linearGradient id="custom-gh" x1="0" y1="0" x2="0" y2="1">
                                    <stop id="hp-stop-1" offset="0%" stop-color="rgba(20,10,30,0.3)"/>
                                    <stop id="hp-stop-2" offset="0%" stop-color="rgba(20,10,30,0.3)"/>
                                    <stop id="hp-stop-3" offset="0%" stop-color="rgba(255,152,152,${config.healthBarOpacity})"/>
                                    <stop id="hp-stop-4" offset="100%" stop-color="rgba(255,152,152,${config.healthBarOpacity})"/>
                                </linearGradient>
                                ${glossDef}
                            </defs>
                            <path d="M 230 80 L 280 80 L 280 130 L 330 130 L 330 180 L 280 180 L 280 230 L 230 230 L 230 180 L 180 180 L 180 130 L 230 130 Z"
                                  stroke="${config.healthBarBorderColor}" stroke-width="${config.healthBarBorderWidth}"
                                  fill="url(#custom-gh)" filter="url(#custom-ds)"/>
                            ${glossPath}
                            <text id="hp-text" x="255" y="155" dy="0.35em" fill="white" font-family="Ubuntu" font-weight="900" font-size="44" text-anchor="middle" style="text-shadow:0 2px 4px rgba(0,0,0,0.8);pointer-events:none;letter-spacing:1px">100</text>
                        </svg>
                    `);

                    domElements = {
                        text: document.getElementById("hp-text"),
                        stopDarkEnd: document.getElementById("hp-stop-2"),
                        stopColorStart: document.getElementById("hp-stop-3"),
                        stopColorEnd: document.getElementById("hp-stop-4"),
                    };
                }
            } else if (!domElements.text) {
                const txt = document.getElementById("hp-text");
                if (txt) {
                    domElements = {
                        text: txt,
                        stopDarkEnd: document.getElementById("hp-stop-2"),
                        stopColorStart: document.getElementById("hp-stop-3"),
                        stopColorEnd: document.getElementById("hp-stop-4"),
                    };
                }
            }

            let changed = false;
            if (wEl.style.width) {
                const newHp = parseFloat(wEl.style.width);
                if (!isNaN(newHp) && newHp !== currentHp) {
                    currentHp = newHp;
                    changed = true;
                }
            }
            const c = getComputedStyle(cEl).getPropertyValue('--wrinkled-paper-color').trim();
            if (c) {
                const newColor = extractTeamColor(c);
                if (newColor !== currentTeamColor) {
                    currentTeamColor = newColor;
                    changed = true;
                }
            }
            if (changed) requestVisualUpdate();
        };

        new MutationObserver((m) => {
            if (m.some(x => x.attributeName === 'style')) readData();
        }).observe(wEl, { attributes: true, attributeFilter: ['style'] });

        intervalId = setInterval(readData, 1500);
        readData();
    };

    const init = () => {
        new MutationObserver((m) => m.forEach(x => x.addedNodes.forEach(n => {
            if (n.classList && n.classList.contains("health-ui-container")) hook(n);
        }))).observe(document.getElementById("gameWrapper") || document.body, { childList: true, subtree: true });

        const ex = document.querySelector(".health-ui-container");
        if (ex) hook(ex);
    };

    const cssLeft = config.uiPositionLeft;
    const cssTrans = config.centerHorizontally ? `translateX(-50%) scale(${config.uiScale})` : `scale(${config.uiScale})`;
    const cssOrigin = config.centerHorizontally ? "top center" : "top left";

    GM_addStyle(`
        .health-ui-container { display: none !important; opacity: 0 !important; pointer-events: none !important; }
        .flag-score-container {
            width: 510px !important; height: 310px !important; display: block !important;
            background-image: none !important;
            margin: 0 !important; position: ${config.positionType} !important; top: ${config.uiPositionTop} !important; left: ${cssLeft} !important;
            transform: ${cssTrans} !important; transform-origin: ${cssOrigin} !important; z-index: 9999 !important;
        }
        .flag-score-icon { display: none !important; } .flag-score-item { display: contents !important; }
        .score-ui-dot {
            position: absolute !important; width: ${dotSizeGridUnit}px !important; height: ${dotSizeGridUnit}px !important; z-index: 99 !important; margin: 0 !important;
            filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.5)); transform: rotate(-90deg) scale(${config.teamDotScale}) !important; transform-origin: center center !important;
        }

        /* Red Dot Border */
        .flag-score-item:nth-of-type(1) .score-ui-dot .border.fg { stroke: rgb(255 85 85 / 35%) !important; }

        /* Blue Dot Border */
        .flag-score-item:nth-of-type(2) .score-ui-dot .border.fg { stroke: #00bfff59 !important; }

        /* Captured Flag Border */
        .score-ui-dot.grabbed.captured.returned .border.fg { stroke: white !important; }

        /* Red Dot Layout */
        .flag-score-item:nth-of-type(1) svg:nth-of-type(4) { left: ${dotBaseHorizontalOffset + dotSizeGridUnit}px !important; top: ${dotBaseVerticalOffset}px !important; }
        .flag-score-item:nth-of-type(1) svg:nth-of-type(2) { left: ${dotBaseHorizontalOffset + dotSizeGridUnit}px !important; top: ${dotBaseVerticalOffset + dotSizeGridUnit*2}px !important; }
        .flag-score-item:nth-of-type(1) svg:nth-of-type(3) { left: ${dotBaseHorizontalOffset}px !important; top: ${dotBaseVerticalOffset + dotSizeGridUnit}px !important; }

        /* Blue Dot Layout */
        .flag-score-item:nth-of-type(2) svg:nth-of-type(4) { left: ${dotBaseHorizontalOffset + dotSizeGridUnit*3}px !important; top: ${dotBaseVerticalOffset}px !important; }
        .flag-score-item:nth-of-type(2) svg:nth-of-type(2) { left: ${dotBaseHorizontalOffset + dotSizeGridUnit*3}px !important; top: ${dotBaseVerticalOffset + dotSizeGridUnit*2}px !important; }
        .flag-score-item:nth-of-type(2) svg:nth-of-type(3) { left: ${dotBaseHorizontalOffset + dotSizeGridUnit*4}px !important; top: ${dotBaseVerticalOffset + dotSizeGridUnit}px !important; }
    `);

    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
