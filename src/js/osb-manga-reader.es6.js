'use strict';

(function() {
    let template = `
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto:400,300');
            @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
            @import '/src/css/osbMangaReader.css';
        </style>
        <main class="osb-manga-reader-holder">
        </main>`;
    class osbMangaReader extends HTMLElement {
        createdCallback() {
            this.createShadowRoot().innerHTML = template;
            this.$holder = this.shadowRoot.querySelector('.osb-manga-reader-holder');
        };

        attachedCallback() {
        };

        attributeChangedCallback(attrName, oldVal, newVal) {
        };

    }
    // Register Element
    document.registerElement('osb-manga-reader', osbMangaReader);
})();