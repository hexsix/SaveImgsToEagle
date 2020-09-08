// ==UserScript==
// @name         Save Yande.re Images to Eagle
// @icon         https://yande.re/favicon.ico

// @version      0.1
// @author       hexsix

// @match       https://yande.re/post/show/*
// @connect     files.yande.re
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
    const EAGLE_SERVER_URL = "http://localhost:41595";
    const EAGLE_IMPORT_API_URL = `${EAGLE_SERVER_URL}/api/item/addFromURL`;
    const FOLDER_ID = "KES6SFFK8WHVD";

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

        // URL
        var url = document.URL;
        // console.log(url);

        // images
        var img = $('img[src^="https://files.yande.re/image/"]')[0];
        var img_url = img.getAttribute('src');
        var img_filename = decodeURI(img_url).split('/').pop();
        // console.log(img);
        // console.log(img_url);
        // console.log(img_filename);

        // tags
        var tag_doms = $('a[href^="/post?tags="]');
        // console.log(tag_doms);
        var tags = new Array();
        for (i = 2; i < tag_doms.length - 2; i++) {
            var tag_text = tag_doms[i].innerText;
            tags.push(tag_text);
        }
        // console.log(tags);

        // Source: source may be none
        try {
            var source = $('a[rel^="nofollow noopener noreferrer"]')[0].href;
            console.log(source);
        } catch (e) {
            source = ''
        }

        // save to eagle
        var data = {
            "url": img_url,
            "name": img_filename,
            "website": url,
            "tags": tags,
            "annotation": 'Source: ' + source,
            "folderId": FOLDER_ID
        };
        // console.log(data);
        addImageToEagle(data);
    }

    main();
})();