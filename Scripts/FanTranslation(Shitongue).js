// ==UserScript==
// @name         Fan Translation (Shitongue)
// @namespace    http://tampermonkey.net/
// @version      20260823_2224
// @description  Translating menu buttons
// @author       Guest 0187 (Copilot)
// @run-at       document-start
// @match        https://narrow.one/
// @icon         https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/1f4a9.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/FanTranslation(Shitongue).js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/FanTranslation(Shitongue).js
// @grant        none
// ==/UserScript==
// Credits: Lord Graz - adding functions working through nodes; Xeltalliv & unknownplayerthatplayn1 - fixing infinite loop issue of re-calling translateButtonText() function.
//    In version 20260823_2233 it has beed rewritten with newer Copilot iteration using previous code and issue description as guidance.
// Context: https://discord.com/channels/519477170964267008/1302074751510118510/1540857180646023248

(function () {
    'use strict';
    const GAME_WRAPPER_SELECTOR = '#gameWrapper';
    const TEXT_REPLACEMENTS = new Map([
        ['Click to join', 'Shit in Play'],
		// Main Menu buttons
		['Yes', 'Come on!'], ['No', '(farts & defecates)'], ['ok', 'Pants Pullup'], ['Cancel', 'Shitcel'],
		['Settings', 'Shittings'], ['Shop', 'Shit'], ['Squad', 'Squat'], ['Maps', 'Shitstains'], ['Full Screen', 'Gloryhole'],
		['Exit Full Screen', 'Undrill it'],
		['Enable Auto Full Screen?', 'Wanna drill it?'],
		['Do you automatically want to enter full screen when joining a game? (This can be disabled later in settings)',
		 'Would you be comfortable shitting next to someone, two of you connected by a hole in thin wall?'],
		['Heck Yeah!', 'Competitive Shitsession!'], ['No Thanks', 'Poop alone :-('],
		['Install', 'Shit Yourself'], ['Exit Round', 'Leaving Shithouse'], ['Join our Discord', 'Shitting Club'],
		// Match dialogs
		['Exit', 'Close the lid'], ['stay in game', 'Imma fart some more'], ['Press T to chat with your squad', 'Activate Windows'], ['Type to chat with your squad', 'Activate Windows'], ['Are you sure?', 'Shat yourself?'],
		['You will not earn any coins from this match.', 'Pissed your pants maybe?'], ['You are the squad leader so all members will exit this match too. No one will earn any coins from this match.', 'Pissed your pants maybe in front of the whole squatters class?'], ['Connection closed', 'Toilet Flushed'], ['You have been kicked for being afk for too long.', 'Janitor kicked you out for clogging the pipe.'], ['Squad not found', 'Toilet Demolished'],
		['You are currently in a game', 'Toilet seat taken'], ['Do you want to leave the current match?', '(you hear someone knocking on your stall door...)'], ['Invite someone', 'Pass Toilet Paper'], ['Join existing squad', 'Public Toilet'], ['Ready', 'Shyt'], ['Start', 'Shat'], ['Still connecting', 'Still pushing'], ['Connecting seems to take longer than expected. Do you want to keep trying?', 'Contracting poop-birthing cramps seems to take longer than expected. Do you want to keep trying?'], ['Keep trying', 'Push harder'], ['The connection closed abruptly :(', 'Water spilled outta toilet onto tiled floor :-('],
		['Cheats detected. (code', 'Fecal matter in the bed detected. (Turds:'], ['Final warning', 'Shit hits the fan!'], ['You have been temporarily banned, please try again later.', 'Clean up your bed!'], ['Your version is out of date, update your client in order to play online.', 'NEW JAPANESSE TOILET IN YOUR AREA'], ['Update now', 'BUY NOW'],
		// Scoreboard
		['team red', 'Haemorrhoids'], ['team blue', 'Diarrhea'], ['flags', 'Toilets'], ['kills', 'Flushed'], ['deaths', 'Clogged'],
		['score', 'Stank'], ['team red won!', 'Haemorrhoids bursted!'], ['team blue won!', 'Diarrhea spilled!'], ['Your Game Stats', 'Piss under the bridge...'], ['kill', 'Flush'],
		['assist', 'Drip'], ['carrier kill', 'Unclogged'], ['flag return', 'Turd bagged'], ['headshot', 'Splash'], ['long range', 'Transcending turd'],
		['total', 'PeePees held'], ['claim x2', ''],
		// Loadouts
		['Are you sure you want to delete this preset?', 'Cleaning up?'], ['Presets', 'Shitsets'], ['Preset', 'Shitset'],
		['Scout', 'Diarrhea'], ['Assault', 'Shitter'], ['Sharpshooter', 'Shy Pooper'], ['Runner', 'Squatter'], ['Support', 'KFC Enjoyer'],
		['Defender', 'Fat Shitter'], ['Edit', 'Shitit'],
		// Shop
		['Looks', 'Shitlooks'], ['Gear', 'Gówno'], ['Bow', 'Bowel'], ['Arrow', 'Poop'], ['Melee', 'Toilet Rack'], ['Rewarded', 'Cheapstakes'], ['Confirm your purchase', 'Firmshit your shitchase'], ['Get Item', 'Gethit Shitem'], ['Ad failed to load', 'Ass failed to unload'], ['An error occurred while trying to load the ad.', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', 'You"re supposed to PUSH it out, not the other way around!'],
		// Shop: Looks
		['Skin color', 'Shit Shade'], ['Hair', 'Bird poop'], ['Eyebrows', '🤨'], ['Eyes', 'Shitsight'], ['Beard', 'Pubic hair'], ['Tattoos', 'Gang affiliation'],
		// Shop: Gear
		['Head', 'Shithead'], ['Torso', 'Shat Chest'], ['Arms', 'Wipers'], ['Legs', 'Change shat pants'], ['Quiver', 'Shit basket'],
		// Shop: Stats
		['Movement Speed', '(SPD) Toilet Rush'], ['Damage Protection', '(ARM) Turd Weight'], ['Health Regen Speed', '(REG) Anus Stretchness'], ['bloodlust', 'Coprophilia']
    ]);
    const COIN_SELECTOR = '.coin-count-text';
    const COIN_TRANSLATION = 'Shitload';
    let bodyObserver = null;
    let gameObserver = null;
    let scheduled = false;
    // Nodes that need processing during the next animation frame.
    const pendingRoots = new Set();
    function getGameWrapper() {
        return document.querySelector(GAME_WRAPPER_SELECTOR);
    }
    function translateTextNode(textNode, gameWrapper) {
        if (!textNode.isConnected || !gameWrapper.contains(textNode)) {
            return;
        }
        const originalText = textNode.nodeValue;
        const trimmedText = originalText.trim();
        if (!trimmedText) {
            return;
        }
        const replacement = TEXT_REPLACEMENTS.get(trimmedText);
        if (replacement === undefined || replacement === trimmedText) {
            return;
        }

        // Preserve whitespace around the original text.
        const leadingWhitespace = originalText.match(/^\s*/)[0];
        const trailingWhitespace = originalText.match(/\s*$/)[0];
        textNode.nodeValue =
            leadingWhitespace +
            replacement +
            trailingWhitespace;
    }
    function translateElement(element, gameWrapper) {
        if (!element.isConnected) {
            return;
        }
        // Only process elements belonging to the game wrapper.
        if (element !== gameWrapper && !gameWrapper.contains(element)) {
            return;
        }
        // Translate coin-count elements only when a change is necessary.
        if (element.matches(COIN_SELECTOR)) {
            if (element.textContent !== COIN_TRANSLATION) {
                element.textContent = COIN_TRANSLATION;
            }
            if (
                element.getAttribute('data-text-content') !==
                COIN_TRANSLATION
            ) {
                element.setAttribute(
                    'data-text-content',
                    COIN_TRANSLATION
                );
            }
        }
        for (const coinElement of element.querySelectorAll(COIN_SELECTOR)) {
            if (coinElement.textContent !== COIN_TRANSLATION) {
                coinElement.textContent = COIN_TRANSLATION;
            }
            if (
                coinElement.getAttribute('data-text-content') !==
                COIN_TRANSLATION
            ) {
                coinElement.setAttribute(
                    'data-text-content',
                    COIN_TRANSLATION
                );
            }
        }
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT
        );
        const textNodes = [];
        let textNode;
        while ((textNode = walker.nextNode())) {
            textNodes.push(textNode);
        }
        for (const node of textNodes) {
            translateTextNode(node, gameWrapper);
        }
    }
    function processPendingNodes() {
        scheduled = false;
        const gameWrapper = getGameWrapper();
        if (!gameWrapper) {
            pendingRoots.clear();
            return;
        }
        const roots = [...pendingRoots];
        pendingRoots.clear();
        for (const root of roots) {
            if (!root.isConnected) {
                continue;
            }
            if (root === gameWrapper) {
                translateElement(gameWrapper, gameWrapper);
                return;
            }
            if (root.nodeType === Node.ELEMENT_NODE) {
                if (root.contains(gameWrapper)) {
                    translateElement(gameWrapper, gameWrapper);
                    return;
                }
                if (gameWrapper.contains(root)) {
                    translateElement(root, gameWrapper);
                }
            } else if (
                root.nodeType === Node.TEXT_NODE &&
                gameWrapper.contains(root)
            ) {
                translateTextNode(root, gameWrapper);
            }
        }
    }
    function scheduleProcessing(root) {
        if (root) {
            pendingRoots.add(root);
        }
        if (!scheduled) {
            scheduled = true;
            requestAnimationFrame(processPendingNodes);
        }
    }
    function startGameObserver() {
        if (gameObserver || !document.body) {
            return;
        }
        gameObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'characterData') {
                    scheduleProcessing(mutation.target);
                    continue;
                }
				if (mutation.type === 'attributes') {
					scheduleProcessing(mutation.target);
					continue;
				}
                for (const addedNode of mutation.addedNodes) {
                    if (
                        addedNode.nodeType === Node.ELEMENT_NODE ||
                        addedNode.nodeType === Node.TEXT_NODE
                    ) {
                        scheduleProcessing(addedNode);
                    }
                }
            }
        });
        gameObserver.observe(document.body, {
            childList: true,
            characterData: true,
			attributes: true,
			attributeFilter: ['data-text-content'],
            subtree: true
        });
        // Translate anything that already exists.
        const gameWrapper = getGameWrapper();
        if (gameWrapper) {
            scheduleProcessing(gameWrapper);
        }
    }
    function waitForBody() {
        if (document.body) {
            startGameObserver();
            return;
        }
        bodyObserver = new MutationObserver(() => {
            if (document.body) {
                bodyObserver.disconnect();
                bodyObserver = null;
                startGameObserver();
            }
        });
        bodyObserver.observe(document.documentElement, {
            childList: true
        });
    }
    waitForBody();
})();
