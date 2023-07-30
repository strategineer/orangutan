// ==UserScript==
// @name         Auto Navigate to single search result
// @namespace    http://tampermonkey.net/
// @version      0.1
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
    const check = document.getElementsByClassName("searchSubNavContainer")[0];
    if (check.innerText.includes("Page 1 of about 1 results")) {
        const a = document.getElementsByClassName("bookCover")[0].parentElement;
        const url = a.href;
        window.open(url, "_self");
    }
})();