/**
 * Created by hxghxg527 on 16/3/12.
 */


function Carousel(options) {
    this.options = $.extend({}, this.options || {}, options);
    this.currentItemIndex = 0;
    this.indicatorContainer = $('.indicator-container');
    this.indicators = this.indicatorContainer.find('.indicator-item');
    this.carouselItemInnerContainer = $('.carousel-item-inner-container');
    this.carouselItems = this.carouselItemInnerContainer.find('.carousel-item');
    this.itemsNum = this.carouselItems.length;

    this.init();
}

Carousel.prototype = {
    init: function () {
        this.setIndicatorPosition();
        this.configCarouselStyles();
    },
    setIndicatorPosition: function () {
        this.indicatorContainer.css({
            marginLeft: -(this.indicatorContainer.outerWidth() / 2),
            display: 'block'
        });
    },
    configCarouselStyles: function () {
        this.carouselItems.css({
            width: 100 / this.itemsNum + '%'
        });
        this.carouselItemInnerContainer.css({
            width: 100 * this.itemsNum + '%',
            left: '0%',
            display: 'block'
        });
    }
};