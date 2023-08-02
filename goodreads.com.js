// ==UserScript==
// @name         Good Reads <> BookOutlet Linker
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  try to take over the world!
// @author       strategineer
// @match        https://www.goodreads.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=goodreads.com
// @grant        none
// @run-at document-start
// @downloadURL  https://raw.githubusercontent.com/strategineer/orangutan/main/goodreads.com.js
// ==/UserScript==

(function () {
    'use strict';
    function formatBookOutletSearchUrlFromAuthorAndTitle(author, title) {
        return `https://bookoutlet.ca/browse?q=${author.replace(" ", "+") + '+' + title.replace(" ", "+")}`;
    }
    function wrap(wrapper, wrappee) {
        wrappee.parentNode.insertBefore(wrapper, wrappee);
        wrapper.appendChild(wrappee);
    }

    window.onload = function () {
        // Auto navigate to the book's page from a single search result.
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

        // put links to book outlet
        try {
            const author = document.getElementsByClassName("ContributorLink__name")[0];
            author.parentElement.href = formatBookOutletSearchUrlFromAuthorAndTitle(author.innerText, "");
            author.parentElement.target = "_blank";
            const title = document.getElementsByClassName("Text Text__title1")[0];
            console.log(`author: ${author.innerText}, title: ${title.innerText}`);
            const url = formatBookOutletSearchUrlFromAuthorAndTitle(author.innerText, title.innerText);
            console.log(url);
            const book_cover = document.getElementsByClassName("BookPage__bookCover")[0];
            const link_to_book_outlet = document.createElement('a');

            link_to_book_outlet.href = url;
            link_to_book_outlet.target = "_blank";

            wrap(link_to_book_outlet, book_cover);
            wrap(link_to_book_outlet.cloneNode(), title);
        }
        catch {
            // ignore errors
        }
    }
})();