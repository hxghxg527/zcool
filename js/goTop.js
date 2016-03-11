/**
 * Created by hxghxg527 on 16/3/11.
 */
'use strict';

function GoTop() {
    this.elem = $('.go-to-top');
    this.init();
}

GoTop.prototype = {
    init: function () {
        this.setPosition();
        this.bindScrollEvent();
    },
    setPosition: function () {
        this.elem.css({
            right: ($('body').width() - $('.content-container').width()) / 2 - this.elem.width() - 3
        });
    },
    _isShowGoTopElement: function () {
        if ($(document).scrollTop() > 45) this.elem.show();
        else this.elem.hide();
    },
    bindScrollEvent: function () {
        var self = this;
        $(window).bind('scroll', function () {
            self._isShowGoTopElement();
        });
    }
};