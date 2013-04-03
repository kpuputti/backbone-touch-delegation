/*global window, document, Backbone */

document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    var logEl = document.getElementById('log');
    function log(s) {
        console.log(s);
        logEl.innerHTML += (Date.now() + ': ' + s + '\n');
        logEl.scrollTop = logEl.scrollHeight;
    }

    var ItemListView = Backbone.View.extend({

        events: {
            'click .add': 'onAddButtonClick',
            'click li': 'onItemClick',
            'tap .add': 'addItem',
            'tap li': 'onItemTap',
            'swiperight li': 'onSwipe',
            'tap .remove': 'removeItem'
        },

        initialize: function () {
            this.$el.hammer();
        },

        onAddButtonClick: function () {
            log('click on add button');
        },

        onItemClick: function (e) {
            var item = e.currentTarget;
            log('click on item: ' + item.textContent);
        },

        addItem: function () {
            log('add new item');
            var item = document.createElement('li');
            item.textContent = 'item ' + (Date.now().toString().substr(-3));
            this.el.querySelector('ul').appendChild(item);
        },

        onSwipe: function (e) {
            var item = e.currentTarget;
            log('swipe on item: ' + item.textContent);
            var removeButton = document.createElement('button');
            removeButton.className = 'remove';
            removeButton.textContent = 'X';
            item.appendChild(removeButton);

            window.setTimeout(function () {
                item.removeChild(removeButton);
            }, 2000);
        },

        onItemTap: function (e) {
            var item = e.currentTarget;
            log('tap on item: ' + item.textContent);
            item.classList.toggle('selected');
        },

        removeItem: function (e) {
            var item = e.currentTarget.parentNode;
            log('remove item: ' + item.textContent);
            item.parentNode.removeChild(item);
        }

    });

    var list = new ItemListView({el: document.body});

});
