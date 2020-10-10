// ==UserScript==
// @name        Save Twitter Images to Eagle
// @icon        https://abs.twimg.com/favicons/twitter.ico

// @version     0.1
// @author      hexsix

// @match       https://twitter.com/*

// @connect     pbs.twimg.com
// @connect     cdn.twitter.com
// @connect     ton.twitter.com
// @connect     *.twimg.com
// @connect     analytics.twitter.com
// @connect     localhost

// @license     MIT License

// @grant       GM_xmlhttpRequest
// @grant       GM_download

// @require     https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js
// @require     https://cdn.bootcss.com/jszip/3.1.4/jszip.min.js
// @require     https://cdn.bootcss.com/FileSaver.js/1.3.2/FileSaver.min.js
// @require     https://greasyfork.org/scripts/2963-gif-js/code/gifjs.js?version=8596
// @require     https://greasyfork.org/scripts/375359-gm4-polyfill-1-0-1/code/gm4-polyfill-101.js?version=652238

// @run-at      context-menu
// ==/UserScript==

(function () {
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    const EAGLE_SERVER_URL = "http://localhost:41595";
    const EAGLE_IMPORT_API_URL = `${EAGLE_SERVER_URL}/api/item/addFromURL`;
    const FOLDER_ID = "KEQX4NVIKSNEZ";

    function addImageToEagle(data) {
        GM_xmlhttpRequest({
            url: EAGLE_IMPORT_API_URL,
            method: "POST",
            data: JSON.stringify(data),
            redirect: 'follow',
            onload: function (response) {}
        });
    }

    function main() {
        var i = 0;
        // url
        var url = document.URL;
        // console.log(url);

        // last modified time
        var lastModified = document.lastModified;
        // console.log(lastModified);

        // author id
        var userid = document.URL.split('/')[3];
        // console.log(userid);

        // content
        var content = $('article [lang]')[0].innerText;

        // img
        for (i = 0; i < 4; i++) {
            try {
                var img = document.images[i];
                var img_ext = document.images[i].src.split('?')[1].split('&')[0].split('=')[1];
                var img_filename = lastModified.split(' ')[0].split('/').join('-') + '@' + userid + '.' + img_ext + '_' + String(i); // img filename format => "Mm-Dd-Yyyy@{userid}_{i}.{ext}"
                var data = {
                    "url": img.getAttribute('src'),
                    "name": img_filename,
                    "website": url,
                    "tags": [userid],
                    "annotation": content,
                    "folderId": FOLDER_ID
                };
                // console.log(data);
                addImageToEagle(data);
            } catch (e) {
                break;
            }
        }
    }

    main();
})();