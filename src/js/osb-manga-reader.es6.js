'use strict';

(function() {
    let template = `
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto:400,300');
            @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
            @import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
            @import '/src/css/osbMangaReader.css';
        </style>
        <main class="osb-manga-reader-holder container">
            <header>

            </header>
            <section class="siteFavourites mangaList">
                <ul class="list-unstyled"></ul>
            </section>
        </main>`;
    class osbMangaReader extends HTMLElement {
        createdCallback() {
            this.createShadowRoot().innerHTML = template;
            this.baseUrl = 'https://doodle-manga-scraper.p.mashape.com/';
            this.defaultSite = 'mangareader.net';
            this.apiKey = 'xiQSdA9ACbmshUxnm4ZBC8nn2umSp1LeqQfjsnnVeMWHHSIQy0';
            this.favouritesUrl = 'http://private-e00abd-osbmangareader.apiary-mock.com/topfeed';
            this.$holder = this.shadowRoot.querySelector('.osb-manga-reader-holder');
            this.$siteFavourites = this.shadowRoot.querySelector('.siteFavourites');

            this.getSiteFavourites();
        };

        attachedCallback() {
        };

        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName === 'site-favourites') {
                this.getSiteFavouriteTitles(JSON.parse(newVal));
            }
        };

        renderFeedTemplate(data) {
            console.log(data);
            this.$siteFavourites.querySelector('.list-unstyled').innerHTML +=
                '<li class="row mangaTitle">' +
                    '<article class="container-fluid">' +
                        '<div class="col-md-2 col-sm-4 col-xs-12 mainImage"><img src="' + data.cover + '" class="img-responsive" /></div>' +
                        '<div class="col-md-10 col-sm-8 col-xs-12">' +
                            '<h2>' + data.name + '</h2>' +
                            '<p>' + data.info + '</p>' +
                            '<button class="btn btn-primary">View Manga Info <i class="fa fa-info-circle"></i></button>' +
                            '<button class="btn btn-primary">Add to favourites <i class="fa fa-heart-o"></i></button>' +
                            '<button class="btn btn-primary">Start Reading <i class="fa fa-book"></i></button>' +
                        '</div>' +
                    '</article>' +
                '</li>';
        };

        getSiteFavouriteTitles(favourites) {
            var holder = this;
            favourites.forEach(function(element, index, array) {
                fetch(holder.baseUrl + holder.defaultSite + '/manga/' + element.id, {
                    method: 'GET',
                    headers: new Headers({
                        'X-Mashape-Authorization': holder.apiKey
                    })
                }).then(function(response) {
                        //console.log('Location Success');
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' + response.status);
                            return;
                        }
                        response.json().then(function(data) {
                            holder.renderFeedTemplate(data);
                        });
                    })
                    .catch(function(err) {
                        console.log('Failed');
                    });
            });
        };

        getSiteFavourites() {
            var holder = this;
            fetch(this.favouritesUrl)
                .then(function(response) {
                    //console.log('Location Success');
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }
                    response.json().then(function(data) {
                        var siteFavourites = JSON.stringify(data);
                        return holder.setAttribute('site-favourites', siteFavourites);
                    });
                })
                .catch(function(err) {
                    console.log('Failed');
                });
        };

    }
    // Register Element
    document.registerElement('osb-manga-reader', osbMangaReader);
})();