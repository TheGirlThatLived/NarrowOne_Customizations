// ==UserScript==
// @name         Cyan Liquid Glass by vyrin
// @namespace    http://tampermonkey.net/
// @version      1.41
// @description  A stunning Liquid Glass UI theme with a vibrant Cyan aesthetic for Narrow.one
// @author       vyrin
// @match        https://narrow.one/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        div.buttonImage {
            box-shadow: 0 0 20px 10px #00ffd0, 0 0 30px 15px #00ffd0, rgba(0, 0, 255, 0.1);
        }
        .main-menu-username {
            color: #00ffd0 !important;
        }
        .scoreOffsetNotificationAnim {
            color: #00ffa6 !important;
            text-shadow: 0 0 10px #8327ab, 0 0 20px #6a138f, 0 0 30px #470663, 0 0 40px #470663 !important;
            pointer-events: none;
        }
        .scoreOffsetNotificationScore {
            color: #00ffd0 !important;
        }
        div.dialog.dialogTitle {
            color: #00ffd0 !important;
        }
        .main-menu-corner-profile .avatar {
            background-image: url(https://i.ibb.co/twSx3g1z/Logo-of-CN-2.png    );
            background-size: cover;
            padding: 1.2rem;
            border: 5px solid #b69c09;
            border-radius: 50px;
        }
        .dialog.wrinkledPaper,
        .chat-container,
        .main-menu-button-container,
        .dialog-button {
            position: flex;
            border-radius: 24px;
            padding: 18px 32px;
            overflow: visible;
            backdrop-filter: blur(40px) saturate(180%) brightness(1.2);
            -webkit-backdrop-filter: blur(40px) saturate(180%) brightness(1.2);
            background: linear-gradient(135deg,
                rgba(255, 255, 255, 0.15) 0%,
                rgba(255, 255, 255, 0.05) 50%,
                rgba(0, 255, 208, 0.05) 100%
            ) !important;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.25),
                0 0 40px rgba(0, 255, 208, 0.1),
                inset 0 2px 2px rgba(255, 255, 255, 0.5),
                inset 0 -1px 1px rgba(255, 255, 255, 0.1);
            color: #00ffd0 !important;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }
        .dialog-button:hover {
            background: linear-gradient(135deg,
                rgba(255, 255, 255, 0.25) 0%,
                rgba(0, 255, 208, 0.1) 100%
            ) !important;
            box-shadow:
                0 15px 40px rgba(0, 0, 0, 0.3),
                0 0 60px rgba(0, 255, 208, 0.2),
                inset 0 2px 4px rgba(2, 255, 255, 0.6);
        }
        .chat-container,
        .chat-container *,
        .chat-container input,
        .chat-container textarea,
        .chat-container::placeholder {
            color: #00ffd0 !important;
        }
        .chat-container::-webkit-scrollbar-thumb {
            background: rgba(0, 255, 208, 0.4);
            border-radius: 4px;
        }
        .chat-container::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.15);
        }
        body, div, span, p, label, h1, h2, h3, h4, h5, h6, small, button, a, strong, b, td, th, li, input::placeholder, textarea::placeholder {
            color: #00ffd0 !important;
        }
        .kills-display, .death-display {
            font-size: 21px;
            font-weight: bold;
            font-family: AnglicanText, Arial, sans-serif;
            color: #03fcb6 !important;
            padding: 5px;
            display: block;
            flex-grow: 0;
            flex-shrink: 2;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            margin-top: 2px;
        }
    `);

    async function displayStats() {
        await new Promise(resolve => setTimeout(resolve, 2000));

        var dbRequest = indexedDB.open("keyValuesDb");

        dbRequest.onerror = function(event) {
            console.error("Failed to open the database:", event.target.errorCode);
        };

        dbRequest.onsuccess = function(event) {
            var db = event.target.result;
            var transaction = db.transaction(["keyValues"], "readwrite");
            var objectStore = transaction.objectStore("keyValues");
            var getRequest = objectStore.get('cachedProfileState');

            getRequest.onsuccess = function(event) {
                var profileData = event.target.result;
                if (profileData && profileData.stats) {
                    const kills = JSON.stringify(profileData.stats.kills);
                    const deaths = JSON.stringify(profileData.stats.deaths);

                    var profileElement = document.querySelector(".main-menu-corner-profile");
                    if (profileElement) {
                        var killsDisplay = document.createElement("div");
                        var deathsDisplay = document.createElement("div");

                        killsDisplay.textContent = "Kills: " + kills;
                        killsDisplay.className = "kills-display";

                        deathsDisplay.textContent = "Deaths: " + deaths;
                        deathsDisplay.className = "death-display";

                        profileElement.appendChild(killsDisplay);
                        profileElement.appendChild(deathsDisplay);
                    } else {
                        console.error("Element .main-menu-corner-profile not found.");
                    }
                }
            };

            getRequest.onerror = function(event) {
                console.error("Error retrieving data:", event.target.errorCode);
            };
        };
    }

    displayStats();
})();
