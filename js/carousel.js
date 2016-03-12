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
    this.timeout = null;
    this.isHasIndicator = this.itemsNum == this.indicators.length;
    this.selectedIndicatorClassName = 'active';
    this.itemSlideSpeed = 'slow';

    this.init();
}

Carousel.prototype = {
    init: function () {
        this.setIndicatorPosition();
        this.configCarouselStyles();
        this.autoPlayCarousel();
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
            left: this.currentItemIndex + '%',
            display: 'block'
        });
    },
    autoPlayCarousel: function () {
        var self = this;

        this.clearCarouselTimeout();
        this.timeout = setTimeout(function () {
            self.executeLogicOfAutoPlayCarousel();
        }, 4000);
    },
    executeLogicOfAutoPlayCarousel: function () {
        var self = this;
        this.clearCarouselTimeout();

        if (this.isHasIndicator) {
            this.indicators.eq(this.currentItemIndex).removeClass(this.selectedIndicatorClassName);
        }

        if (this.currentItemIndex == this.itemsNum - 1) this.currentItemIndex = 0;
        else this.currentItemIndex++;

        if (this.isHasIndicator) {
            this.indicators.eq(this.currentItemIndex).addClass(this.selectedIndicatorClassName);
        }

        this.carouselItemInnerContainer.stop(true).animate({
            left: -this.currentItemIndex * 100 + '%'
        }, this.itemSlideSpeed, function () {
            self.autoPlayCarousel();
        });
    },
    clearCarouselTimeout: function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
};