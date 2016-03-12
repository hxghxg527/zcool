/**
 * Created by hxghxg527 on 16/3/12.
 */


function Carousel(options) {
    this.options = $.extend({}, this.options || {}, options);
    this.indicatorContainer = $('.indicator-container');
    this.indicators = this.indicatorContainer.find('.indicator-item');
    this.init();
}

Carousel.prototype = {
    init: function () {
        this.setPosition();
    },
    setPosition: function () {
        this.indicatorContainer.css({
            marginLeft: -(this.indicatorContainer.outerWidth() / 2),
            display: 'block'
        });
    }
};