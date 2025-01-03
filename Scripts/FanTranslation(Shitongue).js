// ==UserScript==
// @name         Fan Translation (Shitongue)
// @namespace    http://tampermonkey.net/
// @version      20241216
// @description  Translating menu buttons
// @author       Incredible_Violent & Copilot
// @run-at       document-start
// @match        https://narrow.one/
// @icon         https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/1f4a9.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/FanTranslation(Shitongue).js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/FanTranslation(Shitongue).js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Function to replace the text
    function translateButtonText() {
        const translatedCoinCount = document.querySelectorAll('.coin-count-text');
        translatedCoinCount.forEach(translatedCoinCount => {
            translatedCoinCount.setAttribute('data-text-content', 'Shitload');
            translatedCoinCount.textContent = 'Shitload';
        });
        const translatedButtons = document.querySelectorAll('.main-menu-button-text, button.dialog-button, div.mainInfoText, h3.dialogTitle, span.coin-count-text.blueNight, h2.dialogTitle, .dialogText, .stat-class-tooltip');
        translatedButtons.forEach(untranslatedButton => {
            switch(untranslatedButton.textContent.trim()) {
                case 'Click to join':
                    untranslatedButton.textContent = 'Shit in Play';
                    break;
                case 'Press T to chat with your squad':
                    untranslatedButton.textContent = 'Activate Windows';
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
                    untranslatedButton.textContent = 'Gloryhole';
                    break;
                case 'Exit Full Screen':
                    untranslatedButton.textContent = 'Undrill it';
                    break;
                case 'Enable Auto Full Screen?':
                    untranslatedButton.textContent = 'Wanna drill it?';
                    break;
                case 'Do you automatically want to enter full screen when joining a game? (This can be disabled later in settings)':
                    untranslatedButton.textContent = 'Would you be comfortable shitting next to someone, two of you connected by a hole in thin wall?';
                    break;
                case 'Heck Yeah!':
                    untranslatedButton.textContent = 'Competitive Shitsession!';
                    break;
                case 'No Thanks':
                    untranslatedButton.textContent = 'Poop alone :-(';
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
                case 'Are you sure?':
                    untranslatedButton.textContent = 'Shat yourself?';
                    break;
                case 'You will not earn any coins from this match.':
                    untranslatedButton.textContent = 'Pissed your pants maybe?';
                    break;
                case 'You are the squad leader so all members will exit this match too. No one will earn any coins from this match.':
                    untranslatedButton.textContent = 'Pissed your pants maybe in front of the whole squatters class?';
                    break;
                case 'Exit':
                    untranslatedButton.textContent = 'Close the lid';
                    break;
                case 'stay in game':
                    untranslatedButton.textContent = 'Imma fart some more';
                    break;
                case 'Connection closed':
                    untranslatedButton.textContent = 'Toilet Flushed';
                    break;
                case 'You have been kicked for being afk for too long.':
                    untranslatedButton.textContent = 'Janitor kicked you out for clogging the pipe.';
                    break;
                case 'ok':
                    untranslatedButton.textContent = 'Pants Pullup';
                    break;
                case 'Squad not found':
                    untranslatedButton.textContent = 'Toilet Demolished';
                    break;
                case 'You are currently in a game':
                    untranslatedButton.textContent = 'Toilet seat taken';
                    break;
                case 'Do you want to leave the current match?':
                    untranslatedButton.textContent = '(you hear someone knocking on your stall door...)';
                    break;
                case 'Yes':
                    untranslatedButton.textContent = 'Come on!';
                    break;
                case 'No':
                    untranslatedButton.textContent = '(farts & defecates)';
                    break;
                case 'Ad failed to load':
                    untranslatedButton.textContent = 'Ass failed to unload';
                    break;
                case 'An error occurred while trying to load the ad.':
                    untranslatedButton.textContent = 'You"re supposed to PUSH it out, not the other way around!';
                    break;
                case 'Confirm your purchase':
                    untranslatedButton.textContent = 'Firmshit your shitchase';
                    break;
                case 'Cancel':
                    untranslatedButton.textContent = 'Shitcel';
                    break;
                case 'Get Item':
                    untranslatedButton.textContent = 'Gethit Shitem';
                    break;
                case 'Invite someone':
                    untranslatedButton.textContent = 'Pass Toilet Paper';
                    break;
                case 'Join existing squad':
                    untranslatedButton.textContent = 'Public Toilet';
                    break;
                case 'Ready':
                    untranslatedButton.textContent = 'Shyt';
                    break;
                case 'Start':
                    untranslatedButton.textContent = 'Shat';
                    break;
                case 'Still connecting':
                    untranslatedButton.textContent = 'Still pushing';
                    break;
                case 'Connecting seems to take longer than expected. Do you want to keep trying?':
                    untranslatedButton.textContent = 'Contracting poop-birthing cramps seems to take longer than expected. Do you want to keep trying?';
                    break;
                case 'Keep trying':
                    untranslatedButton.textContent = 'Push harder';
                    break;
                case 'The connection closed abruptly :(':
                    untranslatedButton.textContent = 'Water spilled outta toilet onto tiled floor :-(';
                    break;
                    // Loadouts
                case 'Are you sure you want to delete this preset?':
                    untranslatedButton.textContent = 'Cleaning up?';
                    break;
                case 'Presets':
                    untranslatedButton.textContent = 'Shitsets';
                    break;
                case 'Preset':
                    untranslatedButton.textContent = 'Shitset';
                    break;
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
                case 'Edit':
                    untranslatedButton.textContent = 'Shitit';
                    break;
                    // Shop
                case 'Looks':
                    untranslatedButton.textContent = 'Shitlooks';
                    break;
                case 'Gear':
                    untranslatedButton.textContent = 'Gówno';
                    break;
                case 'Bow':
                    untranslatedButton.textContent = 'Bowel';
                    break;
                case 'Arrow':
                    untranslatedButton.textContent = 'Poop';
                    break;
                case 'Melee':
                    untranslatedButton.textContent = 'Toilet Rack';
                    break;
                case 'Rewarded':
                    untranslatedButton.textContent = 'Cheapstakes';
                    break;
                    // Shop: Looks
                case 'Skin color':
                    untranslatedButton.textContent = 'Shit Shade';
                    break;
                case 'Hair':
                    untranslatedButton.textContent = 'Bird poop';
                    break;
                case 'Eyebrows':
                    untranslatedButton.textContent = '🤨';
                    break;
                case 'Eyes':
                    untranslatedButton.textContent = 'Shitsight';
                    break;
                case 'Beard':
                    untranslatedButton.textContent = 'Pubic hair';
                    break;
                case 'Tattoos':
                    untranslatedButton.textContent = 'Gang affiliation';
                    break;
                    // Shop: Gear
                case 'Head':
                    untranslatedButton.textContent = 'Shithead';
                    break;
                case 'Torso':
                    untranslatedButton.textContent = 'Shat Chest';
                    break;
                case 'Arms':
                    untranslatedButton.textContent = 'Wipers';
                    break;
                case 'Legs':
                    untranslatedButton.textContent = 'Change shat pants';
                    break;
                case 'Quiver':
                    untranslatedButton.textContent = 'Shit basket';
                    break;
                    // Shop: Stats
                case 'Movement Speed':
                    untranslatedButton.textContent = '(SPD) Toilet Rush'; // Error
                    break;
                case 'Damage Protection':
                    untranslatedButton.textContent = '(ARM) Turd Weight'; // Error
                    break;
                case 'Health Regen Speed':
                    untranslatedButton.textContent = '(REG) Anus Stretchness'; // Error
                    break;
                case 'bloodlust':
                    untranslatedButton.textContent = 'Coprophilia'; // Error
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
