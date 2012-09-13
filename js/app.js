/*global $, _, Backbone */

(function () {

    function log() {
        if (window.console && console.log && console.log.apply) {
            console.log.apply(console, ['[touchtest]:'].concat(_.toArray(arguments)));
        }
    }

    var AppView = Backbone.View.extend({
        events: {
            'click .items': 'onItemsClick',
            'click .add-item': 'addItem',
            'click .items a': 'onClick'
        },
        initialize: function () {
            _.bindAll(this, 'addItem', 'onClick', 'onItemsClick');
        },
        addItem: function (e) {
            log('add new item');
            var itemId = Date.now();
            var $item = $('<li></li>').attr('data-itemid', itemId);
            $('<a></a>').attr('href', '#item-' + itemId).text('Item ' + itemId).appendTo($item);
            this.$el.find('.items').append($item);
        },
        onClick: function (e) {
            var $target = $(e.target);
            e.preventDefault();
            log('click on link:', $target.attr('href'));
            $target.addClass('active');
            window.setTimeout(function () {
                $target.removeClass('active');
            }, 100);
        },
        onItemsClick: function (e) {
            log('click on items list');
        }
    });

    function start() {
        log('start');
        window.location.hash = '';
        var app = new AppView({
            el: $('#app')
        });
    }

    window.addEventListener('DOMContentLoaded', start);
}());
