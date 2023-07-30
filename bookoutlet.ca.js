// ==UserScript==
// @name         Bookoutlet GoodReads Link Adder
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  try to take over the world!
// @author       strategineer
// @match        https://bookoutlet.ca/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bookoutlet.ca
// @grant        none
// @run-at document-start
// @downloadURL  https://raw.githubusercontent.com/strategineer/orangutan/main/bookoutlet.ca.js
// ==/UserScript==
// todo: search by isbn
// todo: write anothe script that auto navigates to the single search result on good reads
(function () {
    'use strict';
    window.onload = function () {
        // https://bookoutlet.ca/browse/products/fiction?size=96 page
        const titles = document.getElementsByClassName('MuiGrid-root MuiGrid-item MuiGrid-grid-xs-true');
        //console.log('books:' + titles.length);
        for (var i = 0; i < titles.length; i++) {
            const t = titles[i].firstChild;

            if (t == null || t.firstChild == null || t.firstChild.nodeValue == null) {
                continue;
            }
            const t_str = t.firstChild.nodeValue.split("(")[0];
            const author_str = t.parentElement.childNodes[1].childNodes[1].innerText.split(",")[0];
            const url = `https://www.goodreads.com/search?utf8=%E2%9C%93&q=${author_str + ' ' + t_str}&search_type=books&search%5Bfield%5D=on`;
            t.parentElement.parentElement.parentElement.href = url;
            t.parentElement.parentElement.parentElement.target = "_blank";
            const img = t.parentElement.parentElement.firstChild.firstChild.firstChild.firstChild;
            console.log(`book title: ${t_str}, author last name: ${author_str}`);
            console.log(img.src);
        }
    }
})();