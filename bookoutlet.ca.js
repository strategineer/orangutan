// ==UserScript==
// @name         BookOutlet Link to GoodReads when browsing
// @namespace    http://tampermonkey.net/
// @version      0.4.0
// @description  try to take over the world!
// @author       strategineer
// @match        https://bookoutlet.ca/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bookoutlet.ca
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/strategineer/orangutan/main/bookoutlet.ca.js
// ==/UserScript==
(function () {
    'use strict';
    function resolveAfterDelay(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, ms);
        });
    }

    function parseIsbnFromProductUrl(url) {
        //https://bookoutlet.ca/products/9781473233782B/children-of-dune-dune-bk-3
        const re = /bookoutlet.ca\/products\/(\d+)/g;
        const match = re.exec(url);
        return match[1];
    }

    function formatGoodReadsSearchUrlFromIsbn(isbn) {
        return `https://www.goodreads.com/search?utf8=%E2%9C%93&q=${isbn}&search_type=books&search%5Bfield%5D=on`;
    }

    function isProductUrl(url) {
        return url.includes("bookoutlet.ca/product");
    }

    function isCurrentlyOnProductPage() {
        return isProductUrl(window.location.href);
    }
    function goToGoodReads() {
        const isbn = parseIsbnFromProductUrl(window.location.href);
        const url = formatGoodReadsSearchUrlFromIsbn(isbn);
        window.open(url, "_self");
    }

    async function code(ms) {
        const result = await resolveAfterDelay(ms);
        const anchors = document.getElementsByTagName('a');
        for (var i = 0; i < anchors.length; i++) {
            try {
                const anchor = anchors[i];
                if (isProductUrl(anchor.href)) {
                    const isbn = parseIsbnFromProductUrl(anchor.href);
                    const url = formatGoodReadsSearchUrlFromIsbn(isbn);
                    anchor.href = url;
                    anchor.target = "_blank";
                }
            }
            catch (e) {
                // ignore errors
            }
        }
        if (ms != 0) {
            code(ms);
        }
    }
    window.onload = function () {
        if (isCurrentlyOnProductPage()) {
            goToGoodReads();
            return
        }
        code(0);
        code(3000);
    }
})();