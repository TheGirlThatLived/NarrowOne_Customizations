// ==UserScript==
// @name         Fan Translation (Shitongue)
// @namespace    http://tampermonkey.net/
// @version      20260205_1913
// @description  Translating menu buttons
// @author       Guest 0187; Lord Graz
// @run-at       document-start
// @match        https://narrow.one/
// @icon         https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/1f4a9.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/FanTranslation(Shitongue).js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/FanTranslation(Shitongue).js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function translateButtonText() {
        const translatedCoinCount = document.querySelectorAll('.coin-count-text');
        translatedCoinCount.forEach(translatedCoinCount => {
            translatedCoinCount.setAttribute('data-text-content', 'Shitload');
            translatedCoinCount.textContent = 'Shitload';
        });
        const translatedButtons = []
        const walker = document.createTreeWalker(document.getElementById("gameWrapper"), NodeFilter.SHOW_TEXT)
        while(walker.nextNode()) {
            translatedButtons.push(walker.currentNode)
        }
        translatedButtons.forEach(untranslatedButton => {
            const trimmedValue = untranslatedButton.nodeValue.trim()
            if(!trimmedValue) return;
            switch(untranslatedButton.nodeValue) {
                case 'Click to join':
                    untranslatedButton.nodeValue = 'Shit in Play';
                    break;
                case 'Press T to chat with your squad':
                    untranslatedButton.nodeValue = 'Activate Windows';
                    break;
                    // Main Menu buttons
                case 'Settings':
                    untranslatedButton.nodeValue = 'Shittings';
                    break;
                case 'Shop':
                    untranslatedButton.nodeValue = 'Shit';
                    break;
                case 'Squad':
                    untranslatedButton.nodeValue = 'Squat';
                    break;
                case 'Maps':
                    untranslatedButton.nodeValue = 'Shitstains';
                    break;
                case 'Full Screen':
                    untranslatedButton.nodeValue = 'Gloryhole';
                    break;
                case 'Exit Full Screen':
                    untranslatedButton.nodeValue = 'Undrill it';
                    break;
                case 'Enable Auto Full Screen?':
                    untranslatedButton.nodeValue = 'Wanna drill it?';
                    break;
                case 'Do you automatically want to enter full screen when joining a game? (This can be disabled later in settings)':
                    untranslatedButton.nodeValue = 'Would you be comfortable shitting next to someone, two of you connected by a hole in thin wall?';
                    break;
                case 'Heck Yeah!':
                    untranslatedButton.nodeValue = 'Competitive Shitsession!';
                    break;
                case 'No Thanks':
                    untranslatedButton.nodeValue = 'Poop alone :-(';
                    break;
                case 'Install':
                    untranslatedButton.nodeValue = 'Shit Yourself';
                    break;
                case 'Exit Round':
                    untranslatedButton.nodeValue = 'Leaving Shithouse';
                    break;
                case 'Join our Discord':
                    untranslatedButton.nodeValue = 'Shitting Club';
                    break;
                    // Match dialogs
                case 'Are you sure?':
                    untranslatedButton.nodeValue = 'Shat yourself?';
                    break;
                case 'You will not earn any coins from this match.':
                    untranslatedButton.nodeValue = 'Pissed your pants maybe?';
                    break;
                case 'You are the squad leader so all members will exit this match too. No one will earn any coins from this match.':
                    untranslatedButton.nodeValue = 'Pissed your pants maybe in front of the whole squatters class?';
                    break;
                case 'Exit':
                    untranslatedButton.nodeValue = 'Close the lid';
                    break;
                case 'stay in game':
                    untranslatedButton.nodeValue = 'Imma fart some more';
                    break;
                case 'Connection closed':
                    untranslatedButton.nodeValue = 'Toilet Flushed';
                    break;
                case 'You have been kicked for being afk for too long.':
                    untranslatedButton.nodeValue = 'Janitor kicked you out for clogging the pipe.';
                    break;
                case 'ok':
                    untranslatedButton.nodeValue = 'Pants Pullup';
                    break;
                case 'Squad not found':
                    untranslatedButton.nodeValue = 'Toilet Demolished';
                    break;
                case 'You are currently in a game':
                    untranslatedButton.nodeValue = 'Toilet seat taken';
                    break;
                case 'Do you want to leave the current match?':
                    untranslatedButton.nodeValue = '(you hear someone knocking on your stall door...)';
                    break;
                case 'Yes':
                    untranslatedButton.nodeValue = 'Come on!';
                    break;
                case 'No':
                    untranslatedButton.nodeValue = '(farts & defecates)';
                    break;
                case 'Ad failed to load':
                    untranslatedButton.nodeValue = 'Ass failed to unload';
                    break;
                case 'An error occurred while trying to load the ad.':
                    untranslatedButton.nodeValue = 'You"re supposed to PUSH it out, not the other way around!';
                    break;
                case 'Confirm your purchase':
                    untranslatedButton.nodeValue = 'Firmshit your shitchase';
                    break;
                case 'Cancel':
                    untranslatedButton.nodeValue = 'Shitcel';
                    break;
                case 'Get Item':
                    untranslatedButton.nodeValue = 'Gethit Shitem';
                    break;
                case 'Invite someone':
                    untranslatedButton.nodeValue = 'Pass Toilet Paper';
                    break;
                case 'Join existing squad':
                    untranslatedButton.nodeValue = 'Public Toilet';
                    break;
                case 'Ready':
                    untranslatedButton.nodeValue = 'Shyt';
                    break;
                case 'Start':
                    untranslatedButton.nodeValue = 'Shat';
                    break;
                case 'Still connecting':
                    untranslatedButton.nodeValue = 'Still pushing';
                    break;
                case 'Connecting seems to take longer than expected. Do you want to keep trying?':
                    untranslatedButton.nodeValue = 'Contracting poop-birthing cramps seems to take longer than expected. Do you want to keep trying?';
                    break;
                case 'Keep trying':
                    untranslatedButton.nodeValue = 'Push harder';
                    break;
                case 'The connection closed abruptly :(':
                    untranslatedButton.nodeValue = 'Water spilled outta toilet onto tiled floor :-(';
                    break;
                    // Scoreboard
                case 'team red':
                    untranslatedButton.nodeValue = 'Haemorrhoids';
                    break;
                case 'team blue':
                    untranslatedButton.nodeValue = 'Diarrhea';
                    break;
                case 'flags':
                    untranslatedButton.nodeValue = 'Toilets';
                    break;
                case 'kills':
                    untranslatedButton.nodeValue = 'Flushed';
                    break;
                case 'deaths':
                    untranslatedButton.nodeValue = 'Clogged';
                    break;
                case 'score':
                    untranslatedButton.nodeValue = 'Stank';
                    break;
                case 'team red won!':
                    untranslatedButton.nodeValue = 'Haemorrhoids bursted!';
                    break;
                case 'team blue won!':
                    untranslatedButton.nodeValue = 'Diarrhea spilled!';
                    break;
                case 'Your Game Stats':
                    untranslatedButton.nodeValue = 'Piss under the bridge...';
                    break;
                case 'kill':
                    untranslatedButton.nodeValue = 'Flush';
                    break;
                case 'assist':
                    untranslatedButton.nodeValue = 'Drip';
                    break;
                case 'carrier kill':
                    untranslatedButton.nodeValue = 'Unclogged';
                    break;
                case 'flag return':
                    untranslatedButton.nodeValue = 'Turd bagged';
                    break;
                case 'headshot':
                    untranslatedButton.nodeValue = 'Splash';
                    break;
                case 'long range':
                    untranslatedButton.nodeValue = 'Transcending turd';
                    break;
                case 'total':
                    untranslatedButton.nodeValue = 'PeePees held';
                    break;
                case 'claim x2':
                    untranslatedButton.nodeValue = '';
                    break;
                    // Loadouts
                case 'Are you sure you want to delete this preset?':
                    untranslatedButton.nodeValue = 'Cleaning up?';
                    break;
                case 'Presets':
                    untranslatedButton.nodeValue = 'Shitsets';
                    break;
                case 'Preset':
                    untranslatedButton.nodeValue = 'Shitset';
                    break;
                case 'Scout':
                    untranslatedButton.nodeValue = 'Diarrhea';
                    break;
                case 'Assault':
                    untranslatedButton.nodeValue = 'Shitter';
                    break;
                case 'Sharpshooter':
                    untranslatedButton.nodeValue = 'Shy Pooper';
                    break;
                case 'Runner':
                    untranslatedButton.nodeValue = 'Squatter';
                    break;
                case 'Support':
                    untranslatedButton.nodeValue = 'KFC Enjoyer';
                    break;
                case 'Defender':
                    untranslatedButton.nodeValue = 'Fat Shitter';
                    break;
                case 'Edit':
                    untranslatedButton.nodeValue = 'Shitit';
                    break;
                    // Shop
                case 'Looks':
                    untranslatedButton.nodeValue = 'Shitlooks';
                    break;
                case 'Gear':
                    untranslatedButton.nodeValue = 'Gówno';
                    break;
                case 'Bow':
                    untranslatedButton.nodeValue = 'Bowel';
                    break;
                case 'Arrow':
                    untranslatedButton.nodeValue = 'Poop';
                    break;
                case 'Melee':
                    untranslatedButton.nodeValue = 'Toilet Rack';
                    break;
                case 'Rewarded':
                    untranslatedButton.nodeValue = 'Cheapstakes';
                    break;
                    // Shop: Looks
                case 'Skin color':
                    untranslatedButton.nodeValue = 'Shit Shade';
                    break;
                case 'Hair':
                    untranslatedButton.nodeValue = 'Bird poop';
                    break;
                case 'Eyebrows':
                    untranslatedButton.nodeValue = '🤨';
                    break;
                case 'Eyes':
                    untranslatedButton.nodeValue = 'Shitsight';
                    break;
                case 'Beard':
                    untranslatedButton.nodeValue = 'Pubic hair';
                    break;
                case 'Tattoos':
                    untranslatedButton.nodeValue = 'Gang affiliation';
                    break;
                    // Shop: Gear
                case 'Head':
                    untranslatedButton.nodeValue = 'Shithead';
                    break;
                case 'Torso':
                    untranslatedButton.nodeValue = 'Shat Chest';
                    break;
                case 'Arms':
                    untranslatedButton.nodeValue = 'Wipers';
                    break;
                case 'Legs':
                    untranslatedButton.nodeValue = 'Change shat pants';
                    break;
                case 'Quiver':
                    untranslatedButton.nodeValue = 'Shit basket';
                    break;
                    // Shop: Stats
                case 'Movement Speed':
                    untranslatedButton.nodeValue = '(SPD) Toilet Rush'; // Error
                    break;
                case 'Damage Protection':
                    untranslatedButton.nodeValue = '(ARM) Turd Weight'; // Error
                    break;
                case 'Health Regen Speed':
                    untranslatedButton.nodeValue = '(REG) Anus Stretchness'; // Error
                    break;
                case 'bloodlust':
                    untranslatedButton.nodeValue = 'Coprophilia'; // Error
                    break;
            }
        })
    }
    // Initial replacement on page load
    translateButtonText();
    // Observe for dynamic content changes
    const observer = new MutationObserver(translateButtonText);
    observer.observe(document.body, { childList: true, subtree: true });
})();
