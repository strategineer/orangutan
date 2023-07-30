// ==UserScript==
// @name         Auto Navigate to single search result
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  try to take over the world!
// @author       strategineer
// @match        https://www.goodreads.com/search?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=goodreads.com
// @grant        none
// @run-at document-start
// @downloadURL  https://raw.githubusercontent.com/strategineer/orangutan/main/goodreads.com.js
// ==/UserScript==

(function () {
    'use strict';
    window.onload = function () {
        const check = document.getElementsByClassName("searchSubNavContainer")[0];
        // desktop
        if (check && check.innerText.includes("Page 1 of about 1 results")) {
            const a = document.getElementsByClassName("bookCover")[0].parentElement;
            const url = a.href;
            window.open(url, "_self");
        }
        // mobile
        const mobile = document.getElementsByClassName("totalResults")[0];
        if (mobile && mobile.innerText.includes("One")) {
            const a = document.getElementsByClassName("bookCover")[0];
            const url = a.href;
            window.open(url, "_self");
        }
    }
})();