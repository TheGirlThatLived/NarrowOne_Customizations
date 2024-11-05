// ==UserScript==
// @name         Fan Translation (Swiss German)
// @namespace    http://tampermonkey.net/
// @version      2024-11-04
// @description  Translating menu buttons
// @author       Lolopano
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
            translatedCoinCount.setAttribute('data-text-content', 'Viel');
            translatedCoinCount.textContent = 'Viel';
        }
        const translatedButtons = document.querySelectorAll('.main-menu-button-text, button.dialog-button, div.mainInfoText, h3.dialogTitle, span.coin-count-text.blueNight, h2.dialogTitle, .dialogText');
        translatedButtons.forEach(untranslatedButton => {
            switch(untranslatedButton.textContent.trim()) {
                case 'Click to join':
                    untranslatedButton.textContent = 'Drucke zum bitrete';
                    break;
                    // Main Menu buttons
                case 'Settings':
                    untranslatedButton.textContent = 'Istellige';
                    break;
                case 'Shop':
                    untranslatedButton.textContent = 'Ichaufslade';
                    break;
                case 'Squad':
                    untranslatedButton.textContent = 'Gruppä';
                    break;
                case 'Maps':
                    untranslatedButton.textContent = 'Charte';
                    break;
                case 'Full Screen':
                    untranslatedButton.textContent = 'Volls bild';
                    break;
                case 'Enable Auto Full Screen?':
                    untranslatedButton.textContent = 'Volls bild aschalte?';
                    break;
                case 'Do you automatically want to enter full screen when joining a game? (This can be disabled later in settings)':
                    untranslatedButton.textContent = 'Wotsch automatisch volls bild ischalte wenn emene spiel bitritsch?';
                    break;
                case 'Heck Yeah!':
                    untranslatedButton.textContent = 'Ja!';
                    break;
                case 'No Thanks':
                    untranslatedButton.textContent = 'Nei';
                    break;
                case 'Install':
                    untranslatedButton.textContent = 'Abelade';
                    break;
                case 'Exit Round':
                    untranslatedButton.textContent = 'Spiel verlah';
                    break;
                case 'Join our Discord':
                    untranslatedButton.textContent = 'Discord bitrete';
                    break;
                case 'Save':
                    untranslatedButton.textContent = 'Speichere';
                    break;
                    // Match dialogs
                case 'Are you sure?':
                    untranslatedButton.textContent = 'Bisch dir sicher';
                    break;
                case 'You will not earn any coins from this match.':
                    untranslatedButton.textContent = 'Du wirsch kei geld vo dem Spiel becho?';
                    break;
                case 'You are the squad leader so all members will exit this match too. No one will earn any coins from this match.':
                    untranslatedButton.textContent = 'Du bisch de Gruppe äfuehrer, wenn du das Spiel verlahsch werded alli usetah und niemert wirt Geld vo dem Spiel becho.';
                    break;
                case 'Exit':
                    untranslatedButton.textContent = 'Verlah';
                    break;
                case 'stay in game':
                    untranslatedButton.textContent = 'Im spiel blibe';
                    break;
                case 'Connection closed':
                    untranslatedButton.textContent = 'Verbindig verlore';
                    break;
                case 'You have been kicked for being afk for too long.':
                    untranslatedButton.textContent = 'Du hesch dich zlang nd bewegt.';
                    break;
                case 'ok':
                    untranslatedButton.textContent = 'Isch guet';
                    break;
                    // Squads
                case 'Invite someone':
                    untranslatedButton.textContent = 'Öpert ilade';
                    break;
                case 'Private squad':
                    untranslatedButton.textContent = 'Privates team';
                    break;
                case 'Join existing squad':
                    untranslatedButton.textContent = 'Exischtierende Gruppe bitrete';
                    break;
                case 'Ready':
                    untranslatedButton.textContent = 'Parat';
                    break;
                case 'Start':
                    untranslatedButton.textContent = 'Los';
                    break;
                    // Shop
                case 'Scout':
                    untranslatedButton.textContent = 'Jäger';
                    break;
                case 'Assault':
                    untranslatedButton.textContent = 'Misshandler';
                    break;
                case 'Sharpshooter':
                    untranslatedButton.textContent = 'Scharfschütz';
                    break;
                case 'Runner':
                    untranslatedButton.textContent = 'Renner';
                    break;
                case 'Support':
                    untranslatedButton.textContent = 'Hälfer';
                    break;
                case 'Defender':
                    untranslatedButton.textContent = 'Verteidiger';
                    break;
                case 'Edit':
                    untranslatedButton.textContent = 'Verändere';
                    break;
                case 'Presets':
                    untranslatedButton.textContent = 'Voristellige';
                    break;
                case 'Looks':
                    untranslatedButton.textContent = 'Usgseh';
                    break;
                case 'Gear':
                    untranslatedButton.textContent = 'Usrüstig';
                    break;
                case 'Bow':
                    untranslatedButton.textContent = 'Boge';
                    break;
                case 'Melee':
                    untranslatedButton.textContent = 'Nahkampfwaffe';
                    break;
                case 'Rewarded':
                    untranslatedButton.textContent = 'Belohnt';
                    break;
                case 'Handle':
                    untranslatedButton.textContent = 'Händle';
                    break;
                case 'Tip':
                    untranslatedButton.textContent = 'Spitze';
                    break;
                case 'Arrow':
                    untranslatedButton.textContent = 'Pfiil';
                    break;
                case 'Head':
                    untranslatedButton.textContent = 'Helm';
                    break;
                case 'Torso':
                    untranslatedButton.textContent = 'Brustplattene';
                    break;
                case 'Arms':
                    untranslatedButton.textContent = 'Ärm';
                    break;
                case 'Legs':
                    untranslatedButton.textContent = 'Bei';
                    break;
                case 'Quiver':
                    untranslatedButton.textContent = 'Chöcher';
                    break;
                case 'Skin color':
                    untranslatedButton.textContent = 'Huutfarb';
                    break;
                case 'Hair':
                    untranslatedButton.textContent = 'Har';
                    break;
                case 'Eyebrows':
                    untranslatedButton.textContent = 'Augebraue';
                    break;
                case 'Eyes':
                    untranslatedButton.textContent = 'Auge';
                    break;
                case 'Beard':
                    untranslatedButton.textContent = 'Bart';
                    break;
                case 'Tattoos':
                    untranslatedButton.textContent = 'Tätoos';
                    break;
                case 'Miscellaneous':
                    untranslatedButton.textContent = 'Anderi Sache';
                    break;
               //settings
                case 'Sound':
                   untranslatedButton.textContent = 'Ton';
                   break;
                case 'Sound effects volume':
                    untranslatedButton.textContent = 'Toneffekt lutstärchi';
                    break;
                case 'Musik volume':
                    untranslatedButton.textContent = 'Musik lutstärchi';
                    break;
                case 'Sfx distance cutoff':
                     untranslatedButton.textContent = 'Sfx distanz abschnit';
                     break;
                case 'Quality':
                     untranslatedButton.textContent = 'Qualität';
                     break;
                case 'Anit-Aliasing':
                    untranslatedButton.textContent = 'Chuchichäschtli';
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
