/*global window, document, Backbone */

document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    var ItemListView = Backbone.View.extend({

        events: {
            'click .add': 'addItem',
            'tap li': 'onItemTap',
            'swiperight li': 'onSwipe',
            'tap .remove': 'removeItem'
        },

        initialize: function () {
            this.$el.hammer();
        },

        addItem: function () {
            var item = document.createElement('li');
            item.textContent = 'item ' + Date.now();
            this.el.querySelector('ul').appendChild(item);
        },

        onSwipe: function (e) {
            var item = e.currentTarget;
            var removeButton = document.createElement('button');
            removeButton.className = 'remove';
            removeButton.textContent = 'remove';
            item.appendChild(removeButton);

            window.setTimeout(function () {
                item.removeChild(removeButton);
            }, 2000);
        },

        onItemTap: function (e) {
            var item = e.currentTarget;
            item.classList.toggle('selected');
        },

        removeItem: function (e) {
            var item = e.currentTarget.parentNode;
            item.parentNode.removeChild(item);
        }

    });

    var list = new ItemListView({el: document.body});

});
