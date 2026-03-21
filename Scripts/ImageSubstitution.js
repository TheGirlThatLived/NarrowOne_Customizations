// ==UserScript==
// @name         Image substitution
// @namespace    http://tampermonkey.net/
// @version      20241217_1644
// @description  Hot-swap image assets on any website (general purpose)
// @author       Xeltalliv
// @match        https://narrow.one/*
// @icon         https://www.svgrepo.com/show/375090/replace.svg
// @downloadURL  https://github.com/TheGirlThatLived/NarrowOne_Customizations/raw/refs/heads/main/Scripts/ImageSubstitution
// @updateURL    https://github.com/TheGirlThatLived/NarrowOne_Customizations/raw/refs/heads/main/Scripts/ImageSubstitution
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const replacementTable = {
        /* List of all replaceable vector art
        "static/favicon.svg": "", //Icon of the tab in webbrowser
        "static/arrow.svg": "",
        "static/coin.svg": "",
        "static/downArrowSmall.svg": "",
        "static/img/logo.svg": "",
        "static/img/rewardedAdIcon.svg": "",

        "static/img/menuUI/check.svg": "",
        "static/img/menuUI/copy.svg": "",
        "static/img/menuUI/crown.svg": "",
        "static/img/menuUI/download.svg": "",
        "static/img/menuUI/exit.svg": "",
        "static/img/menuUI/exitFullScreen.svg": "",
        "static/img/menuUI/fullScreen.svg": "",
        "static/img/menuUI/hamburger.svg": "",
        "static/img/menuUI/login.svg": "",
        "static/img/menuUI/maps.svg": "",
        "static/img/menuUI/settings.svg": "",
        "static/img/menuUI/shopChest.svg": "",
        "static/img/menuUI/squad.svg": "",
        "static/img/menuUI/verified.svg": "", //Icon displayed next to distinguished players nicknames

        "static/img/profileStats/deaths.svg": "",
        "static/img/profileStats/flagsCaptured.svg": "",
        "static/img/profileStats/gamesPlayed.svg": "",
        "static/img/profileStats/gamesWon.svg": "",
        "static/img/profileStats/kills.svg": "",
        "static/img/profileStats/totalPoints.svg": "",

        "static/img/loginUI/apple.svg": "",
        "static/img/loginUI/discord.svg": "",
        "static/img/loginUI/facebook.svg": "",
        "static/img/loginUI/google.svg": "",
        "static/img/loginUI/itch.svg": "",

        "static/img/hudIcons/flags/blue.svg": "", //Flag position indicator (Blue)
        "static/img/hudIcons/flags/red.svg": "", //Flag position indicator (Red)
        "static/img/hudIcons/playerIcon.svg": "" //Teammate indicator

        "static/img/notificationIcons/crosshair/kill.svg": "",
        "static/img/notificationIcons/crosshair/killed.svg": "",
        "static/img/notificationIcons/flag/blue/capture.svg": "",
        "static/img/notificationIcons/flag/blue/drop.svg": "",
        "static/img/notificationIcons/flag/blue/grab.svg": "",
        "static/img/notificationIcons/flag/blue/return.svg": "",
        "static/img/notificationIcons/flag/red/capture.svg": "",
        "static/img/notificationIcons/flag/red/drop.svg": "",
        "static/img/notificationIcons/flag/red/grab.svg": "",
        "static/img/notificationIcons/flag/red/return.svg": "",
        "static/img/notificationIcons/gameOver/defeated.svg": "",
        "static/img/notificationIcons/gameOver/victory.svg": "",

        "static/img/menuUI/shop/female.svg": "",
        "static/img/menuUI/shop/male.svg": "",
        "static/img/menuUI/shop/lock.svg": "",
        "static/img/menuUI/shop/categoryIcons/arms.svg": "",
        "static/img/menuUI/shop/categoryIcons/arrow.svg": "",
        "static/img/menuUI/shop/categoryIcons/bow.svg": "",
        "static/img/menuUI/shop/categoryIcons/bowHandle.svg": "",
        "static/img/menuUI/shop/categoryIcons/bowTip.svg": "",
        "static/img/menuUI/shop/categoryIcons/eyebrows.svg": "",
        "static/img/menuUI/shop/categoryIcons/eyes.svg": "",
        "static/img/menuUI/shop/categoryIcons/face.svg": "",
        "static/img/menuUI/shop/categoryIcons/hair.svg": "",
        "static/img/menuUI/shop/categoryIcons/head.svg": "",
        "static/img/menuUI/shop/categoryIcons/legs.svg": "",
        "static/img/menuUI/shop/categoryIcons/melee.svg": "",
        "static/img/menuUI/shop/categoryIcons/misc.svg": "",
        "static/img/menuUI/shop/categoryIcons/quiver.svg": "",
        "static/img/menuUI/shop/categoryIcons/skinTone.svg": "",
        "static/img/menuUI/shop/categoryIcons/tattoo.svg": "",
        "static/img/menuUI/shop/categoryIcons/torso.svg": "",
        "static/img/menuUI/shop/classIcons/armorStrength.svg": "",
        "static/img/menuUI/shop/classIcons/arrowEnemyStun.svg": "",
        "static/img/menuUI/shop/classIcons/arrowFlySpeed.svg": "",
        "static/img/menuUI/shop/classIcons/arrowLoadingSpeed.svg": "",
        "static/img/menuUI/shop/classIcons/bloodlust.svg": "",
        "static/img/menuUI/shop/classIcons/bowAttackStrength.svg": "",
        "static/img/menuUI/shop/classIcons/healthRegenSpeed.svg": "",
        "static/img/menuUI/shop/classIcons/meleeAttackReach.svg": "",
        "static/img/menuUI/shop/classIcons/meleeAttackSpeed.svg": "",
        "static/img/menuUI/shop/classIcons/meleeAttackStrength.svg": "",
        "static/img/menuUI/shop/classIcons/movementSpeed.svg": "",
        "static/img/menuUI/shop/classIcons/shootingFocus.svg": "",
        */
        "static/img/hudIcons/flags/red.svg": "https://thegirlthatlived.github.io/NarrowOne_Customizations/Assets/flagRed.svg", //Flag position indicator (Red)
        "static/img/hudIcons/flags/blue.svg": "https://thegirlthatlived.github.io/NarrowOne_Customizations/Assets/flagBlue.svg", //Flag position indicator (Blue)
        "static/img/hudIcons/playerIcon.svg": "https://thegirlthatlived.github.io/NarrowOne_Customizations/Assets/playerIcon.svg" //Teammate indicator
        "static/img/notificationIcons/crosshair/killed.svg": "https://thegirlthatlived.github.io/NarrowOne_Customizations/Assets/killed.svg",
        "static/img/notificationIcons/gameOver/defeated.svg": "https://thegirlthatlived.github.io/NarrowOne_Customizations/Assets/defeated.svg",
    }
    const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
    Object.defineProperty(HTMLImageElement.prototype, "src", {
        set(value) {
            //console.log(value); // uncomment to determine what the values should be
            if (replacementTable[value]) this.crossOrigin = "anonymous";
            originalSrcDescriptor.set.call(this, replacementTable[value] ?? value);
        },
        get() {
            return originalSrcDescriptor.get.call(this);
        }
    });
})();
