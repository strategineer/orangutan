// ==UserScript==
// @name         Goodreads <> BookOutlet Linker
// @namespace    http://tampermonkey.net/
// @version      0.2.4
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
    function formatBookOutletSearchUrl(term) {
        return `https://bookoutlet.ca/browse?q=${term.replace(/ /g, "+")}`;
    }
    function wrap(wrapper, wrappee) {
        wrappee.parentNode.insertBefore(wrapper, wrappee);
        wrapper.appendChild(wrappee);
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    window.onload = function () {
        // randomly pick a book from the shelf
        const bookTitles = document.getElementsByClassName("field title");
        if (bookTitles) {
            try {
                const index = getRandomInt(bookTitles.length)
                const randomBook = bookTitles[index];
                const title = randomBook.children[1].children[0].title;
                console.log(`From ${bookTitles.length} books, chose ${title}`);
            } catch (e) {
            }
        }
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
            const authors = document.getElementsByClassName("ContributorLink__name");
            for (var i = 0; i < authors.length; i++) {
                authors[i].parentElement.href = formatBookOutletSearchUrl(authors[i].innerText);
                authors[i].parentElement.target = "_blank";
            }
            const title = document.getElementsByClassName("Text Text__title1")[0];
            //console.log(`author: ${authors[0].innerText}, title: ${title.innerText}`);
            const url = formatBookOutletSearchUrl(title.innerText);
            //console.log(url);
            const book_cover = document.getElementsByClassName("BookPage__bookCover")[0];
            const link_to_book_outlet = document.createElement('a');
            link_to_book_outlet.href = url;
            link_to_book_outlet.target = "_blank";

            wrap(link_to_book_outlet, book_cover);
            wrap(link_to_book_outlet.cloneNode(), title);
        }
        catch (e) {
            // ignore errors
            //console.log(e);
        }
    }
})();