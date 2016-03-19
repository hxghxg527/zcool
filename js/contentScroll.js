/**
 * Created by hxghxg527 on 16/3/15.
 */
'use strict';

function ContentScroll() {
    this.itemInnerContainer = $('.news-container .item-inner-container');
    this.downBtn = $('.news-container .down');
    this.upBtn = $('.news-container .up');
    this.containerHeight = $('.news-container .item-container').height();
    this.itemsNum = this.itemInnerContainer.find('li').length;
    this.timeout = null;
    this.currentItemIndex = -1;

    this.init();
}

ContentScroll.prototype = {
    init: function () {
        this.initStyle();
        this.autoScroll();
        this.addEventForBtns();
    },
    initStyle: function () {
        this.itemInnerContainer.css({
            top: this.currentItemIndex * this.containerHeight,
            display: 'block'
        });
    },
    autoScroll: function () {
        var self = this;
        this.clearScrollTimeout();
        setTimeout(function () {
            self.executeScrollLogic();
        }, 4000);
    },
    executeScrollLogic: function () {
        var self = this;
        this.clearScrollTimeout();
        this.currentItemIndex--;
        this.itemInnerContainer.stop(true).animate({
            top: this.currentItemIndex * this.containerHeight
        }, 'slow', function () {
            if (self.currentItemIndex == 1 - self.itemsNum) {
                self.currentItemIndex = -1;
                $(this).css({
                    top: self.currentItemIndex * self.containerHeight
                });
            }
            self.autoScroll();
        });
    },
    addEventForBtns: function () {
        var self = this;
        this.upBtn.bind('click', function () {
            self.executeUpBtnLogic();
        });
    },
    executeUpBtnLogic: function () {
        var self = this;
        this.clearScrollTimeout();
        this.currentItemIndex--;
        this.itemInnerContainer.stop(true).animate({
            top: this.currentItemIndex * this.containerHeight
        }, 'slow', function () {
            if (self.currentItemIndex == 1 - self.itemsNum) {
                self.currentItemIndex = -1;
                $(this).css({
                    top: self.currentItemIndex * self.containerHeight
                });
            }
            self.autoScroll();
        });
    },
    clearScrollTimeout: function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
};
