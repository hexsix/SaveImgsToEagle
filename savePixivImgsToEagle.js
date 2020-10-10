// ==UserScript==
// @name         Save Pixiv Images to Eagle
// @icon         https://www.pixiv.net/favicon.ico

// @version      0.1
// @author       hexsix

// @match       https://www.pixiv.net/artworks/*
// @connect     i.pximg.net
// @connect     i-f.pximg.net
// @connect     i-cf.pximg.net
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
    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    const EAGLE_SERVER_URL = "http://localhost:41595";
    const EAGLE_IMPORT_API_URL = `${EAGLE_SERVER_URL}/api/item/addFromURL`;
    const FOLDER_ID = "KEO8U45NNUHAO";

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

        // images
        var img = $('img[src^="https://i.pximg.net/img-original/img/"]')[0];
        var img_url = img.getAttribute('src');
        var img_filename = img_url.split('/').pop();

        // tags
        var tag_doms = $('a[href^="/tags/"]');
        var tags = new Array();
        for (i = 0; i < tag_doms.length; i++) {
            var tag_text = tag_doms[i].innerText;
            if (tag_text.search('users') === -1 && tag_text.search('收藏') === -1 && tag_text.search('bookmarks') === -1 && tag_text !== '*') {
                tags.push(tag_text);
            }
        }
        // tags.push('pickup');
        var uniqueTags = Array.from(new Set(tags));

        // author
        var user_doms = $('a[href^="/users/"]');
        var author = user_doms[1].innerText; // the first user is you.

        // title: title may be none
        try {
            var title = $('h1')[0].innerText;
        } catch (e) {
            title = '无题'
        }

        // content: content may be none
        try {
            var content = $('.gxepem')[0].innerText;
        } catch (e) {
            content = ''
        }

        // save to eagle
        sleep(500).then(() => {
            var data = {
                "url": img_url,
                "name": img_filename,
                "website": url,
                "tags": uniqueTags,
                "annotation": title + '\n' + content,
                "folderId": FOLDER_ID,
                "headers": {
                    "referer": url
                }
            };
            addImageToEagle(data);
        });
    }

    main();
})();