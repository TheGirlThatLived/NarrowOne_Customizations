// ==UserScript==
// @name         N1 Backup IndexedDB
// @namespace    https://narrow.one/
// @version      2025-06-08
// @description  Backup and restore your skins, settings and guest account. Transfer them from and to Poki version.
// @author       Xeltalliv
// @match        https://narrow.one/*
// @match        https://e2c6282e-13db-47a4-99c8-3297118978c1.poki-gdn.com/*
// @icon         https://www.svgrepo.com/show/395640/save.svg
// @grant        none
// ==/UserScript==

// Disclaimer: the mod does not touch the game's code.
// New buttons are grafted through MutationObserver.
// IndexedDB is accessed directly, not though the game's code.

(function() {
    const keys = ["skinPresets", "classSkins", "settings", "guestAccountData"];
    const isSettings = (elem) => elem && elem.classList.contains("dialog") && elem.children[0].textContent == "Settings";

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

    function backup() {
        const req = indexedDB.open("keyValuesDb");
        req.onsuccess = function() {
            const db = req.result;
            const transaction = db.transaction("keyValues", "readonly");
            const store = transaction.objectStore("keyValues");
            const data = {};
            let done = 0;
            for(const key of keys) {
                let read = store.get(key);
                read.onsuccess = function() {
                    data[key] = read.result ?? null;
                    done++;
                    if (done == keys.length) {
                        const d = new Date();
                        const p = s => (""+s).padStart(2, "0");
                        const timeString = `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}-${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
                        download(`narrow-one-backup-${timeString}.json`, JSON.stringify(data));
                    }
                };
                read.onerror = function(error) {
                    alert("Error:" + error);
                };
            };
        };
        req.onerror = function(error) {
            alert("Error:" + error);
        };
    }

    function restore() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/JSON";
        input.onchange = function() {
            const file = input.files[0];
            if (!file) return;
            input.value = "";
            const reader = new FileReader();
            reader.onload = function() {
                const content = reader.result;
                let data = null;
                try {
                    data = JSON.parse(reader.result);
                } catch(e) {
                    alert("Failed to parse json");
                    return;
                }
                for (const key of keys) {
                    if (!(key in data)) {
                        alert(key+" was not found. Did you pick correct json?");
                        return;
                    }
                }
                const req = indexedDB.open("keyValuesDb");
                req.onsuccess = function() {
                    const db = req.result;
                    const transaction = db.transaction("keyValues", "readwrite");
                    const store = transaction.objectStore("keyValues");
                    let done = 0;
                    for(const key of keys) {
                        let read = store.put(data[key], key);
                        read.onsuccess = function() {
                            data[key] = read.result;
                            done++;
                            if (done == keys.length) {
                                alert("Data successfully restored! The page will now be reloaded to apply changes");
                                window.location.reload();
                            }
                        };
                        read.onerror = function(error) {
                            alert("Error:" + error);
                        };
                    };
                };
                req.onerror = function(error) {
                    alert("Error:" + error);
                };
            }
            reader.readAsText(file, "utf-8");
        };
        input.click();
    }

    function download(filename, data) {
        const blob = new Blob([data], {type: "text/plain"});
        const a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const gameWrapperObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
                const addedNode = mutation.addedNodes[0];
                //const removeNode = mutation.removedNodes[0];
                //console.log('Added', mutation.addedNodes, "Removed", mutation.removedNodes);
                if (isSettings(addedNode)) {
                    const section = document.createElement("div");
                    const header = document.createElement("h3");
                    header.classList.add("settings-group-header");
                    header.textContent = "Local data";
                    const buttons = document.createElement("div");
                    buttons.classList.add("account-buttons");
                    buttons.append(accountButton("Backup local data", backup));
                    buttons.append(accountButton("Restore local data", restore));
                    section.append(header, buttons);
                    const list = addedNode.getElementsByClassName("settings-list")[0];
                    list.insertBefore(section, list.lastChild);
                }
            }
        }
    });

    function init() {
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