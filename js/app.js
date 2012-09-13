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
        clickBusy: false,
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
            e.preventDefault();
            var $target = $(e.target);
            if (this.clickBusy) {
                log('click busy (' + $target.attr('href') + ')');
                return false;
            }
            this.clickBusy = true;

            log('click on link: ' + $target.attr('href'));
            $target.addClass('active');

            window.setTimeout(function () {
                $target.removeClass('active');
            }, 100);

            var that = this;
            window.setTimeout(function () {
                that.clickBusy = false;
            }, 300);

            return false;
        },
        onItemsClick: function (e) {
            e.preventDefault();
            if (this.clickBusy) {
                log('click busy (items list)');
                return false;
            }
            log('click on items list');
            return false;
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
