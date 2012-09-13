/*global $, _, Backbone */

(function () {

    function log(msg) {
        if (window.console && console.log) {
            console.log(msg);
            var logs = $('#app .logs').get(0);
            logs.innerHTML += '\n' + msg;
            logs.scrollTop = logs.scrollHeight;
        }
    }

    var AppView = Backbone.View.extend({
        events: {
            'click .items': 'onItemsClick',
            'click .add-item': 'addItem',
            'click .items a': 'onClick',
            'click .clear-logs': 'clearLogs'
        },
        initialize: function () {
            _.bindAll(this, 'addItem', 'onClick', 'onItemsClick', 'clearLogs');
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
            log('click on link: ' + $target.attr('href'));
            $target.addClass('active');
            window.setTimeout(function () {
                $target.removeClass('active');
            }, 100);
        },
        onItemsClick: function (e) {
            log('click on items list');
        },
        clearLogs: function (e) {
            this.$el.find('.logs').html('');
        }
    });

    function start() {
        log('start app');
        window.location.hash = '';
        var app = new AppView({
            el: $('#app')
        });
    }

    $(start);
}());
