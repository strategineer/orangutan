// ==UserScript==
// @name         Bookoutlet GoodReads Link Adder
// @namespace    http://tampermonkey.net/
// @version      0.2
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
        const titles = document.getElementsByClassName('MuiGrid-root MuiGrid-item');
        //console.log('books:' + titles.length);
        for (var i = 0; i < titles.length; i++) {
            const t = titles[i].firstChild;

            if (t == null || t.firstChild == null || t.firstChild.nodeValue == null || t.parentElement === null || t.parentElement.childNodes[1] == null || t.parentElement.childNodes[1].childNodes[1] == null) {
                continue;
            }
            const t_str = t.firstChild.nodeValue.split("(")[0];
            const author_str = t.parentElement.childNodes[1].childNodes[1].innerText.split(",")[0];
            const img = t.parentElement.parentElement.firstChild.firstChild.firstChild.firstChild;
            const mess = img.parentElement.childNodes[1].innerText;
            const left = mess.indexOf("/");
            const right = mess.indexOf(".jpg");
            let isbn = mess.substring(left, right - 2);
            const rightmost_slash = isbn.lastIndexOf("/");
            isbn = isbn.substring(rightmost_slash + 1);
            //console.log(isbn);
            const url = `https://www.goodreads.com/search?utf8=%E2%9C%93&q=${isbn}&search_type=books&search%5Bfield%5D=on`;
            t.parentElement.parentElement.parentElement.href = url;
            t.parentElement.parentElement.parentElement.target = "_blank";
            //9781538728604-l.jpg
            //console.log(`book title: ${t_str}, author last name: ${author_str}`);
        }
    }
})();