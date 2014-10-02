var ListingView = Backbone.View.extend({
    initialize: function() {
        $('body').append(this.el); //renders this.el, the element created automatically by backbone, with the items we put in it later.
        this.render();
        // this.model.view = this; //ties the view to the model in case we need to access it from inside the model
    },
    tagName: 'div', //default is div
    className: 'listing',
    render: function() {
        var self = this;
        $.when(
            this.getHTMLTemplate('./templates/listing.tmpl')
        ).then(function( htmlTemplate ){
            // i have html template and the data...
            self.el.innerHTML = htmlTemplate(self.model.attributes); 
        });
    },
    getHTMLTemplate: function(url) {
        // when the promise returned by this function RESOLVES, the result is a templating function
        return $.get(url).then(function(my_template) {
            templatingFunction = _.template(my_template);
            return templatingFunction;
        });
    }
});

var EtsyListing = Backbone.Model.extend({
    initialize: function() {
        this.view = new ListingView({
            model: this
        });
    },
    defaults: {
        name: "Dummy Product",
        price: "$10.00",
        description: "test product",
        image: "http://placekitten.com/g/200/300"
    }
});

var EtsyListings = Backbone.Collection.extend({
    url: function() {
        return 'https://openapi.etsy.com/v2/listings/active.js?api_key=' + this.api_key + '&callback=?'
    },
    // Because Etsy doesn't return an array of models by default we need
    // to point Backbone.js at the correct property
    model: EtsyListing,
    initialize: function() {

    },
    parse: function(resp, xhr) {
        // console.log(resp.results)
        return resp.results;
    },
    api_key: "ffi5666g10grdo1mbywvxxhv", // put your api key here!
    query: 'backbone.js tutorials'
});

var C = new EtsyListings;
C.fetch()
// .then(function(){
// C.add({test: "test"});
// C.each(function(listing){
// listing.save();
// })
// })


//Finish the Backbone Etsy Collection - create a Model and View and show the listings from Etsy.

//Order of operation: 1.Collection calls fetch() 2.fetch gets etsy listings and creates Models for you 
// 3.Models will need to create their own view in the initialize function()
