/**
 * Created by hxghxg527 on 16/3/12.
 */
'use strict';

function Carousel(options) {
    this.options = $.extend({}, this.options || {}, options);
    this.currentItemIndex = 0;

    this.indicatorContainer = $('.indicator-container');
    this.indicators = this.indicatorContainer.find('.indicator-item');
    this.carouselItemInnerContainer = $('.carousel-item-inner-container');
    this.carouselItems = this.carouselItemInnerContainer.find('.carousel-item');
    this.slideLeftBtn = $('.slide_left');
    this.slideRightBtn = $('.slide_right');

    this.containerWidth = $('.carousel-item-container').width();
    this.itemsNum = this.carouselItems.length;
    this.timeout = null;
    this.timeoutForHover = null;
    this.isHasIndicator = this.itemsNum == this.indicators.length;
    this.selectedIndicatorClassName = 'active';
    this.itemSlideSpeed = 'slow';
    this.isOverOnIndicator = false;
    this.isBlocked = false;

    this.init();
}

Carousel.prototype = {
    init: function () {
        this.setIndicatorPosition();
        this.configCarouselStyles();
        this.autoPlayCarousel();
        this.addHoverEvent();
        this.addSlideBtnEvent();
    },
    setIndicatorPosition: function () {
        this.indicatorContainer.css({
            marginLeft: -(this.indicatorContainer.outerWidth() / 2),
            display: 'block'
        });
    },
    configCarouselStyles: function () {
        this.carouselItems.css({
            width: this.containerWidth
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
            if (!self.isBlocked && !self.timeout) self.autoPlayCarousel();
        });
    },
    addHoverEvent: function () {
        if (!this.isHasIndicator) return;
        var self = this;
        this.indicators.bind('mouseover', function () {
            var current_idx = $(this).index();
            self.isOverOnIndicator = true;
            self.timeoutForHover = setTimeout(function () {
                self.executeLogicForMouseOver(current_idx);
            }, 100);
        }).bind('mouseout', function () {
            if (self.isOverOnIndicator) {
                self.isOverOnIndicator = false;
                self.clearHoverTimeout();
            } else {
                if (self.isBlocked) self.isBlocked = false;
                self.autoPlayCarousel();
            }
        });
    },
    executeLogicForMouseOver: function (current_idx) {
        var self = this;
        this.clearCarouselTimeout();
        this.clearHoverTimeout();
        this.isOverOnIndicator = true;
        if (this.currentItemIndex == current_idx) {
            this.isOverOnIndicator = false;
            this.isBlocked = true;
            return;
        }
        this.indicators.eq(this.currentItemIndex).removeClass(this.selectedIndicatorClassName);
        this.currentItemIndex = current_idx;
        this.indicators.eq(this.currentItemIndex).addClass(this.selectedIndicatorClassName);

        this.carouselItemInnerContainer.stop(true).animate({
            left: -this.currentItemIndex * 100 + '%'
        }, this.itemSlideSpeed, function () {
            if (self.isOverOnIndicator) self.isOverOnIndicator = false;
            else if (!self.isBlocked && !self.timeout) self.autoPlayCarousel();
        });
    },
    clearCarouselTimeout: function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    },
    clearHoverTimeout: function () {
        if (this.timeoutForHover) {
            clearTimeout(this.timeoutForHover);
            this.timeoutForHover = null;
        }
    },
    addSlideBtnEvent: function () {
        var self = this;

        if (this.slideRightBtn.length > 0) {
            this.slideRightBtn.bind('click', function () {
                self.executeLogicForSlideBtn('right');
            });
        }
        if (this.slideLeftBtn.length > 0) {
            this.slideLeftBtn.bind('click', function () {
                self.executeLogicForSlideBtn('left');
            });
        }
    },
    executeLogicForSlideBtn: function (direction) {
        var self = this;
        this.clearCarouselTimeout();

        if (this.isHasIndicator) {
            this.indicators.eq(this.currentItemIndex).removeClass(this.selectedIndicatorClassName);
        }

        if (direction == 'left') {
            if (this.currentItemIndex == this.itemsNum - 1) this.currentItemIndex = 0;
            else this.currentItemIndex++;
        } else {
            if (this.currentItemIndex == 0) this.currentItemIndex = this.itemsNum - 1;
            else this.currentItemIndex--;
        }

        if (this.isHasIndicator) {
            this.indicators.eq(this.currentItemIndex).addClass(this.selectedIndicatorClassName);
        }

        this.carouselItemInnerContainer.stop(true).animate({
            left: -this.currentItemIndex * 100 + '%'
        }, this.itemSlideSpeed, function () {
            if (!self.isBlocked && !self.timeout) self.autoPlayCarousel();
        });
    }
};