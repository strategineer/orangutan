// ==UserScript==
// @name         BookOutlet Link to GoodReads when browsing
// @namespace    http://tampermonkey.net/
// @version      0.3.4
// @description  try to take over the world!
// @author       strategineer
// @match        https://bookoutlet.ca/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bookoutlet.ca
// @grant        window.onurlchange
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

    function parseIsbnFromSrc(text) {
        const left = text.indexOf("/");
        const right = text.indexOf(".jpg");
        let isbn = text.substring(left, right - 2);
        const rightmost_slash = isbn.lastIndexOf("/");
        isbn = isbn.substring(rightmost_slash + 1);
        return isbn;
    }

    function parseIsbnFromProductUrl(url) {
        //https://bookoutlet.ca/products/9781473233782B/children-of-dune-dune-bk-3
        const products = url.indexOf("products")
        const left = url.indexOf("/", products);
        const right = url.indexOf("/", left + 1);
        return url.substring(left + 1, right - 1);
    }

    function formatGoodReadsSearchUrlFromIsbn(isbn) {
        return `https://www.goodreads.com/search?utf8=%E2%9C%93&q=${isbn}&search_type=books&search%5Bfield%5D=on`;
    }
    function setLink(isbn, target) {
        const url = formatGoodReadsSearchUrlFromIsbn(isbn);
        target.href = url;
        target.target = "_blank";
    }

    function isProductPage() {
        return window.location.href.includes("bookoutlet.ca/product");
    }

    async function code(ms) {
        const result = await resolveAfterDelay(ms);
        const images = document.getElementsByTagName('img');
        for (var i = 0; i < images.length; i++) {
            try {
                const img = images[i];
                let text = "";
                try {
                    // On initial page load the ISBN can be found in a noscript block next to the img block (the src field is just data for some reason)
                    text = img.parentElement.childNodes[1].innerText;
                }
                catch {
                    // When navigating to another page of books, the ISBN is found in the src field of the image...
                    text = img.src;
                }
                const isbn = parseIsbnFromSrc(text);
                if (isbn) {
                    const link = img.parentElement.parentElement.parentElement.parentElement.parentElement;
                    const url = formatGoodReadsSearchUrlFromIsbn(isbn);
                    link.href = url;
                    link.target = "_blank";
                }
            }
            catch (e) {
                // ignore errors
            }
        }
    }
    window.onload = function () {
        if (isProductPage()) {
            const isbn = parseIsbnFromProductUrl(window.location.href);
            const url = formatGoodReadsSearchUrlFromIsbn(isbn);
            window.open(url, "_self");
            return
        }
        code(0);
    }
    if (window.onurlchange === null) {
        window.addEventListener('urlchange', (info) => {
            if (isProductPage()) {
                return;
            }
            code(500);
        });
    }
})();