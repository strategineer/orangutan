// ==UserScript==
// @name         Indigo <> Goodreads Linker
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  try to take over the world!
// @author       strategineer
// @match        https://www.indigo.ca/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=indigo.ca
// @grant        none
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
        //https://www.indigo.ca/en-ca/the-secret-keeper/9781982196981.html
        const re = /\/(\d+).html/g;
        const match = re.exec(url);
        return match[1];
    }

    function formatGoodReadsSearchUrlFromIsbn(isbn) {
        return `https://www.goodreads.com/search?utf8=%E2%9C%93&q=${isbn}&search_type=books&search%5Bfield%5D=on`;
    }

    async function code(ms) {
        const result = await resolveAfterDelay(ms);
        const anchors = document.getElementsByTagName('a');
        for (var i = 0; i < anchors.length; i++) {
            try {
                const anchor = anchors[i];
                console.log(anchor.href);
                const isbn = parseIsbnFromProductUrl(anchor.href);
                const url = formatGoodReadsSearchUrlFromIsbn(isbn);
                anchor.href = url;
                anchor.target = "_blank";
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
        code(0);
        code(1000);
    }
})();