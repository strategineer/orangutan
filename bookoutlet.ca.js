// ==UserScript==
// @name         BookOutlet Link to GoodReads when browsing
// @namespace    http://tampermonkey.net/
// @version      0.3.1
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

    async function code(ms) {
        //console.log('calling');
        const result = await resolveAfterDelay(ms);
        //console.log("Adding links...");
        //await new Promise(r => setTimeout(r, 2000));
        const images = document.getElementsByTagName('img');
        //console.log('images:' + images.length);
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
                const left = text.indexOf("/");
                const right = text.indexOf(".jpg");
                let isbn = text.substring(left, right - 2);
                const rightmost_slash = isbn.lastIndexOf("/");
                isbn = isbn.substring(rightmost_slash + 1);
                if (isbn) {
                    const url = `https://www.goodreads.com/search?utf8=%E2%9C%93&q=${isbn}&search_type=books&search%5Bfield%5D=on`;
                    const link = img.parentElement.parentElement.parentElement.parentElement.parentElement;
                    link.href = url;
                    link.target = "_blank";
                    //console.log(isbn);
                    //console.log(img);
                    //console.log(img.src);
                    //console.log(link);
                }
                //console.log(t_str);
                //console.log(link);
            }
            catch (e) {
                // ignore errors
                //console.log("ERROR:");
                //console.log( images[i] );
                //console.log( images[i].parentElement.parentElement.parentElement.parentElement.parentElement );
                //console.log(e);
            }
        }
        //console.log("Added links!");
        // Expected output: "resolved"
    }
    window.onload = function () {
        //console.log("onload");
        code(0);
    }
    if (window.onurlchange === null) {
        window.addEventListener('urlchange', (info) => {
            //console.log('urlchange');
            code(1000);
        });
    }
})();