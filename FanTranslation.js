// ==UserScript==
// @name         Fan Translation
// @namespace    http://tampermonkey.net/
// @version      2024-11-04
// @description  Translating menu buttons
// @author       Copilot
// @run-at       document-start
// @match        https://narrow.one/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=narrow.one
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Function to replace the text
    function translateButtonText() {
        const translatedCoinCount = document.querySelector('.coin-count-text.blueNight');
        if (translatedCoinCount) {
            translatedCoinCount.setAttribute('data-text-content', 'Shitload');
            translatedCoinCount.textContent = 'Shitload';
        }
        const translatedButtons = document.querySelectorAll('.main-menu-button-text, button.dialog-button, div.mainInfoText, h3.dialogTitle, span.coin-count-text.blueNight, h2.dialogTitle, .dialogText');
        translatedButtons.forEach(untranslatedButton => {
            switch(untranslatedButton.textContent.trim()) {
                case 'Click to Join':
                    untranslatedButton.textContent = 'Shit in Play'; // Error
                    break;
                    // Main Menu buttons
                case 'Settings':
                    untranslatedButton.textContent = 'Shittings';
                    break;
                case 'Shop':
                    untranslatedButton.textContent = 'Shit';
                    break;
                case 'Squad':
                    untranslatedButton.textContent = 'Squat';
                    break;
                case 'Maps':
                    untranslatedButton.textContent = 'Shitstains';
                    break;
                case 'Full Screen':
                    untranslatedButton.textContent = 'Full Focus Shitting';
                    break;
                case 'Install':
                    untranslatedButton.textContent = 'Shit Yourself';
                    break;
                case 'Exit Round':
                    untranslatedButton.textContent = 'Leaving Shithouse';
                    break;
                case 'Join our Discord':
                    untranslatedButton.textContent = 'Shitting Club';
                    break;
                    // Match dialogs
                case 'Are You Sure?':
                    untranslatedButton.textContent = 'Shat yourself?'; // Error
                    break;
                case 'You will not earn any coing from this match.':
                    untranslatedButton.textContent = 'Pissed your pants maybe?'; // Error
                    break;
                case 'Exit':
                    untranslatedButton.textContent = 'Close the lid';
                    break;
                case 'Stay in Game':
                    untranslatedButton.textContent = 'Imma fart some more'; // Error
                    break;
                case 'Connection Closed':
                    untranslatedButton.textContent = 'Toilet Flushed'; // Error
                    break;
                case 'You have been kicked for being afk for too long.':
                    untranslatedButton.textContent = 'Janitor kicked you out for clogging the pipe.';
                    break;
                case 'Ok':
                    untranslatedButton.textContent = 'Pants Pullup'; // Error
                    break;
                    // Squads
                case 'Invite Someone':
                    untranslatedButton.textContent = 'Pass Toilet Paper'; // Error
                    break;
                case 'Join Existing Squad':
                    untranslatedButton.textContent = 'Public Toilet'; // Error
                    break;
                case 'Ready':
                    untranslatedButton.textContent = 'Shyt';
                    break;
                case 'Start':
                    untranslatedButton.textContent = 'Shat';
                    break;
                    // Shop
                case 'Scout':
                    untranslatedButton.textContent = 'Diarrhea';
                    break;
                case 'Assault':
                    untranslatedButton.textContent = 'Shitter';
                    break;
                case 'Sharpshooter':
                    untranslatedButton.textContent = 'Shy Pooper';
                    break;
                case 'Runner':
                    untranslatedButton.textContent = 'Squatter';
                    break;
                case 'Support':
                    untranslatedButton.textContent = 'KFC Enjoyer';
                    break;
                case 'Defender':
                    untranslatedButton.textContent = 'Fat Shitter';
                    break;
            }
        });
    }
    // Initial replacement on page load
    translateButtonText();
    // Observe for dynamic content changes
    const observer = new MutationObserver(translateButtonText);
    observer.observe(document.body, { childList: true, subtree: true });
})();