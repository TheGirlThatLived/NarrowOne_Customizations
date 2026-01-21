// ==UserScript==
// @name         Achievements in web N1
// @namespace    http://tampermonkey.net/
// @version      2025-08-26
// @description  adds client-side achievements from Steam version
// @author       Xeltalliv
// @match        https://narrow.one/
// @icon         https://www.svgrepo.com/show/448917/achievement.svg
// @downloadURL  https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/Achievements.js
// @updateURL    https://raw.githubusercontent.com/TheGirlThatLived/NarrowOne_Customizations/refs/heads/main/Scripts/Achievements.js
// @grant        unsafeWindow
// @run-at       doucment-start
// ==/UserScript==

// Disclaimer: the mod does not touch the game's internals,
// nor does it overwrite or "wrap" any existing functions.
// New UI elements are grafted through MutationObserver.
// There is no Steamworks in the web version.
// The mod acts as fake Steamworks and so N1 just
// ends up telling it about all the achievements.

(function() {
    'use strict';

    const uWindow = globalThis.unsafeWindow || globalThis.window;

    const errorDef = {
        "id": "error",
        "title": "Unknown Achievement",
        "desc": "",
        "image": "",
    };
    const achievementDefs = [
        {
            "id": "captureFlagAfterThree",
            "title": "Team effort",
            "desc": "Capture the flag after 3 other teammates held it.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/f68de7bb3507c4995fc3d3a991a06113212446f6.jpg",
        },
        {
            "id": "killWithFork",
            "title": "Dinner served",
            "desc": "Kill someone with full health using nothing but a fork.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/ae030391a1bc5c56c49d8a9c5665ca6eb89d71f3.jpg",
        },
        {
            "id": "killedByMeleeSpammer",
            "title": "Death by spammer",
            "desc": "Get killed by someone who has only been using a melee weapon for the last 5 minutes.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/b0a51138e753a3ec0d1ff9c0e09d2f6dc2f1030b.jpg",
        },
        {
            "id": "headshotTenNoMisses",
            "title": "Sharp shooter",
            "desc": "Headshot 10 different players without missing.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/ef2a6b299d8e3d70a2ef9c2e375b706c409380d6.jpg",
        },
        {
            "id": "hundredKillsNoDying",
            "title": "Invincible",
            "desc": "Get 100 kills in a single game without dying.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/8b8c89c887c90ad6b825c1edd174f44659c553f7.jpg",
        },
        {
            "id": "absorbTenArrows",
            "title": "Porcupine",
            "desc": "Use 20/20 damage protection armor to absorb 10 arrows without dying.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/5b1b6dcfd38a296d38148d86aff7da69585717ba.jpg",
        },
        {
            "id": "winAllMapsAsMonk",
            "title": "Pilgrim",
            "desc": "Win a game in every map as a monk.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/d591cc246a0d20e8ba3ed037d10f6de6495893e5.jpg",
        },
        {
            "id": "twelvePlayerSquad",
            "title": "Overcapacity",
            "desc": "Join a squad with more than 12 players.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/40693703a2f4547427ffb5aaadda0e9926dad276.jpg",
        },
        {
            "id": "stunAndSmallCrossbowKill",
            "title": "It's hammer time!",
            "desc": "Stun someone with a heavy blunt weapon, then kill them with a tiny arrow.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/1effadd4dceb467d5c4846478eead1adf03b68f1.jpg",
        },
        {
            "id": "ultraLongRange",
            "title": "Ultra long range",
            "desc": "Kill someone from the other end of the wall.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/2ab88f8c7cb4038ddd99127b32020e6c7e958735.jpg",
        },
        {
            "id": "allPointTypesCtf",
            "title": "Collector",
            "desc": "Score a point for every way there is to get a point in a CTF game.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/5e616cad9106ef5b8655131ba57bfe238727867b.jpg",
        },
        {
            "id": "fryingPanDeath",
            "title": "Deep fried",
            "desc": "Die by frying pan.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/5ef9dd9f002039e865edf67ee7e56e7262a5db04.jpg",
        },
        {
            "id": "thirtyMinuteMatch",
            "title": "Stalemate",
            "desc": "Finish a match that lasts more than 30 minutes.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/782d79973570eb96a543e5012e13c17963301a96.jpg",
        },
        {
            "id": "dropFlagTwenty",
            "title": "Butter fingers",
            "desc": "Drop the flag 20 times in a single game.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/b42ac0e718e55c84b105bb5029fa6950f45a6c09.jpg",
        },
        {
            "id": "thousandCoinsOneGame",
            "title": "Knights Fortune",
            "desc": "Gain a thousand coins from a single game.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/a65f0b50c58a62680439274f38d9b0ad5d195d60.jpg",
        },
        {
            "id": "headshotBeforeFallDeath",
            "title": "Worth it",
            "desc": "Make a fatal headshot right before plunging to your death.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/632436e59d2035fed0e86649d6dd24fc416fec9e.jpg",
        },
        {
            "id": "ownTwoHundredItems",
            "title": "Shopaholic",
            "desc": "Own more than 200 items.",
            "image": "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/3788170/20a280045161bd9824a34118a829aaa92df532f0.jpg",
        },
    ];
    function load() {
        for(const def of achievementDefs) {
            def.achieved = false;
        }
        const got = JSON.parse(localStorage.getItem("n1Achievements")) || [];
        for(const id of got) {
            const def = achievementDefs.find(ach => ach.id == id);
            if (def) def.achieved = true;
        }
    }
    uWindow.steamworks = { // Pretending there is steamworks
        achievement: {
            activate(id) { // Getting notified about unlocked achievements
                const array = JSON.parse(localStorage.getItem("n1Achievements")) || [];
                if (array.indexOf(id) > -1) return;
                array.push(id);
                localStorage.setItem("n1Achievements", JSON.stringify(array));
                load();
                showAchievementUnlockSplash(id);
            }
        },
        callback: {
            register(key, fn) { // Stub to prevent peli sdk from crashing
            },
            SteamCallback: {
                NewUrlLaunchParameters: "NewUrlLaunchParameters"
            }
        }
    }
    const isProfile = (elem) => elem && elem.childNodes[0] && elem.childNodes[0].classList && elem.childNodes[0].classList.contains("profile-container");
    const isSettings = (elem) => elem && elem.classList.contains("dialog") && elem.children[0].textContent == "Settings";
    const gameWrapperObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
                const addedNode = mutation.addedNodes[0];
                const removeNode = mutation.removedNodes[0];
                if (isProfile(addedNode)) {
                    addAchievementsToProfile(addedNode);
                }
                if (isSettings(addedNode)) {
                    const buttons = addedNode.getElementsByClassName("account-buttons")[0];
                    buttons.append(accountButton("Reset achievements", resetAchievements));
                }
                //console.log('Added', mutation.addedNodes, "Removed", mutation.removedNodes);
            }
        }
    });
    function resetAchievements() {
        localStorage.removeItem("n1Achievements");
        load();
    }
    function accountButton(text, callback) {
        const button = document.createElement("button");
        button.classList.add("dialog-button", "blueNight", "wrinkledPaper");
        button.style.setProperty("--wrinkled-paper-seed", String(1 + Math.floor(Math.random() * 99999)));
        const span = document.createElement("span");
        span.textContent = text;
        button.append(span);
        button.addEventListener("click", callback);
        return button;
    }
    function addAchievementsToProfile(root) {
        const mainContainer = document.createElement("table");
        const tbody = document.createElement("tbody");
        mainContainer.classList.add("profile-achievements", "itemsTable");
        mainContainer.style.setProperty("--wrinkled-paper-seed", 1+Math.floor(Math.random() * 99999));
        const achievementDefsSorted = [];
        for(let def of achievementDefs) {
            if (def.achieved) achievementDefsSorted.push(def);
        }
        for(let def of achievementDefs) {
            if (!def.achieved) achievementDefsSorted.push(def);
        }
        for(let def of achievementDefsSorted) {
            const item = document.createElement("tr");
            const tdIcon = document.createElement("td");
            const icon = document.createElement("div");
            const tdText = document.createElement("td");
            const title = document.createElement("div");
            const desc = document.createElement("div");
            item.classList.add("profile-achievement-item");
            icon.classList.add("profile-achievement-icon", "wrinkledPaper", "wrinkled-paper-mask");
            tdText.classList.add("profile-achievement-text");
            title.classList.add("profile-achievement-title");
            desc.classList.add("profile-achievement-desc");
            icon.style.setProperty("--wrinkled-paper-seed", 1+Math.floor(Math.random() * 99999));
            icon.style.setProperty("background-image", "url("+def.image+")");
            item.style.setProperty("--wrinkled-paper-seed", 1+Math.floor(Math.random() * 99999));
            title.textContent = def.achieved ? "✅ "+def.title : def.title;
            if (!def.achieved) item.classList.add("profile-achievement-locked");
            desc.textContent = def.desc;
            tdIcon.append(icon);
            tdText.append(title, desc);
            item.append(tdIcon, tdText);
            tbody.append(item);
            mainContainer.append(tbody);
        }
        root.append(mainContainer);
    }
    function showAchievementUnlockSplash(id) {
        const def = achievementDefs.find(def => def.id == id) || errorDef;
        const main = document.createElement("div");
        const icon = document.createElement("div");
        const text = document.createElement("div");
        const header = document.createElement("div");
        const body = document.createElement("div");
        header.textContent = "Achievement complete";
        body.textContent = def.title;
        main.classList.add("achievement-splash", "wrinkledPaper");
        icon.classList.add("achievement-splash-icon", "wrinkledPaper", "wrinkled-paper-mask");
        text.classList.add("achievement-splash-text");
        header.classList.add("achievement-splash-header");
        icon.style.setProperty("background-image", "url("+def.image+")");
        main.style.setProperty("--wrinkled-paper-seed", 1+Math.floor(Math.random() * 99999));
        text.append(header, body);
        main.append(icon, text);
        document.getElementById("gameWrapper").append(main);
        setTimeout(() => main.remove(), 10000);
        main.addEventListener("click", () => {
            const mmcp = document.getElementsByClassName("main-menu-corner-profile")[0];
            if (mmcp) mmcp.click();
        });
    }
    const css = new CSSStyleSheet;
    css.replaceSync(`
.profile-stats {
    margin-bottom: 10px;
}
.profile-achievements {
    display: flex;
    flex-direction: column;
    width: 400px;
    background: var(--items-table-bg-color) !important;
    max-height: 350px;
    overflow-y: auto;
}
.profile-achievement-item {
    width: 100%;
    gap: 10px;
    padding: 10px;
}
.profile-achievement-locked {
    opacity: 0.5;
}
.profile-achievement-icon {
    width: 64px;
    height: 64px;
    --wrinkled-paper-wrinkle-size: 3px;
    --wrinkled-paper-tear-count-min: 0.003;
    --wrinkled-paper-tear-count-max: 0.004;
    background-size: contain;
}
.profile-achievement-text {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 5px;
}
.profile-achievement-title {
    font-size: 24px;
    font-weight: bold;
}
.profile-achievement-desc {
    flex: 1;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
.achievement-splash {
    width: 400px;
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 50;
    padding: 10px;
    gap: 10px;
    animation-name: achievement-splash-popup;
    animation-duration: 10s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
}
.achievement-splash-text {
    display: flex:
    flex-direction: column;
    flex: 1;
}
.achievement-splash-icon {
    width: 64px;
    height: 64px;
    --wrinkled-paper-wrinkle-size: 3px;
    --wrinkled-paper-tear-count-min: 0.003;
    --wrinkled-paper-tear-count-max: 0.004;
    background-size: contain;
}
.achievement-splash-header {
    font-size: 24px;
    color: #aa11ff;
    font-weight: bold;
}
@keyframes achievement-splash-popup {
  0% {
    transform: translateY(100%);
  }
  5% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}
`);
    function init() {
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, css];
        load();
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
